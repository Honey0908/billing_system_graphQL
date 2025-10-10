import { lazy, createElement } from "react";
import type { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { UserRole } from "@/graphql/graphql";

// Import guard components immediately (not lazy) to prevent flickering
import HomeGuard from "@/router/guards/HomeGuard";
import RoleGuard from "@/router/guards/RoleGuard";

// Lazy load page components
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const StaffDashboard = lazy(() => import("@/pages/StaffDashboard"));

// Lazy load admin pages
const ProductsPage = lazy(() => import("@/pages/admin/ProductsPage"));
const MembersPage = lazy(() => import("@/pages/admin/MembersPage"));

// Lazy load common pages
const BillsPage = lazy(() => import("@/pages/BillsPage"));

// Import layout components
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: createElement(RootLayout),
    errorElement: createElement(ErrorPage),
    children: [
      {
        index: true,
        element: createElement(HomeGuard, {
          children: createElement(HomePage),
        }),
      },
      {
        path: ROUTES.AUTH.LOGIN,
        element: createElement(HomeGuard, {
          children: createElement(LoginPage),
        }),
      },
      {
        path: ROUTES.AUTH.SIGNUP,
        element: createElement(HomeGuard, {
          children: createElement(SignupPage),
        }),
      },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        element: createElement(RoleGuard, {
          allowedRoles: UserRole.Admin,
          children: createElement(AdminDashboard),
        }),
        children: [
          {
            path: "products",
            element: createElement(ProductsPage),
          },
          {
            path: "members",
            element: createElement(MembersPage),
          },
          {
            path: "bills",
            element: createElement(BillsPage),
          },
        ],
      },
      {
        path: ROUTES.STAFF_DASHBOARD,
        element: createElement(RoleGuard, {
          allowedRoles: UserRole.Staff,
          children: createElement(StaffDashboard),
        }),
        children: [
          {
            path: "bills",
            element: createElement(BillsPage),
          },
        ],
      },
      {
        path: "*",
        element: createElement(NotFoundPage),
      },
    ],
  },
];
