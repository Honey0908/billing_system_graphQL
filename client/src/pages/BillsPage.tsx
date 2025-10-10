import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingPage } from "@/components/ui/loading";
import { execute } from "@/graphql/execute";
import { GET_PRODUCTS_QUERY } from "@/schema/queries/product";
import { useBillItems } from "@/hooks/useBillItems";
import { AddItemForm } from "@/components/bills/AddItemForm";
import { BillItemsTable } from "@/components/bills/BillItemsTable";

export default function BillsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);
  const [isCustomProduct, setIsCustomProduct] = useState(false);

  const { billItems, addItem, removeItem, clearAll, calculateTotal } =
    useBillItems();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await execute(GET_PRODUCTS_QUERY, {});
      return response.data;
    },
  });

  const products = data?.products || [];

  const handleProductSelect = (product: {
    id: string;
    name: string;
    price: number;
  }) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setCustomPrice(product.price.toString());
    setIsCustomProduct(false);
  };

  const handleAddItem = () => {
    const priceValue = parseFloat(customPrice);
    const quantityValue = parseFloat(quantity);

    if (
      !searchTerm.trim() ||
      !priceValue ||
      priceValue <= 0 ||
      !quantityValue ||
      quantityValue <= 0
    ) {
      return;
    }

    const productId = isCustomProduct
      ? `custom-${Date.now()}`
      : selectedProduct?.id || "";

    addItem(productId, searchTerm.trim(), priceValue, quantityValue);

    // Reset form
    setSearchTerm("");
    setCustomPrice("");
    setQuantity("");
    setSelectedProduct(null);
    setIsCustomProduct(false);
  };

  const isAddDisabled =
    !searchTerm.trim() ||
    !customPrice ||
    parseFloat(customPrice) <= 0 ||
    !quantity ||
    parseFloat(quantity) <= 0;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Bill</h1>

      <AddItemForm
        products={products}
        searchTerm={searchTerm}
        customPrice={customPrice}
        quantity={quantity}
        isCustomProduct={isCustomProduct}
        onSearchTermChange={setSearchTerm}
        onCustomPriceChange={setCustomPrice}
        onQuantityChange={setQuantity}
        onProductSelect={handleProductSelect}
        onCustomProduct={() => setIsCustomProduct(true)}
        onAddItem={handleAddItem}
        isAddDisabled={isAddDisabled}
      />

      <BillItemsTable
        items={billItems}
        onRemoveItem={removeItem}
        onClearAll={clearAll}
        grandTotal={calculateTotal()}
      />
    </div>
  );
}
