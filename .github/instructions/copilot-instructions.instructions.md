---
applyTo: '**'
---

# Billing System Development Guidelines

## Project Overview
This is a multi-tenant billing system where:
- **Multiple firms** can register and operate independently
- Each **firm** can have multiple **staff** and **admins**
- Each **firm** maintains its own **products** catalog
- **Staff and admins** can create bills for their respective firm only
- **Admins** have exclusive rights to add/remove products
- **Staff** can only create bills using existing products

## Architecture & Code Organization

### 1. Import Strategy
- **Use absolute imports** starting with `@` (configured via tsconfig paths)
- Example: `import { Button } from '@/components/atoms/Button'`
- Avoid relative imports like `../../../components`

### 2. Folder Structure
```
src/
├── components/           # Reusable UI components (Atomic Design)
│   ├── atoms/           # Basic building blocks (Button, Input, etc.)
│   ├── molecules/       # Simple combinations (FormField, etc.)
│   ├── organisms/       # Complex components (Forms, Tables, etc.)
│   └── templates/       # Page layouts
├── pages/               # Page-level components
├── types/               # TypeScript type definitions (non-codegen)
├── services/            # API functions and external service calls
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── constants/           # Application constants
└── graphql/             # Generated types and hooks (codegen output)
```

### 3. Type Management
- **Generated types** from GraphQL codegen go in `src/graphql/`
- **Manual types** (business logic, utilities) go in `src/types/` with descriptive filenames
- Example: `src/types/auth.ts`, `src/types/billing.ts`, `src/types/ui.ts`

### 4. GraphQL & Code Generation
- Use GraphQL Codegen to generate types and hooks from backend schema
- Generated files should not be manually edited
- Place `.graphql` query/mutation files in appropriate folders
- Use generated hooks: `useGetProductsQuery()`, `useCreateBillMutation()`

## Technology Stack

### 1. Styling & UI
- **Tailwind CSS** for utility-first styling
- **Ant Design (antd)** for complex components and design system
- Use only **globally configured theme colors** (defined in tailwind/antd config)
- Maintain design consistency across the application

### 2. React Best Practices (React 19)
- Use **function components** with hooks
- Leverage **useActionState** for form handling instead of multiple useState
- Use **React.memo** for performance optimization where needed
- Implement **Suspense** and **ErrorBoundary** for better UX
- Use **useTransition** for non-urgent state updates

### 3. State Management
- Use **React Query/TanStack Query** for server state
- Use **useActionState** for form state management
- Minimize local component state
- Consider **Context** for deeply nested prop drilling

## Code Quality Standards

### 1. TypeScript
- **Strict mode enabled** - no `any` types allowed
- Define proper interfaces for all data structures
- Use generic types where appropriate
- Implement proper error handling with typed errors

### 2. Component Design
- Follow **Atomic Design** methodology
- Keep components **single-responsibility**
- Use proper **prop typing** with interfaces
- Implement **accessibility** features (ARIA labels, keyboard navigation)

### 3. API & Services
- All API calls go in `src/services/` folder
- Organize by feature: `services/auth.ts`, `services/billing.ts`
- Use consistent error handling patterns
- Implement proper loading and error states

### 4. Performance
- Use **React.lazy** for code splitting
- Implement **virtualization** for large lists
- Optimize **bundle size** with proper imports
- Use **useMemo** and **useCallback** judiciously

## Business Logic Rules

### 1. Authentication & Authorization
- Implement **role-based access control** (Admin, Staff)
- **JWT tokens** for authentication
- **Firm isolation** - users can only access their firm's data

### 2. Product Management
- Only **admins** can create, update, or delete products
- Products belong to specific firms
- Maintain **product history** for billing accuracy

### 3. Billing System
- **Staff and admins** can create bills
- Bills can only include products from the same firm
- Implement **bill numbering** system per firm
- Store **complete bill details** (items, quantities, prices, totals)

### 4. Data Validation
- **Client-side validation** with proper error messages
- **Server-side validation** as the source of truth
- Use **form validation libraries** (react-hook-form + zod/yup)

## Development Workflow

### 1. Feature Development
- Create **feature branches** for new functionality
- Write **tests** for business logic
- Use **conventional commits** for clear history
- Implement **progressive enhancement**

### 2. Code Reviews
- Focus on **business logic correctness**
- Ensure **type safety**
- Check **accessibility compliance**
- Verify **performance implications**

### 3. Testing Strategy
- **Unit tests** for utilities and hooks
- **Integration tests** for API services
- **Component tests** for UI interactions
- **E2E tests** for critical user flows

## Security Considerations

### 1. Data Protection
- **Sanitize user inputs**
- Implement **CSRF protection**
- Use **HTTPS** for all communications
- **Validate permissions** on every API call

### 2. Firm Data Isolation
- Ensure **strict data separation** between firms
- Implement **proper access controls**
- **Audit trails** for sensitive operations
- **Secure token handling**

## Performance Guidelines

### 1. Frontend Optimization
- **Lazy load** non-critical components
- **Optimize images** and assets
- Use **efficient re-rendering** patterns
- Implement **caching strategies**

### 2. API Efficiency
- Use **GraphQL fragments** to minimize data transfer
- Implement **pagination** for large datasets
- **Cache frequently accessed** data
- **Batch operations** where possible

Remember: Always prioritize **user experience**, **data security**, and **business rule compliance** in all development decisions.