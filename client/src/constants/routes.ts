export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },
  DASHBOARD: "/dashboard",
  NOT_FOUND: "/404",
} as const;

// Helper functions for dynamic routes
export const generateRoute = {
  // Add helper functions here as needed
} as const;
