import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductSearchInput } from "./ProductSearchInput";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface AddItemFormProps {
  products: Product[];
  searchTerm: string;
  customPrice: string;
  quantity: string;
  isCustomProduct: boolean;
  onSearchTermChange: (value: string) => void;
  onCustomPriceChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onProductSelect: (product: Product) => void;
  onCustomProduct: () => void;
  onAddItem: () => void;
  isAddDisabled: boolean;
}

export function AddItemForm({
  products,
  searchTerm,
  customPrice,
  quantity,
  isCustomProduct,
  onSearchTermChange,
  onCustomPriceChange,
  onQuantityChange,
  onProductSelect,
  onCustomProduct,
  onAddItem,
  isAddDisabled,
}: AddItemFormProps) {
  return (
    <div className="mb-6 space-y-3">
      <ProductSearchInput
        products={products}
        value={searchTerm}
        onValueChange={onSearchTermChange}
        onProductSelect={onProductSelect}
        onCustomProduct={onCustomProduct}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          id="custom-price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Price/kg (₹)"
          value={customPrice}
          onChange={(e) => onCustomPriceChange(e.target.value)}
          className="h-12 text-base"
        />

        <Input
          id="quantity"
          type="number"
          step="0.01"
          min="0"
          placeholder="Quantity (kg)"
          value={quantity}
          onChange={(e) => onQuantityChange(e.target.value)}
          className="h-12 text-base"
        />
      </div>

      <Button
        onClick={onAddItem}
        disabled={isAddDisabled}
        className="w-full h-12 text-base"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Item
      </Button>

      {isCustomProduct && searchTerm && (
        <p className="text-sm text-muted-foreground">
          💡 Custom product: <span className="font-medium">{searchTerm}</span>
        </p>
      )}
    </div>
  );
}
