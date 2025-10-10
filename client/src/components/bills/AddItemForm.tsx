import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex gap-4 items-end flex-wrap">
          <ProductSearchInput
            products={products}
            value={searchTerm}
            onValueChange={onSearchTermChange}
            onProductSelect={onProductSelect}
            onCustomProduct={onCustomProduct}
          />

          <div className="w-32">
            <Label htmlFor="custom-price">Price/kg (₹)</Label>
            <Input
              id="custom-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={customPrice}
              onChange={(e) => onCustomPriceChange(e.target.value)}
            />
          </div>

          <div className="w-32">
            <Label htmlFor="quantity">Quantity (kg)</Label>
            <Input
              id="quantity"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={quantity}
              onChange={(e) => onQuantityChange(e.target.value)}
            />
          </div>

          <Button
            onClick={onAddItem}
            disabled={isAddDisabled}
            size="icon"
            className="shrink-0"
            title="Add Item"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {isCustomProduct && searchTerm && (
          <p className="text-sm text-muted-foreground mt-2">
            💡 Adding custom product:{" "}
            <span className="font-medium">{searchTerm}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
