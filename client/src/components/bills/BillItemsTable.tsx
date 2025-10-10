import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BillItem } from "@/hooks/useBillItems";

interface BillItemsTableProps {
  items: BillItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  grandTotal: number;
}

export function BillItemsTable({
  items,
  onRemoveItem,
  onClearAll,
  grandTotal,
}: BillItemsTableProps) {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No items added yet. Start adding products above.
        </p>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Product
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-semibold">
                    Price/kg
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-semibold">
                    Qty (kg)
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-semibold">
                    Total
                  </th>
                  <th className="px-4 py-2 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-2 text-sm">{item.productName}</td>
                    <td className="px-4 py-2 text-sm text-right">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-right">
                      {item.quantity.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-right font-semibold">
                      ₹{item.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
          </div>
        </>
      )}

      {/* Total at bottom - always visible */}
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between items-center bg-muted/30 rounded-lg p-4">
          <span className="text-lg font-semibold">Total Amount:</span>
          <span className="text-3xl font-bold text-primary">
            ₹{grandTotal.toFixed(2)}
          </span>
        </div>

        {items.length > 0 && (
          <div className="flex justify-end mt-4">
            <Button size="lg" className="px-8">
              Generate Bill
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
