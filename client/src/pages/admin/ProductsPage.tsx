import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product inventory
          </p>
        </div>
        <Button>Add Product</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Product Cards */}
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <Card key={id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Product {id}</CardTitle>
              <CardDescription>Product description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Price:</span> $99.99
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Stock:</span> 50 units
                </p>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to={`/admin-dashboard/products/${id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
