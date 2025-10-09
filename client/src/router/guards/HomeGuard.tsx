import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/ui/loading";

interface HomeGuardProps {
  children: React.ReactNode;
}

/**
 * HomeGuard redirects authenticated users to their respective dashboards
 * and shows the home page only to unauthenticated users
 */
export default function HomeGuard({ children }: HomeGuardProps) {
  const { isAuthenticated, isAdmin, isStaff, loading } = useAuth();

  // Show loading state while checking authentication
  // This prevents flickering by not rendering children until auth is checked
  if (loading) {
    return <LoadingPage />;
  }

  // If user is authenticated, redirect to their dashboard immediately
  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }
    if (isStaff) {
      return <Navigate to={ROUTES.STAFF_DASHBOARD} replace />;
    }
  }

  // User is not authenticated, now safe to show the page
  return <>{children}</>;
}
