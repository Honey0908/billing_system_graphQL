import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DELETE_PRODUCT } from "@/graphql/mutations";

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
  const [error, setError] = useState<string | null>(null);

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      setError(null);
      onOpenChange(false);
    },
    onError: (err) => {
      console.error("Failed to delete product:", err);
      setError(err.message || "Failed to delete product. Please try again.");
    },
    refetchQueries: ["GetProducts"],
  });

  const handleDelete = () => {
    if (product) {
      deleteProduct({ variables: { id: product.id } });
    }
  };

  const handleClose = () => {
    if (!loading) {
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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
