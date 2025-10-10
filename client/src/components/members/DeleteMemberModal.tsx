import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { execute } from "@/graphql/execute";
import { DELETE_USER_MUTATION } from "@/schema/mutations/user";
import { useState } from "react";

interface DeleteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: { id: string; name: string } | null;
  onSuccess: () => void;
}

export function DeleteMemberModal({
  open,
  onOpenChange,
  user,
  onSuccess,
}: DeleteMemberModalProps) {
  const [error, setError] = useState("");

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await execute(DELETE_USER_MUTATION, { id });
      return response.data;
    },
    onSuccess: () => {
      setError("");
      onSuccess();
    },
    onError: (error) => {
      setError(
        error instanceof Error ? error.message : "Failed to delete member"
      );
    },
  });

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{user.name}</strong>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteUser(user.id)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
