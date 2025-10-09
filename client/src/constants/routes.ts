export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  ADMIN_DASHBOARD: "/admin-dashboard",
  STAFF_DASHBOARD: "/staff-dashboard",
  NOT_FOUND: "/404",
} as const;

// Helper functions for dynamic routes
export const generateRoute = {
  // Add helper functions here as needed
} as const;
