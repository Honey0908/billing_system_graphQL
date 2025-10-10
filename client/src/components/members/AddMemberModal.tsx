import { useActionState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { execute } from "@/graphql/execute";
import { CREATE_USER_MUTATION } from "@/schema/mutations/user";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/graphql/graphql";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

type FormState = {
  error?: string;
  success?: boolean;
};

export function AddMemberModal({
  open,
  onOpenChange,
  onSuccess,
}: AddMemberModalProps) {
  const { user } = useAuth();
  const firmId = user?.firm?.id;

  const { mutateAsync: createUser, isPending } = useMutation({
    mutationFn: async (variables: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
      firmId: string;
    }) => {
      const response = await execute(CREATE_USER_MUTATION, variables);
      return response.data;
    },
  });

  async function handleSubmit(
    _prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const roleValue = formData.get("role") as string;
    const role = roleValue === "ADMIN" ? UserRole.Admin : UserRole.Staff;

    if (!name || !email || !password || !role) {
      return { error: "All fields are required" };
    }

    if (!firmId) {
      return { error: "Firm information not found" };
    }

    try {
      await createUser({ name, email, password, role, firmId });
      onSuccess();
      return { success: true };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Failed to add member",
      };
    }
  }

  const [state, formAction] = useActionState(handleSubmit, {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
