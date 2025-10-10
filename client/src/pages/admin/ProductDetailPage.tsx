import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" className="mb-4">
          <Link to={ROUTES.ADMIN.PRODUCTS}>← Back to Products</Link>
        </Button>
        <h1 className="text-3xl font-bold">Product Details</h1>
        <p className="text-muted-foreground mt-1">
          Viewing details for Product #{id}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>Basic product details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Product ID
              </p>
              <p className="text-lg">{id}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Product Name
              </p>
              <p className="text-lg">Product {id}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Description
              </p>
              <p className="text-lg">
                This is a detailed description of the product.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Price
              </p>
              <p className="text-lg">$99.99</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Stock Quantity
              </p>
              <p className="text-lg">50 units</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Manage this product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Edit Product</Button>
            <Button variant="outline" className="w-full">
              Update Stock
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Product
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
