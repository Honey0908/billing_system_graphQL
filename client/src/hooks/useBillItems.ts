import { useState } from "react";

export interface BillItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export function useBillItems() {
  const [billItems, setBillItems] = useState<BillItem[]>([]);

  const addItem = (
    productId: string,
    productName: string,
    price: number,
    quantity: number
  ) => {
    const total = price * quantity;
    const newItem: BillItem = {
      id: Date.now().toString(),
      productId,
      productName,
      price,
      quantity,
      total,
    };
    setBillItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setBillItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setBillItems([]);
  };

  const calculateTotal = () => {
    return billItems.reduce((sum, item) => sum + item.total, 0);
  };

  return {
    billItems,
    addItem,
    removeItem,
    clearAll,
    calculateTotal,
  };
}
