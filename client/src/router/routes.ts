import { lazy, createElement } from "react";
import type { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// Lazy load page components
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));

// Import components that need to be loaded immediately
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthGuard = lazy(() => import("@/router/guards/AuthGuard"));
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
        element: createElement(HomePage),
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: createElement(LoginPage),
          },
          {
            path: "signup",
            element: createElement(SignupPage),
          },
        ],
      },
      {
        path: "dashboard",
        element: createElement(AuthGuard, {
          children: createElement(DashboardPage),
        }),
      },
      {
        path: "*",
        element: createElement(NotFoundPage),
      },
    ],
  },
];
