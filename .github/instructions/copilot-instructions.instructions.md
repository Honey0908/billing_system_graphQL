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

# Copilot Instructions

This is a **React + TypeScript + Vite** project with **shadcn/ui**, **Tailwind CSS v4**, and **Atomic Design architecture**, featuring **Gotham font integration** and a **comprehensive button system**.

## 🏗️ Architecture Overview

### Atomic Design Structure

- **Atoms** (`src/components/atoms/`): Basic UI building blocks (Button, Card, Dialog, Input, Label, Tab)
- **Molecules** (`src/components/molecules/`): Combined atoms (FormField, SegmentedControl, StatCard, TabList, ToggleButtons, ChartComponents)
- **Organisms** (`src/components/organisms/`): Complex UI sections (Header, TopNavigation, DashboardHeader, ContentCard)
- **Templates** (`src/components/templates/`): Layout structures (MainLayout)
- **Pages** (`src/pages/`): Complete page compositions (InvestPage, InvestNewPage)

### Technology Stack

- **React**: React 19 with modern patterns and automatic batching
- **Build Tool**: Vite with path aliases (`@/` → `src/`)
- **Styling**: Tailwind CSS v4 with `@theme inline` configuration
- **UI Components**: shadcn/ui (customized to use atoms directory)
- **Package Manager**: pnpm (use `pnpm` not `npm`)
- **Typography**: Gotham font family with 5 weight variants
- **State Management**: TanStack React Query v5 for server state
- **HTTP Client**: Axios for API calls
- **Icons**: Lucide React for consistent iconography
- **Utilities**: CVA (Class Variance Authority) for component variants
- **Language**: TypeScript with strict mode enabled for full type safety

## 🎨 Design System

### Enhanced Button System

**7 variants with comprehensive states:**

```tsx
// Primary (dark blue #003264)
<Button variant="primary">Action</Button>

// Secondary variants
<Button variant="secondary-gray">Cancel</Button>
<Button variant="secondary-color">Secondary</Button>

// Tertiary variants (no borders)
<Button variant="tertiary-gray">Subtle</Button>
<Button variant="tertiary-color">Accent</Button>

// Link variants (text only)
<Button variant="link-gray">Learn More</Button>
<Button variant="link-color">External Link</Button>
```

**Icon button support with proper sizing:**

```tsx
// Icon-only buttons with square aspect ratios
<Button variant="primary" size="icon-sm"><Plus /></Button>
<Button variant="primary" size="icon-md"><Plus /></Button>
<Button variant="primary" size="icon-lg"><Plus /></Button>
<Button variant="primary" size="icon-xl"><Plus /></Button>
<Button variant="primary" size="icon-2xl"><Plus /></Button>
```

**5 sizes with proper touch targets:**

- `sm`: 36px height, `text-[14px]`
- `md`: 40px height, `text-[14px]` (default)
- `lg`: 44px height, `text-[16px]`
- `xl`: 48px height, `text-[16px]`
- `2xl`: 56px height, `text-[18px]`

**Icon sizes for square buttons:**

- `icon-sm`: 36px × 36px
- `icon-md`: 40px × 40px
- `icon-lg`: 44px × 44px
- `icon-xl`: 48px × 48px
- `icon-2xl`: 56px × 56px

**Icon support with automatic spacing:**

```tsx
<Button variant="primary" size="md">
  <Plus />
  Add Item
</Button>

// Dot indicator support for notification states
<Button variant="primary" iconPosition="dot-leading">
  <span>Notifications</span>
</Button>
```

### Typography System

**Gotham fonts with semantic weights:**

```tsx
<h1 className="font-gotham font-bold">Headline</h1>
<p className="font-gotham font-normal">Body text</p>
<span className="font-gotham font-light">Subtle text</span>
```

**Available weights:** `font-light` (300), `font-normal` (400), `font-medium` (500), `font-bold` (700), `font-black` (900)

### Data Visualization System

**Chart Components for Financial Data:**

```tsx
// Area chart with customizable styling
<AreaChartVisualization
  data={chartData}
  height={200}
  showXAxis={true}
  showYAxis={true}
/>

// Combined chart with date range selector
<BalanceTrendViewer
  title="Account Balance Trend"
  data={balanceData}
  dateRanges={dateRangeOptions}
  activeRange="1M"
  onRangeChange={setActiveRange}
/>

// Filterable chart container with controls
<FilterableChartContainer
  data={portfolioData}
  filters={filterOptions}
  onFilterChange={handleFilterChange}
/>
```

**Chart Data Types:**

```tsx
interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface DateRangeItem {
  id: string;
  label: string;
  value: string;
}
```

### Design Tokens System

**Figma to CSS Variables Integration:**

- **Source**: Design tokens exported from Figma as single JSON file in `src/design-tokens/universal.token.json`
- **Processing**: JSON file is converted to CSS variables using generation scripts
- **Mapping**: All variables are mapped in `index.css` within `@theme inline` block
- **Usage**: Strictly use semantic Tailwind classes across the entire project

**Token Categories:**

```tsx
// Colors - Use semantic classes only
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>
<div className="text-muted-foreground">Muted text</div>

// Spacing - Use token-based spacing
<div className="p-4 m-2 gap-6">Consistent spacing</div>

// Border Radius - Use token-based radius
<div className="rounded-md">Standard radius</div>
<div className="rounded-lg">Large radius</div>
```

**Strict Usage Rules:**

- ✅ **Always use semantic Tailwind classes** mapped from design tokens
- ✅ **Use token-based spacing, colors, and radius values**
- ✅ **Convert Figma colors to semantic tokens first** before using in components
- ✅ **Maintain consistency through design system** rather than one-off styles
- ❌ **Never use hardcoded hex colors** like `bg-[#003264]`
- ❌ **Never use arbitrary values** like `p-[24px]`, `text-[16px]`, `w-[320px]`
- ❌ **Never use inline styles** or CSS-in-JS for design system properties
- ❌ **Never bypass the design token system** with custom CSS variables

**Figma Color Integration Process:**

1. **Extract**: Get color codes from Figma design
2. **Add to Tokens**: Include in appropriate JSON token file in `src/design-tokens/`
3. **Generate**: Run token generation scripts to create CSS variables
4. **Map**: Create semantic Tailwind class in theme configuration
5. **Use**: Apply semantic class in components (e.g., `bg-primary`, `text-accent`)

**Examples of Proper Token Usage:**

```tsx
// ✅ Correct: Semantic classes for consistent design
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
<Button className="bg-secondary hover:bg-secondary/90">
<Card className="border-border shadow-sm">

// ❌ Wrong: Arbitrary values break consistency
<div className="bg-[#003264] text-white p-[16px] rounded-[8px]">
<Button className="bg-[#009fdf] hover:bg-[#007bb8]">
<Card className="border-[#eaecf0] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
```

## 🚀 Critical Patterns

### Modern React 19 & TypeScript Standards

**React 19 Optimizations:**

- ✅ **No `useMemo` for simple computations** - React 19 has automatic memoization and better performance
- ✅ **Use direct state transformations** - React 19 batches updates automatically
- ✅ **Leverage built-in optimizations** - Avoid premature optimization with manual memoization
- ❌ **Don't use `useMemo` unless** you have expensive calculations or complex object references
- ❌ **Don't use `useCallback` unless** passing callbacks to memoized components

```tsx
// ✅ React 19: Direct computation (automatically optimized)
const transformedData =
  apiData?.map((item) => ({
    period: item.InfoMonth,
    balance: item.SharesValue,
    date: item.ValuationDate,
  })) ?? [];

// ❌ Old pattern: Unnecessary useMemo
const transformedData = useMemo(() => {
  return (
    apiData?.map((item) => ({
      period: item.InfoMonth,
      balance: item.SharesValue,
      date: item.ValuationDate,
    })) ?? []
  );
}, [apiData]);
```

**Strict TypeScript Requirements:**

- ✅ **Type everything explicitly** - No `any` types allowed
- ✅ **Use type-only imports** for types: `import type { TypeName } from "@/types"`
- ✅ **Define interfaces for all props** - Include proper TypeScript documentation
- ✅ **Use union types and strict null checks** - Handle all edge cases with types
- ❌ **Never use `any`** - Use `unknown` or proper typing instead
- ❌ **Never ignore TypeScript errors** - Fix them, don't suppress them

```tsx
// ✅ Correct: Full TypeScript typing
interface ChartContainerProps {
  title?: string;
  data: ChartDataPoint[];
  isLoading: boolean;
  error: Error | null;
  onRangeChange: (rangeId: string) => void;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  data,
  isLoading,
  error,
  onRangeChange,
}) => {
  // Component implementation
};

// ❌ Wrong: Missing or loose typing
const ChartContainer = ({
  title,
  data,
  isLoading,
  error,
  onRangeChange,
}: any) => {
  // Bad implementation
};
```

**Code Quality Standards:**

- ✅ **Zero console.log statements** - Use proper debugging tools or remove before commit
- ✅ **No commented-out code** - Delete unused code, don't comment it out
- ✅ **Replace static with dynamic** - When adding API integration, remove all static/mock data
- ✅ **Component reusability** - Break large components into smaller, reusable pieces
- ✅ **Check for existing utilities** - Before creating new utils, verify if similar functionality already exists
- ✅ **Centralized messaging** - Store all error messages in `globalError` file and success messages in `globalSuccess` file
- ✅ **Fix ESLint errors** - Resolve linting issues instead of disabling them with eslint-disable
- ❌ **Never leave console.log** - Clean up all debug statements
- ❌ **Never leave static data** when dynamic data is available
- ❌ **Never duplicate utilities** - Reuse existing utility functions
- ❌ **Never use eslint-disable** - Fix the underlying issue instead of suppressing warnings

```tsx
// ✅ Correct: Clean, reusable components
const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center p-6">
    <div className="font-gotham font-medium text-muted-foreground">
      Loading...
    </div>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center p-6">
    <div className="font-gotham font-medium text-destructive">{message}</div>
  </div>
);

const ChartContainer: React.FC<ChartProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load chart data" />;

  return <Chart data={data} />;
};

// ❌ Wrong: Monolithic component with console.log and commented code
const ChartContainer = ({ data, isLoading, error }) => {
  console.log("Chart data:", data); // Remove this!

  // const oldStaticData = [{ period: "Jan", value: 100 }]; // Delete this!

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="font-gotham font-medium text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="font-gotham font-medium text-destructive">
          Failed to load chart data
        </div>
      </div>
    );
  }

  return <Chart data={data} />;
};
```

**Component Decomposition Rules:**

- ✅ **Split components at 50+ lines** - Break into smaller, focused components
- ✅ **Extract reusable UI patterns** - Create atoms/molecules for repeated patterns
- ✅ **Separate concerns** - UI logic vs business logic vs data fetching
- ✅ **Use composition over inheritance** - Compose components from smaller pieces

```tsx
// ✅ Correct: Well-decomposed components
const ChartHeader: React.FC<ChartHeaderProps> = ({ title, controls }) => (
  <div className="flex items-center justify-between mb-6">
    <h3 className="font-gotham font-medium text-xl">{title}</h3>
    {controls}
  </div>
);

const ChartBody: React.FC<ChartBodyProps> = ({ data, height }) => (
  <div className="flex-1">
    <AreaChartVisualization data={data} height={height} />
  </div>
);

const FilterableChartContainer: React.FC<FilterableChartContainerProps> = ({
  title,
  data,
  dateRanges,
  activeRange,
  onRangeChange,
}) => (
  <div className="bg-white rounded-lg border border-border p-6">
    <ChartHeader
      title={title}
      controls={
        <DateRangeSelector
          ranges={dateRanges}
          activeRange={activeRange}
          onRangeChange={onRangeChange}
        />
      }
    />
    <ChartBody data={data} height={300} />
  </div>
);
```

### Component Creation

**Always follow Atomic Design principles:**

```tsx
// Atoms: Basic building blocks
export function NewAtom({ className, ...props }: AtomProps) {
  return <element className={cn("base-styles", className)} {...props} />;
}

// Molecules: Combine multiple atoms
export function NewMolecule() {
  return (
    <div>
      <Label />
      <Input />
      <Button />
    </div>
  );
}
```

### Import Structure

**Use atomic design imports:**

```tsx
import { Button, Card, Input } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { Header } from "@/components/organisms";
```

### shadcn/ui Integration

**Components are aliased to atoms directory:**

- `components.json` aliases `"ui": "@/components/atoms"`
- shadcn/ui components install directly to `src/components/atoms/`
- Never manually edit generated shadcn/ui components

### Styling Conventions

**Use Tailwind classes with design tokens:**

```tsx
// ✅ Correct: Semantic colors from design tokens
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="text-muted-foreground">

// ✅ Correct: Token-based spacing and radius
<div className="p-4 m-2 rounded-md border-border">

// ❌ Avoid: Hardcoded colors
<div className="bg-[#003264] text-white">

// ❌ Avoid: Arbitrary values when tokens exist
<div className="p-[24px] rounded-[8px]">
```

**Design Token Hierarchy:**

1. **Primary**: Use semantic classes mapped from Figma tokens
2. **Process**: Convert any new Figma colors/values to tokens first
3. **Fallback**: Use standard Tailwind classes only if no token exists
4. **Never**: Use arbitrary values, hardcoded hex colors, or inline styles

**Consistency Rules:**

- All design decisions must go through the token system
- Prefer semantic meaning over visual appearance in class names
- Maintain design system integrity over quick fixes
- Document any new tokens added to the system

## 🔧 Development Workflows

### Adding New shadcn/ui Components

```bash
pnpm dlx shadcn@latest add component-name
# Components install to src/components/atoms/
```

### Development Commands

```bash
pnpm run dev          # Start dev server (Vite)
pnpm run build        # TypeScript + Vite build
pnpm run type-check   # TypeScript validation
pnpm run lint:fix     # ESLint auto-fix
pnpm run format       # Prettier formatting
pnpm run generate-tokens  # Generate CSS from design tokens
pnpm run tokens       # Alias for generate-tokens
```

### Pre-Commit Quality Checks

**Before committing code, always perform these checks:**

1. **Remove Empty Files**: Check for and remove any empty files in the project

   ```bash
   # Find empty files (0 bytes)
   find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.json" | xargs ls -la | grep " 0 "

   # Remove empty files if found
   find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.json" -size 0 -delete
   ```

2. **Code Quality Validation**:
   - Remove all `console.log` statements
   - Delete commented-out code blocks
   - Replace static data with dynamic data (where applicable)
   - Ensure proper TypeScript typing (no `any` types)
   - Verify component reusability and proper decomposition
   - Check for existing utilities before creating new ones
   - Use centralized error/success messages from globalConst files
   - Fix all ESLint errors instead of disabling warnings

3. **Run Type Checking**: `pnpm run type-check`
4. **Run Linting**: `pnpm run lint:fix`
5. **Run Formatting**: `pnpm run format`
6. **Verify Build**: `pnpm run build`

**Critical Rules:**

- Never commit empty files to the repository
- Never commit `console.log` statements
- Never commit commented-out code
- Never commit TypeScript errors or `any` types
- Always remove static data when dynamic data is implemented
- Always ensure components are properly decomposed and reusable
- Always check for existing utilities before creating duplicates
- Always use centralized messaging from globalConst files
- Always fix ESLint errors instead of using eslint-disable

**Automated Pre-Commit Hooks:**

- **Husky**: Configured for git hooks
- **lint-staged**: Runs ESLint and Prettier on staged files automatically
- Ensures code quality and consistency before commits

### Design Token Workflow

**1. Import Figma Design Tokens:**

- Export design tokens from Figma as JSON file
- Place JSON file as `src/design-tokens/universal.token.json`
- Contains all primitives, colors, typography, spacing, and semantic tokens

**2. Generate CSS Variables:**

```bash
pnpm run generate-tokens    # Convert JSON to CSS and update index.css
# OR run individually:
cd src/design-tokens
node generate-tokens.cjs     # Convert JSON to CSS variables
node update-css.cjs          # Update index.css with variables
```

**3. Usage in Components:**

```tsx
// ✅ Correct: Use semantic classes
<Button className="bg-primary text-primary-foreground">
<Card className="border-border bg-card">
<Text className="text-muted-foreground">

// ❌ Wrong: Hardcoded values
<Button className="bg-[#003264] text-white">
<Card className="border-[#eaecf0] bg-white">
```

**4. Token Categories in CSS:**

- `--color-*`: All color tokens from Figma
- `--spacing-*`: Spacing scale (none, xs, sm, md, lg, xl, etc.)
- `--radius-*`: Border radius values
- `--primitive-*`: Base primitive values
- Semantic aliases for common usage patterns

### Font Integration

**Font files location:** `src/assets/fonts/gotham/`
**CSS declarations:** `src/assets/fonts/gotham/gotham.css`
**Usage:** Always combine `font-gotham` with weight classes

## ⚠️ Important Notes

### No Theme System

- **Project deliberately removed dark mode/theming**
- No `ThemeProvider`, `useTheme`, or `ThemeToggle` components
- Light mode only with hardcoded color values
- Remove any dark mode references from existing documentation

### Component Organization

- **Atoms**: Keep simple, focused, reusable
- **Molecules**: Combine 2-3 atoms maximum
- **Organisms**: Complex sections with business logic
- **Templates**: Layout structures without content
- **Pages**: Complete page implementations

### Path Resolution

- Always use `@/` imports for internal modules
- Vite resolves `@/` to `src/` directory
- ESLint configured for import sorting and validation

### TypeScript Types Organization

- **TypeScript Types**: Store all TypeScript types in `src/types/`, organized by feature or domain in separate files (e.g., `src/types/user.ts`, `src/types/product.ts`). Import types from this folder throughout the project for consistency and maintainability.

### Performance Considerations

- Button variants use CVA for efficient class generation
- Tailwind CSS v4 uses native CSS imports (no build step)
- Font files optimized for web delivery (.woff2 priority)

## 🎯 Goal

Build a scalable, accessible design system using Atomic Design principles with shadcn/ui components, comprehensive button variants, and Gotham typography integration.

---

# Utility Management & Messaging Standards

**Before Creating New Utilities:**

- ✅ **Check existing utilities** - Search `src/lib/utils.ts` and `src/utils/` directory first
- ✅ **Examine similar functions** - Look for existing formatters, validators, or helpers
- ✅ **Consider extension** - Extend existing utilities rather than creating duplicates
- ❌ **Never duplicate functionality** - Reuse and enhance existing code

```tsx
// ✅ Correct: Check existing utils first
import { formatCurrency, formatPercentage } from "@/lib/utils";

// If new utility needed, check if similar exists:
// src/lib/utils.ts - General utilities (formatting, validation, etc.)
// src/utils/ - Feature-specific utilities

// ❌ Wrong: Creating duplicate formatters
const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}; // This likely already exists as formatCurrency!
```

**Centralized Message Management:**

- ✅ **Error messages** - Store in `src/globalConst/globalError.ts`
- ✅ **Success messages** - Store in `src/globalConst/globalSuccess.ts`
- ✅ **Consistent messaging** - Import from centralized files
- ❌ **Never hardcode messages** - Always use constants for maintainability

```tsx
// ✅ Correct: Centralized error messages
// src/globalConst/globalError.ts
export const GLOBAL_ERRORS = {
  CHART_LOAD_FAILED: "Failed to load chart data",
  API_CONNECTION_ERROR: "Unable to connect to server",
  INVALID_INPUT: "Please check your input and try again",
  UNAUTHORIZED_ACCESS: "You don't have permission to access this resource",
} as const;

// src/globalConst/globalSuccess.ts
export const GLOBAL_SUCCESS = {
  DATA_SAVED: "Data saved successfully",
  TRANSACTION_COMPLETE: "Transaction completed successfully",
  SETTINGS_UPDATED: "Settings updated successfully",
} as const;

// Component usage:
import { GLOBAL_ERRORS } from "@/globalConst/globalError";
import { GLOBAL_SUCCESS } from "@/globalConst/globalSuccess";

const Component = () => {
  if (error) return <ErrorState message={GLOBAL_ERRORS.CHART_LOAD_FAILED} />;
  if (success) showToast(GLOBAL_SUCCESS.DATA_SAVED);
};

// ❌ Wrong: Hardcoded messages scattered throughout code
const Component = () => {
  if (error) return <ErrorState message="Failed to load chart data" />;
  if (success) showToast("Data saved successfully");
};
```

**ESLint Issue Resolution:**

- ✅ **Fix the root cause** - Address the underlying issue causing the warning
- ✅ **Refactor code** - Improve code structure to eliminate warnings
- ✅ **Update configuration** - Adjust ESLint rules if they're project-inappropriate
- ❌ **Never use eslint-disable** - Suppressing warnings hides potential issues

```tsx
// ✅ Correct: Fix unused variable warning
const Component = ({ data, onSubmit }: Props) => {
  const handleSubmit = (formData: FormData) => {
    onSubmit(formData);
  };

  return <form onSubmit={handleSubmit}>...</form>;
};

// ❌ Wrong: Disabling ESLint warnings
const Component = ({ data, onSubmit }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedVariable = "this is not used";

  return <form>...</form>;
};

// ✅ Correct: Fix dependency array warning
const Component = ({ userId }: Props) => {
  const fetchUser = useCallback(async () => {
    await getUserData(userId);
  }, [userId]); // Include all dependencies

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};

// ❌ Wrong: Suppressing dependency warnings
const Component = ({ userId }: Props) => {
  const fetchUser = useCallback(async () => {
    await getUserData(userId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
```

# Code Review & Pre-Commit Standards

# AI Code Review Guidelines for hsa-1 Project

This document defines the rules AI should follow when reviewing or generating code for this project.

---

## 1. Technology Stack

- **React (TypeScript)** with functional components and hooks.
- **Tailwind CSS v4** using **semantic tokens only** (no arbitrary pixel values).
- **shadcn/ui** as the base UI library for components.
- **Atomic Design structure** for organizing components.

---

## 2. Code Structure Rules

- **Atomic Design**:
  - Atoms → Molecules → Organisms → Templates → Pages
  - Each folder has an `index.ts` for barrel exports.
- Components should be **stateless** unless state is required.
- Reusable UI elements → Atoms.
- Combined elements → Molecules.
- Complex sections → Organisms.
- Full layouts → Templates and Pages.

---

## 3. Styling & Design System

- Use **Tailwind semantic classes** from design tokens only.
- Maintain consistent spacing, typography, and colors as defined in tokens.
- Follow responsive breakpoints strictly (`sm`, `md`, `lg`, `xl`).

---

## 4. Code Quality

- Use **TypeScript** strictly: all props/interfaces should be typed.
- Follow **ESLint + Prettier** formatting rules.
- Use **barrel exports** for cleaner imports.
- No inline styles or arbitrary Tailwind classes except in cases where semantic tokens do not provide the required utility (e.g., for third-party library integration or rapid prototyping), and such usage must be documented with a comment explaining the necessity.

---

## 5. Component Guidelines

- Props must be **clean and reusable**.
- Avoid hardcoding data → Pass via props.
- Accessibility:
  - Proper `aria-` attributes for interactive elements.
  - Keyboard navigation support.

---

## 6. Performance & Optimization

- Use **React.memo** for heavy components when needed.
- Avoid unnecessary re-renders.
- Lazy load large components if required.

---

## 7. What AI Should Check

- Code follows **Atomic Design structure**.
- Styling uses **design tokens**, no random values.
- Components are **reusable and maintainable**.
- Accessibility compliance.
- TypeScript correctness.
- Consistent imports, file naming, and folder structure.

---

## 8. File Naming

- Components → `kebab-case`
- Hooks, utils → `kebab-case`
- No spaces or special characters in filenames.

---

## 9. Documentation

- Components with complex props → Add JSDoc comments.
- Keep prop names **self-explanatory**.

---

## 10. AI Behavior

When reviewing or generating code:

- Follow **this guide strictly**.
- Never change design tokens.
- Do not generate unrelated components or pages.
- Keep code **minimal, reusable, and atomic**.
