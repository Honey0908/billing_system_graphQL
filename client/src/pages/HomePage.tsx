import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Billing System</h1>
          <p className="text-muted-foreground">
            Manage your billing operations efficiently
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to={ROUTES.AUTH.LOGIN} className="block">
            <Button className="w-full h-12" size="lg">
              Sign In
            </Button>
          </Link>

          <Link to={ROUTES.AUTH.SIGNUP} className="block">
            <Button variant="outline" className="w-full h-12" size="lg">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Simple Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Multi-tenant billing system with role-based access
        </p>
      </div>
    </div>
  );
}
