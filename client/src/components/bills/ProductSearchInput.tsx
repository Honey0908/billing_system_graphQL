import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductSearchInputProps {
  products: Product[];
  value: string;
  onValueChange: (value: string) => void;
  onProductSelect: (product: Product) => void;
  onCustomProduct: () => void;
}

export function ProductSearchInput({
  products,
  value,
  onValueChange,
  onProductSelect,
  onCustomProduct,
}: ProductSearchInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (newValue: string) => {
    onValueChange(newValue);
    setShowDropdown(true);
    onCustomProduct();
  };

  const handleSelect = (product: Product) => {
    onProductSelect(product);
    setShowDropdown(false);
  };

  return (
    <div className="flex-1 min-w-[200px] relative" ref={dropdownRef}>
      <Label htmlFor="product-search">Product Name</Label>
      <Input
        id="product-search"
        placeholder="Search or enter product name..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && value && filteredProducts.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors flex justify-between items-center"
              onClick={() => handleSelect(product)}
            >
              <span>{product.name}</span>
              <span className="text-sm text-muted-foreground">
                ₹{product.price.toFixed(2)}/kg
              </span>
            </button>
          ))}
        </div>
      )}

      {showDropdown && value && filteredProducts.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          <div className="px-4 py-3 text-sm">
            <span className="text-muted-foreground">No products found. </span>
            <span className="text-primary font-medium">
              Enter custom price to add.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
