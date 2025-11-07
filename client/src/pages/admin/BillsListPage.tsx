import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Link } from "react-router-dom";
import { GET_BILLS } from "@/graphql/queries";
import { LoadingPage } from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function BillsListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading: isLoading } = useQuery(GET_BILLS);

  const bills = data?.bills || [];

  // Filter bills by ID, customer name, phone, or creator name
  const filteredBills = bills.filter((bill) => {
    const query = searchQuery.toLowerCase();
    return (
      bill.id.toLowerCase().includes(query) ||
      bill.customerName?.toLowerCase().includes(query) ||
      bill.customerPhone?.includes(query) ||
      bill.user.name.toLowerCase().includes(query) ||
      bill.user.email.toLowerCase().includes(query)
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
          placeholder="Search by Bill ID, Customer, Phone, or Staff Name..."
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
                <th className="text-left py-3 px-4 font-semibold">
                  Created By
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
                    colSpan={7}
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
                      <div className="flex flex-col">
                        <span className="font-medium">{bill.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {bill.user.email}
                        </span>
                      </div>
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
