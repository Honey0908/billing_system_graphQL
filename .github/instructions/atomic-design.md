# Atomic Design Structure

This project follows the Atomic Design methodology by Brad Frost. The component architecture is organized into five distinct levels:

## 🔬 Atoms (`src/components/atoms/`)

Basic building blocks that can't be broken down further without losing their meaning. These are the foundational elements of our interface.

**Examples:**

- Buttons
- Input fields
- Labels
- Icons
- Typography elements

**Current atoms:**

- `Button` - Basic button component with variants
- `Card` - Card container and related components
- `Dialog` - Modal dialog components
- `Input` - Form input field
- `Label` - Form label

## 🧬 Molecules (`src/components/molecules/`)

Simple groups of atoms functioning together as a unit. They have their own properties and serve as the backbone of our design system.

**Examples:**

- Form fields (Label + Input)
- Search boxes
- Navigation items

**Current molecules:**

- `FormField` - Complete form field with label, input, error, and help text
- `ThemeToggle` - Button for switching between light/dark themes

## 🦠 Organisms (`src/components/organisms/`)

Complex components composed of groups of molecules and/or atoms and/or other organisms. They form distinct sections of an interface.

**Examples:**

- Headers
- Forms
- Product listings
- Navigation bars

**Current organisms:**

- `Header` - Main page header with title and theme toggle
- `WelcomeCard` - Introduction card explaining atomic design

## 📄 Templates (`src/components/templates/`)

Page-level objects that place components into a layout and articulate the design's underlying content structure.

**Examples:**

- Page layouts
- Grid systems
- Content templates

**Current templates:**

- `MainLayout` - Main page layout with header and content area

## 🌐 Pages (`src/pages/`)

Specific instances of templates that show what a UI looks like with real representative content in place.

**Current pages:**

- `HomePage` - Main landing page demonstrating atomic components

## File Structure

```
src/
├── components/
│   ├── atoms/           # Basic building blocks
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── index.ts
│   ├── molecules/       # Simple groups of atoms
│   │   ├── form-field.tsx
│   │   ├── theme-toggle.tsx
│   │   └── index.ts
│   ├── organisms/       # Complex groups of molecules
│   │   ├── header.tsx
│   │   └── index.ts
│   ├── templates/       # Page layouts
│   │   ├── main-layout.tsx
│   │   └── index.ts
│   └── index.ts        # Main components export
├── pages/              # Specific page instances
│   ├── home.tsx
│   └── index.ts
├── providers/          # Context providers
│   ├── theme-provider.tsx
│   └── index.ts
└── lib/
    └── utils.ts        # Utility functions
```

## Import Strategy

Components are organized with barrel exports for clean imports:

```tsx
// Import atoms
import { Button, Card, Input } from '@/components/atoms';

// Import molecules
import { FormField, ThemeToggle } from '@/components/molecules';

// Import organisms
import { Header, WelcomeCard } from '@/components/organisms';

// Import templates
import { MainLayout } from '@/components/templates';

// Import pages
import { HomePage } from '@/pages';

// Import providers
import { ThemeProvider } from '@/providers';
```

## Benefits of This Structure

1. **Scalability** - Easy to add new components at the appropriate level
2. **Reusability** - Components can be composed and reused across different contexts
3. **Maintainability** - Clear separation of concerns and organized codebase
4. **Testing** - Each level can be tested independently
5. **Documentation** - Clear hierarchy makes it easy to understand component relationships
6. **Collaboration** - Team members can work on different levels without conflicts

## Adding New Components

When adding new components, consider their complexity and composition:

1. **Atom** - If it's a basic, indivisible UI element
2. **Molecule** - If it combines 2-3 atoms with a specific purpose
3. **Organism** - If it's a complex component that could contain multiple molecules
4. **Template** - If it defines a page layout structure
5. **Page** - If it's a specific instance with real content

Remember to update the corresponding `index.ts` files to export new components.
