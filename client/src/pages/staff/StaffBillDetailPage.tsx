import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { execute } from "@/graphql/execute";
import { GET_BILL_QUERY } from "@/schema/queries/bill";
import { LoadingPage } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Phone, Calendar, Receipt } from "lucide-react";

export default function StaffBillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bill", id],
    queryFn: async () => {
      if (!id) throw new Error("Bill ID is required");
      const response = await execute(GET_BILL_QUERY, { id });
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !data?.bill) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bill Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The bill you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const bill = data.bill;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Bills
        </Button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{bill.title}</h1>
            <p className="text-muted-foreground mt-1">Bill ID: {bill.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="font-semibold">
              {new Date(bill.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {bill.customerName || (
                  <span className="italic text-muted-foreground">
                    Not provided
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Phone
              </p>
              <p className="font-medium">
                {bill.customerPhone || (
                  <span className="italic text-muted-foreground">
                    Not provided
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bill Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Bill Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Firm</p>
              <p className="font-medium">{bill.firm.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created By</p>
              <p className="font-medium">{bill.user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Date
              </p>
              <p className="font-medium">
                {new Date(bill.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bill Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-2 font-semibold">#</th>
                  <th className="text-left py-3 px-2 font-semibold">Product</th>
                  <th className="text-right py-3 px-2 font-semibold">
                    Price/kg
                  </th>
                  <th className="text-right py-3 px-2 font-semibold">
                    Quantity
                  </th>
                  <th className="text-right py-3 px-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-2 text-muted-foreground">
                      {index + 1}
                    </td>
                    <td className="py-3 px-2 font-medium">
                      {item.productName}
                    </td>
                    <td className="py-3 px-2 text-right">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-right">{item.quantity} kg</td>
                    <td className="py-3 px-2 text-right font-semibold">
                      ₹{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2">
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-2 text-right font-semibold text-lg"
                  >
                    Total Amount:
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-xl text-primary">
                    ₹{bill.totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
