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
    BILLS_CREATE: "/admin-dashboard/bills/create",
    BILL_DETAIL: "/admin-dashboard/bills/:id",
  },
  STAFF_DASHBOARD: "/staff-dashboard",
  STAFF: {
    BILLS: "/staff-dashboard/bills",
    BILLS_CREATE: "/staff-dashboard/bills/create",
  },
  NOT_FOUND: "/404",
} as const;

// Helper functions for dynamic routes
export const generateRoute = {
  adminProductDetail: (id: string) => `/admin-dashboard/products/${id}`,
  adminBillDetail: (id: string) => `/admin-dashboard/bills/${id}`,
  staffBillDetail: (id: string) => `/staff-dashboard/bills/${id}`,
} as const;
