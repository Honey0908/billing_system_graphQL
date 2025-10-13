import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { execute } from "@/graphql/execute";
import { GET_BILLS_QUERY } from "@/schema/queries/bill";
import { LoadingPage } from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface Bill {
  id: string;
  title: string;
  customerName?: string | null;
  customerPhone?: string | null;
  totalAmount: number;
  createdAt: string;
}

export default function BillsListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const response = await execute(GET_BILLS_QUERY, {});
      return response.data;
    },
  });

  const bills: Bill[] = data?.bills || [];

  // Filter bills by ID or customer name
  const filteredBills = bills.filter((bill) => {
    const query = searchQuery.toLowerCase();
    return (
      bill.id.toLowerCase().includes(query) ||
      bill.customerName?.toLowerCase().includes(query) ||
      bill.customerPhone?.includes(query)
    );
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bills Management</h1>
        <Link to={ROUTES.ADMIN.BILLS_CREATE}>
          <Button>Create New Bill</Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by Bill ID, Customer Name, or Phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Bills Table */}
      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Bill ID</th>
                <th className="text-left py-3 px-4 font-semibold">
                  Customer Name
                </th>
                <th className="text-left py-3 px-4 font-semibold">
                  Phone Number
                </th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-right py-3 px-4 font-semibold">Amount</th>
                <th className="text-center py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchQuery
                      ? "No bills found matching your search."
                      : "No bills found. Create your first bill!"}
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="border-t hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-sm">
                      {bill.id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4">
                      {bill.customerName || (
                        <span className="text-muted-foreground italic">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {bill.customerPhone || (
                        <span className="text-muted-foreground italic">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(bill.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold">
                      ₹{bill.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link to={`${ROUTES.ADMIN.BILLS}/${bill.id}`}>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      {filteredBills.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredBills.length} of {bills.length} bills
        </div>
      )}
    </div>
  );
}
