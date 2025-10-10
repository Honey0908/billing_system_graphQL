export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  ADMIN_DASHBOARD: "/admin-dashboard",
  ADMIN: {
    PRODUCTS: "/admin-dashboard/products",
    PRODUCT_DETAIL: "/admin-dashboard/products/:id",
    MEMBERS: "/admin-dashboard/members",
    BILLS: "/admin-dashboard/bills",
  },
  STAFF_DASHBOARD: "/staff-dashboard",
  STAFF: {
    BILLS: "/staff-dashboard/bills",
  },
  NOT_FOUND: "/404",
} as const;

// Helper functions for dynamic routes
export const generateRoute = {
  adminProductDetail: (id: string) => `/admin-dashboard/products/${id}`,
} as const;
