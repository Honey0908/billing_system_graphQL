import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { execute } from "@/graphql/execute";
import { DELETE_PRODUCT_MUTATION } from "@/schema/mutations/product";

interface DeleteProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
  } | null;
}

export default function DeleteProductModal({
  open,
  onOpenChange,
  product,
}: DeleteProductModalProps) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await execute(DELETE_PRODUCT_MUTATION, { id });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch products query
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setError(null);
      onOpenChange(false);
    },
    onError: (err) => {
      console.error("Failed to delete product:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete product. Please try again."
      );
    },
  });

  const handleDelete = () => {
    if (product) {
      deleteProductMutation.mutate(product.id);
    }
  };

  const handleClose = () => {
    if (!deleteProductMutation.isPending) {
      setError(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {product && (
          <div className="py-4">
            <p className="text-sm">
              <span className="font-semibold">Product:</span> {product.name}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={deleteProductMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
