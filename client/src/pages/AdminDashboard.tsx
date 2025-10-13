import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const location = useLocation();
  const { user, firm, logout } = useAuth();
  const isRootDashboard = location.pathname === ROUTES.ADMIN_DASHBOARD;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {firm?.name} - {user?.name}
              </p>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <Link to={ROUTES.ADMIN_DASHBOARD}>
              <Button
                variant={isRootDashboard ? "default" : "ghost"}
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isRootDashboard}
              >
                Overview
              </Button>
            </Link>
            <Link to={ROUTES.ADMIN.PRODUCTS}>
              <Button
                variant={isActive(ROUTES.ADMIN.PRODUCTS) ? "default" : "ghost"}
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isActive(ROUTES.ADMIN.PRODUCTS)}
              >
                Products
              </Button>
            </Link>
            <Link to={ROUTES.ADMIN.MEMBERS}>
              <Button
                variant={isActive(ROUTES.ADMIN.MEMBERS) ? "default" : "ghost"}
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isActive(ROUTES.ADMIN.MEMBERS)}
              >
                Members
              </Button>
            </Link>
            <Link to={ROUTES.ADMIN.BILLS}>
              <Button
                variant={isActive(ROUTES.ADMIN.BILLS) ? "default" : "ghost"}
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isActive(ROUTES.ADMIN.BILLS)}
              >
                Bills
              </Button>
            </Link>
            <Link to={ROUTES.ADMIN.BILLS_CREATE}>
              <Button
                variant={
                  isActive(ROUTES.ADMIN.BILLS_CREATE) ? "default" : "ghost"
                }
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isActive(ROUTES.ADMIN.BILLS_CREATE)}
              >
                Create Bill
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {isRootDashboard ? (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Active products in inventory
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Active staff members
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                <p className="text-3xl font-bold text-primary">$45,678</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Revenue this month
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to={ROUTES.ADMIN.PRODUCTS}
                className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">Manage Products</h3>
                <p className="text-muted-foreground">
                  View, add, edit, and manage your product inventory
                </p>
              </Link>
              <Link
                to={ROUTES.ADMIN.MEMBERS}
                className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">Manage Members</h3>
                <p className="text-muted-foreground">
                  Add and manage your firm's team members
                </p>
              </Link>
              <Link
                to={ROUTES.ADMIN.BILLS_CREATE}
                className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">Create New Bill</h3>
                <p className="text-muted-foreground">
                  Start creating a new bill for a customer
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
