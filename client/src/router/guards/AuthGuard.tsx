import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  // TODO: Replace with actual authentication logic
  // For now, we'll simulate authentication check
  const isAuthenticated = false; // This should come from your auth context/store

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
}
