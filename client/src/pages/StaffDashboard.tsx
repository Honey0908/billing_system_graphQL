import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export default function StaffDashboard() {
  const location = useLocation();
  const { user, firm, logout } = useAuth();
  const isRootDashboard = location.pathname === ROUTES.STAFF_DASHBOARD;

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
              <h1 className="text-2xl font-bold">Staff Dashboard</h1>
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
            <Link to={ROUTES.STAFF_DASHBOARD}>
              <Button
                variant={isRootDashboard ? "default" : "ghost"}
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isRootDashboard}
              >
                Overview
              </Button>
            </Link>
            <Link to={ROUTES.STAFF.BILLS}>
              <Button
                variant={isActive(ROUTES.STAFF.BILLS) ? "default" : "ghost"}
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isActive(ROUTES.STAFF.BILLS)}
              >
                My Bills
              </Button>
            </Link>
            <Link to={ROUTES.STAFF.BILLS_CREATE}>
              <Button
                variant={
                  isActive(ROUTES.STAFF.BILLS_CREATE) ? "default" : "ghost"
                }
                className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
                data-active={isActive(ROUTES.STAFF.BILLS_CREATE)}
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
                <h3 className="text-lg font-semibold mb-2">Bills Created</h3>
                <p className="text-3xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Total bills this month
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Total Amount</h3>
                <p className="text-3xl font-bold text-primary">$32,450</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Revenue generated
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Pending Bills</h3>
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Awaiting completion
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to={ROUTES.STAFF.BILLS}
                className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">View My Bills</h3>
                <p className="text-muted-foreground">
                  See all bills you've created
                </p>
              </Link>
              <Link
                to={ROUTES.STAFF.BILLS_CREATE}
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
