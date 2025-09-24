# React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui — Setup Guide

A comprehensive guide for setting up shadcn/ui with Tailwind CSS v4 in a modern React + TypeScript + Vite project.

## 📋 Table of Contents

1. [Project Initialization](#1-project-initialization)
2. [Install Tailwind CSS v4](#2-install-tailwind-css-v4)
3. [ESLint Setup](#3-eslint-setup)
4. [Prettier Setup](#4-prettier-setup)
6. [Install shadcn/ui CLI](#6-install-shadcnui-cli)
7. [Setup shadcn/ui with Tailwind v4](#7-setup-shadcnui-with-tailwind-v4)
8. [Add Components](#8-add-components)
9. [Dark Mode Configuration](#9-dark-mode-configuration)
10. [Example Usage](#10-example-usage)
11. [Project Structure](#11-project-structure)
12. [Documentation Links](#12-documentation-links)

---

run all the things inside client folder

## 1. Project Initialization

Create a new React + TypeScript project using Vite:

```bash
# Create project with Vite React + TypeScript template
pnpm create vite@latest . -- --template react-ts


# Install dependencies
pnpm install
```

## **📖 Reference:** [Vite Getting Started Guide](https://vitejs.dev/guide/)

## 2. Install Tailwind CSS v4

Install Tailwind CSS v4:

```bash
pnpm add tailwindcss @tailwindcss/vite
```

> **Note:** As of Tailwind CSS v4, you do not need a `postcss.config.ts{tsx ,js, jsx}` file for all setups. Tailwind will automatically configure PostCSS for you.

### Configure Tailwind CSS v4

ensure that the `src/index.css` file is **completely cleared** of any existing content or code.
Update `src/index.css` to import Tailwind CSS v4 with custom theme variables:

> **Important:** Before proceeding, ensure that the `src/index.css` file is **completely cleared** of any existing content or code. This step is crucial to prevent conflicts with Tailwind CSS and shadcn/ui configurations. Always verify that the file is empty before adding the Tailwind CSS.

```css
@import "tailwindcss";
```

**📖 Reference:** [Tailwind CSS v4 Documentation](https://ui.shadcn.com/docs/installation/vite)

---

### Configure Component Utilities

Create `src/lib/utils.ts` for className utilities:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install required dependencies for the utility function:

```bash
pnpm add clsx tailwind-merge
pnpm add -D @types/node
```

Update `tsconfig.app.json` to include path aliases:

```json
{
  "compilerOptions": {
    // ... existing options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Update `vite.config.ts` to support path aliases:

```typescript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

## 6. Install shadcn/ui CLI

Install the shadcn/ui CLI tool to manage components:

```bash
# Install shadcn/ui CLI globally or use via pnpm dlx
pnpm dlx shadcn@latest init
```

### What is shadcn/ui CLI?

The shadcn/ui CLI is a powerful tool that:

- **Generates component boilerplate** with proper TypeScript types
- **Manages component dependencies** automatically
- **Maintains consistency** across your component library
- **Provides easy updates** for individual components
- **Creates accessible components** following ARIA best practices

The CLI will prompt you with configuration questions:

- **Framework:** React
- **Styling:** Tailwind CSS
- **Components location:** `src/components`
- **Utils location:** `src/lib/utils`
- **CSS file location:** `src/index.css`

**📖 Reference:** [shadcn/ui CLI Documentation](https://ui.shadcn.com/docs/cli)

---

## 7. Setup shadcn/ui with Tailwind v4

### Key Differences with Tailwind v4

**❌ No `tailwind.config.js{jsx, ts, tsx}` file needed**  
In Tailwind CSS v4, configuration is done directly in your CSS files using the `@theme` directive.

**✅ Theme customization via CSS**  
Instead of a config file, extend your theme in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  /* Your custom theme variables */
  --color-primary: var(--clr-primary);
  /* ... other variables */
}
:root {
  --clr-primary: #4f46e5;
}
.dark {
  --clr-primary: #6366f1;
}
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 3. ESLint Setup

Install ESLint and all required plugins for React + TypeScript development:

```bash
# Core ESLint packages
pnpm add -D eslint @eslint/js

# TypeScript ESLint
pnpm add -D typescript-eslint

# React-specific plugins
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# Import plugins
pnpm add -D eslint-plugin-import eslint-plugin-simple-import-sort

# Prettier integration
pnpm add -D eslint-plugin-prettier eslint-config-prettier

# Globals for environment configuration
pnpm add -D globals

# Import resolver for TypeScript
pnpm add -D eslint-import-resolver-typescript
```

### Create ESLint Configuration

**📖 Reference:** [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)

---

## 4. Prettier Setup

Install Prettier for consistent code formatting:

```bash
# Install Prettier (if not already installed)
pnpm add -D prettier
```

### Create Prettier Configuration

### Create Prettier Ignore File

**📖 Reference:** [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

---

## 5. Husky Setup

Install Husky and lint-staged for Git hooks:

```bash
# Install Husky and lint-staged
pnpm add -D husky lint-staged

# Initialize Husky
pnpm dlx husky init
```

### Configure Pre-commit Hook

Update `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm dlx lint-staged
```

### Add lint-staged Configuration

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,jsx,json,css,md}": ["prettier --write"]
  }
}
```

### VS Code Integration

**📖 Reference:** [Husky Documentation](https://typicode.github.io/husky/)

---

## 8. Add Components

Now you can add shadcn/ui components using the CLI:

```bash
# Add a button component
pnpm dlx shadcn@latest add button

# Add multiple components at once
pnpm dlx shadcn@latest add card dialog input label

# Add all available components (not recommended for production)
pnpm dlx shadcn@latest add --all
```

### Component Structure

Components are added to `src/components/ui/` and include:

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── input.tsx
├── lib/
│   └── utils.ts
└── index.css
```

### Example Button Usage

```tsx
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="space-x-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

**📖 Reference:** [shadcn/ui Components](https://ui.shadcn.com/docs/components)

---

## 9. Dark Mode Configuration

### Configure Dark Mode in CSS

Update `src/index.css` with proper dark mode support:

```css
@import "tailwindcss";

@theme {
  /* Your custom theme variables */
  --color-primary: var(--clr-primary);
  /* ... other variables */
}
:root {
  --clr-primary: #4f46e5;
}
.dark {
  --clr-primary: #6366f1;
}
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

### Create Dark Mode Toggle

Create a theme provider component `src/components/theme-provider.tsx`:

```tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
```

---

## 10. Example Usage

### Complete App Example

Update `src/App.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeProvider, useTheme } from "@/components/theme-provider";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">shadcn/ui + Tailwind v4</h1>
          <ThemeToggle />
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to shadcn/ui</CardTitle>
            <CardDescription>
              Beautiful components built with Tailwind CSS v4
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This is an example of shadcn/ui components working with Tailwind
              CSS v4.
            </p>
            <div className="flex gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
```

Update `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 11. Project Structure

After completing the setup, your project should look like this:

```
my-shadcn-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 12. Documentation Links

### Core Technologies

- [**Vite**](https://vitejs.dev/) - Build tool and development server
- [**React**](https://react.dev/) - UI library
- [**TypeScript**](https://www.typescriptlang.org/) - Type-safe JavaScript
- [**Tailwind CSS v4**](https://tailwindcss.com/docs/installation/using-vite) - Utility-first CSS framework

### UI and Styling

- [**shadcn/ui**](https://ui.shadcn.com/) - Component library
- [**shadcn/ui CLI**](https://ui.shadcn.com/docs/cli) - Component management tool

### Code Quality Tools

- [**ESLint**](https://eslint.org/) - JavaScript/TypeScript linter
- [**TypeScript-ESLint**](https://typescript-eslint.io/) - TypeScript-specific linting
- [**Prettier**](https://prettier.io/) - Code formatter
- [**Husky**](https://typicode.github.io/husky/) - Git hooks
- [**lint-staged**](https://github.com/okonet/lint-staged) - Pre-commit linting

### ESLint Plugins

- [**eslint-plugin-react**](https://github.com/jsx-eslint/eslint-plugin-react) - React-specific linting
- [**eslint-plugin-react-hooks**](https://www.npmjs.com/package/eslint-plugin-react-hooks) - React Hooks rules
- [**eslint-plugin-jsx-a11y**](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) - Accessibility linting
- [**eslint-plugin-import**](https://github.com/import-js/eslint-plugin-import) - Import/export linting
- [**eslint-plugin-simple-import-sort**](https://github.com/lydell/eslint-plugin-simple-import-sort) - Import sorting

### Utilities

- [**clsx**](https://github.com/lukeed/clsx) - Conditional className utility
- [**tailwind-merge**](https://github.com/dcastil/tailwind-merge) - Tailwind class merging

### Configuration Guides

- [**Tailwind CSS v4 Migration**](https://tailwindcss.com/docs/v4-beta) - Migration guide from v3 to v4
- [**Vite Path Aliases**](https://vitejs.dev/config/shared-options.html#resolve-alias) - Configure import paths
- [**React + TypeScript Best Practices**](https://react-typescript-cheatsheet.netlify.app/) - TypeScript patterns

---

## 🎉 You're All Set!

Your React + TypeScript + Vite project is now configured with:

- ✅ **Tailwind CSS v4** with modern @theme configuration
- ✅ **ESLint** with comprehensive rules and flat config
- ✅ **Prettier** for consistent code formatting
- ✅ **Husky + lint-staged** for automated code quality checks
- ✅ **shadcn/ui** component library with CLI management
- ✅ **Dark mode support** with theme switching
- ✅ **Path aliases** for clean imports
- ✅ **Animation and typography** plugins
- ✅ **Type-safe** component development
- ✅ **VS Code integration** for seamless development

Run `pnpm run dev` to start developing with beautiful, accessible components! 🚀

## ✅ Setup Completion Checklist

After finishing the setup, use the [check-list.prompt.md](./check-list.prompt.md) file to verify that all steps are complete and your project matches the recommended configuration.

- [ ] Project initialized with Vite React + TypeScript
- [ ] Tailwind CSS v4 installed and configured in `src/index.css`
- [ ] ESLint, Prettier, and Husky set up for code quality
- [ ] shadcn/ui CLI installed and components added to `src/components/ui/`
- [ ] Theme provider and dark mode implemented
- [ ] Path aliases configured in `tsconfig.app.json` and `vite.config.ts`
- [ ] All design tokens mapped from Figma MCP server
- [ ] Example usage tested in `src/App.tsx`
- [ ] Project structure matches documentation

Refer to [check-list.prompt.md](./check-list.prompt.md) for a detailed step-by-step verification before starting development.

### Quick Commands

```bash
# Development
pnpm run dev

# Code Quality
pnpm run lint              # Check for linting errors
pnpm run lint:fix          # Auto-fix linting errors
pnpm run format            # Format all files
pnpm run format:check      # Check if files are formatted
pnpm run type-check        # TypeScript type checking

# shadcn/ui Components
pnpm dlx shadcn@latest add <component-name>

# Build
pnpm run build            # Build for production
pnpm run preview          # Preview production build
```

---

Enjoy building with shadcn/ui and Tailwind CSS v4! 🎨
