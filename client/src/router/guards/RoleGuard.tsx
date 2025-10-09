import { Navigate } from "react-router-dom";
import { UserRole } from "@/graphql/graphql";
import { useRoleAccess } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { LoadingPage } from "@/components/ui/loading";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
  redirectTo?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  redirectTo = ROUTES.AUTH.LOGIN,
}: RoleGuardProps) {
  const { user, loading } = useRoleAccess();

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingPage />;
  }

  // If no user is authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user role is not allowed for this route
  if (user.role !== allowedRoles) {
    if (user.role === UserRole.Admin) {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }
    if (user.role === UserRole.Staff) {
      return <Navigate to={ROUTES.STAFF_DASHBOARD} replace />;
    }
    // If unknown role
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
}
