import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoadingPage } from "@/components/ui/loading";
import { execute } from "@/graphql/execute";
import { GET_PRODUCTS_QUERY } from "@/schema/queries/product";
import { CREATE_BILL_MUTATION } from "@/schema/mutations/bill";
import { useBillItems } from "@/hooks/useBillItems";
import { AddItemForm } from "@/components/bills/AddItemForm";
import { BillItemsTable } from "@/components/bills/BillItemsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BillsPage() {
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Add products, Step 2: Customer info
  const [searchTerm, setSearchTerm] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);
  const [isCustomProduct, setIsCustomProduct] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const { billItems, addItem, removeItem, clearAll, calculateTotal } =
    useBillItems();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await execute(GET_PRODUCTS_QUERY, {});
      return response.data;
    },
  });

  const createBillMutation = useMutation({
    mutationFn: async (variables: {
      input: {
        title: string;
        customerName?: string;
        customerPhone?: string;
        items: { productId: string; quantity: number }[];
      };
    }) => {
      const response = await execute(CREATE_BILL_MUTATION, variables);
      return response.data;
    },
    onSuccess: () => {
      // Reset form
      setCustomerName("");
      setCustomerPhone("");
      clearAll();
      setStep(1); // Go back to step 1
      alert("Bill created successfully!");
    },
    onError: (error: Error) => {
      alert(`Error creating bill: ${error.message}`);
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
    setIsCustomProduct(false); // This is a selected product, not custom
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    // Reset selected product when user types
    if (selectedProduct && value !== selectedProduct.name) {
      setSelectedProduct(null);
    }
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

  const handleCreateBill = () => {
    if (billItems.length === 0) {
      alert("Please add at least one item to the bill");
      return;
    }

    const items = billItems
      .filter((item) => !item.productId.startsWith("custom-"))
      .map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

    if (items.length === 0) {
      alert(
        "Cannot create bill with only custom products. Please add products from the inventory."
      );
      return;
    }

    // Generate bill title automatically with timestamp
    const billTitle = `Bill-${new Date().getTime()}`;

    createBillMutation.mutate({
      input: {
        title: billTitle,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        items,
      },
    });
  };

  const isAddDisabled =
    !searchTerm.trim() ||
    !customPrice ||
    parseFloat(customPrice) <= 0 ||
    !quantity ||
    parseFloat(quantity) <= 0;

  const handleProceedToCustomerInfo = () => {
    if (billItems.length === 0) {
      alert("Please add at least one item to the bill");
      return;
    }
    setStep(2);
  };

  const handleBackToProducts = () => {
    setStep(1);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span className={step === 1 ? "text-primary font-medium" : ""}>
          1. Add Products
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className={step === 2 ? "text-primary font-medium" : ""}>
          2. Customer Info
        </span>
      </div>

      {step === 1 ? (
        <>
          <AddItemForm
            products={products}
            searchTerm={searchTerm}
            customPrice={customPrice}
            quantity={quantity}
            isCustomProduct={isCustomProduct}
            onSearchTermChange={handleSearchTermChange}
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

          <Button
            onClick={handleProceedToCustomerInfo}
            disabled={billItems.length === 0}
            className="w-full h-12 text-base mt-4"
          >
            Continue
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </>
      ) : (
        <>
          <div className="mb-6 border rounded-lg p-4 bg-muted/50">
            <div className="space-y-2 mb-3">
              {billItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-sm">
                    {item.productName} x {item.quantity}kg
                  </span>
                  <span className="text-sm font-medium">
                    ₹{item.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <Input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer Name (optional)"
              className="h-12 text-base"
            />
            <Input
              id="customerPhone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Customer Phone (optional)"
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCreateBill}
              disabled={createBillMutation.isPending || billItems.length === 0}
              className="w-full h-12 text-base"
            >
              {createBillMutation.isPending ? "Creating..." : "Create Bill"}
            </Button>
            <Button
              onClick={handleBackToProducts}
              variant="outline"
              className="w-full h-12 text-base"
              disabled={createBillMutation.isPending}
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
