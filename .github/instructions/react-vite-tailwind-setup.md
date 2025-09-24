# React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui — Setup Guide

This is a **step-by-step setup guide** for shadcn/ui with Tailwind CSS v4 in a React + TypeScript + Vite project.  
Follow each step in order. **Do not skip any commands.**

---

## 📋 Table of Contents

1. [Project Initialization](#step-1-project-initialization)
2. [Install Tailwind CSS v4](#step-2-install-tailwind-css-v4)
3. [ESLint Setup](#step-3-eslint-setup)
4. [Prettier Setup](#step-4-prettier-setup)
5. [Husky Setup](#step-5-husky-setup)
6. [Install shadcn/ui CLI](#step-6-install-shadcnui-cli)
7. [Setup shadcn/ui with Tailwind v4](#step-7-setup-shadcnui-with-tailwind-v4)
8. [Add Components](#step-8-add-components)
9. [Dark Mode Configuration](#step-9-dark-mode-configuration)
10. [Example Usage](#step-10-example-usage)
11. [Project Structure](#step-11-project-structure)
12. [Documentation Links](#step-12-documentation-links)

---

## Step 1: Project Initialization

Run these commands:

\`\`\`bash

# Create project with Vite React + TypeScript template

pnpm create vite@latest . -- --template react-ts

# Install dependencies

pnpm install
\`\`\`

✅ **Verify after this step:**

- \`vite.config.ts\`, \`tsconfig.app.json\`, and \`src/\` folder exist.
- \`index.html\` and \`package.json\` exist in the root.

> Reference: [Vite Getting Started Guide](https://vitejs.dev/guide/)

---

## Step 2: Install Tailwind CSS v4

Install Tailwind CSS:

\`\`\`bash
pnpm add tailwindcss @tailwindcss/vite
\`\`\`

- Clear \`src/index.css\` completely before adding Tailwind imports.
- Add this line to \`src/index.css\`:

\`\`\`css
@import "tailwindcss";
\`\`\`

✅ **Verify after this step:**

- \`src/index.css\` only contains the Tailwind import.

> Reference: [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/installation)

---

### Configure Utilities

Create \`src/lib/utils.ts\` for className utilities:

\`\`\`ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}
\`\`\`

Install required dependencies:

\`\`\`bash
pnpm add clsx tailwind-merge
pnpm add -D @types/node
\`\`\`

Update \`tsconfig.app.json\` to include path aliases:

\`\`\`json
{
"compilerOptions": {
"baseUrl": ".",
"paths": {
"@/_": ["./src/_"]
}
}
}
\`\`\`

Update \`vite.config.ts\`:

\`\`\`ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
plugins: [react(), tailwindcss()],
resolve: {
alias: {
"@": path.resolve(\_\_dirname, "./src"),
},
},
});
\`\`\`

---

## Step 3: ESLint Setup

Install ESLint and plugins:

\`\`\`bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-prettier eslint-config-prettier globals eslint-import-resolver-typescript
\`\`\`

> Reference: [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)

---

## Step 4: Prettier Setup

Install Prettier:

\`\`\`bash
pnpm add -D prettier
\`\`\`

Create \`.prettierrc\` and \`.prettierignore\` files as needed.

> Reference: [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

---

## Step 5: Husky Setup

Install Husky and lint-staged:

\`\`\`bash
pnpm add -D husky lint-staged
pnpm dlx husky init
\`\`\`

Add pre-commit hook in \`.husky/pre-commit\`:

\`\`\`bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

pnpm dlx lint-staged
\`\`\`

Update \`package.json\` scripts and lint-staged config:

\`\`\`json
"lint-staged": {
"_.{ts,tsx}": ["eslint --fix", "prettier --write"],
"_.{js,jsx,json,css,md}": ["prettier --write"]
}
\`\`\`

> Reference: [Husky Documentation](https://typicode.github.io/husky/)

---

## Step 6: Install shadcn/ui CLI

Install via pnpm:

\`\`\`bash
pnpm dlx shadcn@latest init
\`\`\`

Configure:

- Framework: React
- Styling: Tailwind CSS
- Components: \`src/components\`
- Utils: \`src/lib/utils\`
- CSS file: \`src/index.css\`

> Reference: [shadcn/ui CLI Documentation](https://ui.shadcn.com/docs/cli)

---

## Step 7: Setup shadcn/ui with Tailwind v4

Update \`src/index.css\` for theme configuration:

\`\`\`css
@import "tailwindcss";

@theme {
--color-primary: var(--clr-primary);
}

:root {
--clr-primary: #4f46e5;
}

.dark {
--clr-primary: #6366f1;
}

@layer base {

- {
  @apply border-border;
  }

body {
@apply bg-background text-foreground;
}
}
\`\`\`

---

## Step 8: Add Components

Add components via CLI:

\`\`\`bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card dialog input label
\`\`\`

Example usage:

\`\`\`tsx
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
return (

<div className="space-x-2">
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
</div>
);
}
\`\`\`

> Reference: [shadcn/ui Components](https://ui.shadcn.com/docs/components)

---

## Step 9: Dark Mode Configuration

Create \`src/components/theme-provider.tsx\` as shown in the original file.

---

## Step 10: Example Usage

Update \`src/App.tsx\` and \`src/main.tsx\` with the example code provided earlier.

---

## Step 11: Project Structure

Verify the final structure matches the one shown in the original file.

---

## Step 12: Documentation Links

All original reference links remain unchanged.

---

## ✅ Setup Completion Checklist

- [ ] Project initialized
- [ ] Tailwind CSS v4 installed
- [ ] ESLint + Prettier + Husky configured
- [ ] shadcn/ui CLI installed
- [ ] Components added
- [ ] Dark mode enabled
- [ ] Path aliases configured
- [ ] Example usage tested
- [ ] Project structure verified

---

## Quick Commands

\`\`\`bash

# Development

pnpm run dev

# Code Quality

pnpm run lint
pnpm run lint:fix
pnpm run format
pnpm run format:check
pnpm run type-check

# Components

pnpm dlx shadcn@latest add <component-name>

# Build

pnpm run build
pnpm run preview
\`\`\`
