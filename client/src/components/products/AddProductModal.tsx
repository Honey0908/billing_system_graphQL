import { useActionState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@/graphql/mutations";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: {
    id: string;
    name: string;
    price: number;
  } | null;
}

interface FormState {
  errors?: {
    name?: string;
    price?: string;
    general?: string;
  };
  success?: boolean;
}

export default function ProductModal({
  open,
  onOpenChange,
  product = null,
}: ProductModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditMode = !!product;

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: ["GetProducts"],
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: ["GetProducts"],
  });

  // React 19 useActionState hook for form handling
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      const name = formData.get("name") as string;
      const price = formData.get("price") as string;

      // Validation
      const errors: FormState["errors"] = {};

      if (!name?.trim()) {
        errors.name = "Product name is required";
      }

      if (!price?.trim()) {
        errors.price = "Price is required";
      } else if (isNaN(Number(price)) || Number(price) <= 0) {
        errors.price = "Price must be a positive number";
      }

      if (Object.keys(errors).length > 0) {
        return { errors };
      }

      // Submit to API
      try {
        if (isEditMode) {
          await updateProduct({
            variables: {
              id: product.id,
              input: {
                name: name.trim(),
                price: parseFloat(price),
              },
            },
          });
        } else {
          await createProduct({
            variables: {
              input: {
                name: name.trim(),
                price: parseFloat(price),
              },
            },
          });
        }

        return { success: true };
      } catch (error) {
        console.error(
          `Failed to ${isEditMode ? "update" : "create"} product:`,
          error
        );
        return {
          errors: {
            general:
              error instanceof Error
                ? error.message
                : `Failed to ${isEditMode ? "update" : "create"} product. Please try again.`,
          },
        };
      }
    },
    { errors: {} }
  );

  // Handle successful submission
  useEffect(() => {
    if (state.success && !isPending) {
      formRef.current?.reset();
      onOpenChange(false);
    }
  }, [state.success, isPending, onOpenChange]);

  const handleClose = () => {
    if (!isPending) {
      formRef.current?.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the product details below."
              : "Add a new product to your inventory. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          {state.errors?.general && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{state.errors.general}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter product name"
              defaultValue={product?.name || ""}
              disabled={isPending}
              className={state.errors?.name ? "border-destructive" : ""}
              aria-invalid={!!state.errors?.name}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && (
              <p id="name-error" className="text-sm text-destructive">
                {state.errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              defaultValue={product?.price || ""}
              disabled={isPending}
              className={state.errors?.price ? "border-destructive" : ""}
              aria-invalid={!!state.errors?.price}
              aria-describedby={state.errors?.price ? "price-error" : undefined}
            />
            {state.errors?.price && (
              <p id="price-error" className="text-sm text-destructive">
                {state.errors.price}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Update Product"
                  : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
