# React Router v6+ Setup & Best Practices Guide

This guide covers the setup and best practices for **React Router v6+** with TypeScript, including route constants, lazy loading, guards, layouts, and hooks.

---

## 📁 Project Structure

```
src/
├── router/
│   ├── index.ts            # Main router config
│   ├── routes.ts           # Route definitions
│   ├── guards/             # Auth & permission guards
├── pages/
│   ├── ErrorPage.tsx
│   ├── NotFound.tsx
│   ├── auth/
│   ├── dashboard/
│   └── ...
├── layouts/
│   ├── RootLayout.tsx
│   ├── AuthLayout.tsx
│   └── DashboardLayout.tsx
├── constants/
│   └── routes.ts           # Route constants
```

---

## 🚀 Installation

```bash
pnpm add react-router-dom
pnpm add -D @types/react-router-dom
```

---

## 📝 Key Implementation Steps

### 1. Route Constants

**src/constants/routes.ts**

```typescript
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
  },
  DASHBOARD: '/dashboard',
  USERS: {
    LIST: '/users',
    DETAIL: '/users/:id',
  },
  NOT_FOUND: '/404',
} as const;

// Helper functions for dynamic routes
export const generateRoute = {
  userDetail: (id: string) => `/users/${id}`,
} as const;
```

### 2. Route Definitions

**src/router/routes.ts**

```typescript
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import RootLayout from '@/layouts/RootLayout';
import AuthGuard from '@/router/guards/AuthGuard';

const HomePage = lazy(() => import('@/pages/Home'));
const LoginPage = lazy(() => import('@/pages/auth/Login'));
const DashboardPage = lazy(() => import('@/pages/dashboard/Dashboard'));
const UserListPage = lazy(() => import('@/pages/users/UserList'));
const UserDetailPage = lazy(() => import('@/pages/users/UserDetail'));
import ErrorPage from '@/pages/ErrorPage';
import NotFoundPage from '@/pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'auth',
        children: [{ path: 'login', element: <LoginPage /> }],
      },
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        ),
      },
      {
        path: 'users',
        children: [
          { index: true, element: <UserListPage /> },
          { path: ':id', element: <UserDetailPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
```

### 3. Main Router Setup

**src/router/index.ts**

```typescript
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
  },
});
```

### 4. App Integration

**src/App.tsx**

```typescript
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### 5. Layout with Outlet

**src/layouts/RootLayout.tsx**

```typescript
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div>
      <header>Navigation</header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
```

### 6. Auth Guard

**src/router/guards/AuthGuard.tsx**

```typescript
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = true; // replace with real logic
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.AUTH.LOGIN} />
  );
}
```

---

## 🔑 Essential Hooks

- **useNavigate**: Programmatic navigation
- **useParams**: Get route params
- **useLocation**: Access current route info
- **useSearchParams**: Manage query strings
- **useOutletContext**: Share data between layout and child routes

use more according to need

---

## 📋 Adding New Routes - Best Practices

### ✅ **Planning Phase:**

1. Define route constants in `constants/routes.ts`
2. Create helper functions for dynamic routes
3. Plan the URL structure and nesting

### ✅ **When Creating Components:**

1. Use appropriate hooks (`useParams`, `useSearchParams`, etc.)
2. Handle loading states with loaders

### ✅ **Route Configuration:**

1. Add routes in logical order (index routes first)
2. Configure lazy loading for page components
3. Add route guards for protected routes
4. Set up loaders and actions if needed

### ✅ **Testing Your Routes:**

1. Test direct URL navigation
2. Verify params are correctly parsed
3. Check protected route behavior
4. Test error scenarios (404, unauthorized)
5. Validate search params functionality

---

## 🎯 Lazy Loading Guidelines

### ✅ **DO** lazy load:

- Route page components for code splitting
- Large feature modules and admin sections

### ❌ **DON'T** lazy load:

- Layout components (RootLayout, AuthLayout, etc.)
- Route guards (AuthGuard, needed for protection logic)
- Error pages and critical UI components
- Small utility components (overhead > benefit)

---

## 🧭 NavLink Best Practices

**src/components/navigation/NavLink.tsx**

```typescript
import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, children, className }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded transition-colors ${
          isActive
            ? 'bg-blue-100 text-blue-900'
            : 'text-gray-700 hover:bg-gray-100'
        } ${className || ''}`
      }
    >
      {children}
    </RouterNavLink>
  );
}
```

**Usage in Navigation:**

```typescript
import { NavLink } from './NavLink';
import { ROUTES } from '@/constants/routes';

export function Navigation() {
  return (
    <nav className="flex space-x-4">
      <NavLink to={ROUTES.HOME}>Home</NavLink>
      <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
      <NavLink to={ROUTES.USERS.LIST}>Users</NavLink>
    </nav>
  );
}
```

---

## 🎯 Best Practices Summary

- **Centralize routes**: Define all routes in `constants/routes.ts`
- **Use TypeScript**: Type your route params and loader data
- **Lazy loading**: Selectively lazy load page components only
- **Route guards**: Protect routes with authentication/authorization
- **Layouts**: Use nested routes with `<Outlet />` for shared layouts
- **Error handling**: Implement error boundaries and loading states
- **Future flags**: Enable v7 compatibility flags early

---

## 📚 Complete Example

```typescript
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES, generateRoute } from '@/constants/routes';

function UserDetail() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User: {id}</h1>
      <button onClick={() => navigate(ROUTES.USERS.LIST)}>Back to Users</button>
      <button onClick={() => navigate(ROUTES.DASHBOARD)}>Dashboard</button>
    </div>
  );
}

function UserList() {
  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(generateRoute.userDetail(userId));
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => handleUserClick('123')}>View User 123</button>
    </div>
  );
}
```

---

This setup provides a **clean**, **scalable**, and **type-safe** routing solution for modern React applications.
