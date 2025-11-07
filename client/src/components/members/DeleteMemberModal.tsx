import { useMutation } from "@apollo/client/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DELETE_USER } from "@/graphql/mutations";
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

  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      setError("");
      onSuccess();
    },
    onError: (error) => {
      setError(error.message || "Failed to delete member");
    },
    refetchQueries: ["GetUsers"],
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
            onClick={() => deleteUser({ variables: { id: user.id } })}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
