import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper hook for role-based access
export function useRoleAccess() {
  const { user, isAdmin, isStaff, loading } = useAuth();

  return {
    user,
    loading,
    isAdmin,
    isStaff,
  };
}

// Helper hook for authentication actions
export function useAuthActions() {
  const { login, logout, refetchUser } = useAuth();

  return {
    login,
    logout,
    refetchUser,
  };
}
