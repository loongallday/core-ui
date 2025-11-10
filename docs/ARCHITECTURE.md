# @core-erp/ui - Architecture Documentation

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Package Structure](#package-structure)
3. [Build System](#build-system)
4. [Module System & Exports](#module-system--exports)
5. [Component Architecture](#component-architecture)
6. [Design System Architecture](#design-system-architecture)
7. [Type System](#type-system)
8. [Integration Patterns](#integration-patterns)
9. [Performance Considerations](#performance-considerations)
10. [Security Considerations](#security-considerations)

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Core ERP Ecosystem                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐      ┌──────────────────────────────┐  │
│  │   Core ERP App  │      │       Plugin Ecosystem        │  │
│  │                 │      │                               │  │
│  │  ┌───────────┐  │      │  ┌────────┐   ┌──────────┐  │  │
│  │  │   Pages   │  │      │  │Plugin A│   │ Plugin B │  │  │
│  │  └─────┬─────┘  │      │  └───┬────┘   └────┬─────┘  │  │
│  │        │        │      │      │             │        │  │
│  │  ┌─────▼─────┐  │      │  ┌───▼────┐   ┌───▼─────┐  │  │
│  │  │Components │  │      │  │ Views  │   │  Views  │  │  │
│  │  └─────┬─────┘  │      │  └───┬────┘   └────┬─────┘  │  │
│  └────────┼────────┘      └──────┼─────────────┼────────┘  │
│           │                      │             │           │
│           └──────────────────────┼─────────────┘           │
│                                  │                         │
│                    ┌─────────────▼──────────────┐          │
│                    │     @core-erp/ui Package   │          │
│                    │                            │          │
│                    │  Components | Utilities    │          │
│                    │  Design Tokens | Hooks     │          │
│                    └────────────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Package Relationship

```
@core-erp/ui
    ↓ (file: or npm)
    ├─→ core-erp (main application)
    │   └─→ Uses components, utilities, design tokens
    │
    └─→ plugins (peerDependency)
        ├─→ inventory-plugin
        ├─→ sales-plugin
        ├─→ hr-plugin
        └─→ custom-plugins
            └─→ All share same UI layer
```

### Deployment Model

Each customer deployment includes:
1. **Core ERP Application**: Main app with @core-erp/ui bundled
2. **Supabase Instance**: Isolated database and auth
3. **Plugins**: Each plugin references @core-erp/ui as peer dependency

```
Customer A Deployment          Customer B Deployment
┌──────────────────┐          ┌──────────────────┐
│ Core ERP (v1.0)  │          │ Core ERP (v1.2)  │
│ @core-erp/ui@1.0 │          │ @core-erp/ui@1.2 │
│ Plugins (v1.x)   │          │ Plugins (v1.x)   │
│ Supabase-A       │          │ Supabase-B       │
└──────────────────┘          └──────────────────┘
    Complete isolation            Complete isolation
```

## Package Structure

### Directory Layout

```
@core-erp/ui/
├── src/                        # Source code
│   ├── index.ts               # Main entry point
│   │
│   ├── components/            # All React components
│   │   ├── index.ts          # Barrel export for all components
│   │   │
│   │   ├── ui/               # shadcn/ui components (48)
│   │   │   ├── index.ts      # Export all UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...           # 45 more components
│   │   │
│   │   ├── responsive/       # Custom responsive components (6)
│   │   │   ├── index.ts
│   │   │   ├── PageContainer.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── ResponsiveGrid.tsx
│   │   │   ├── ResponsiveStack.tsx
│   │   │   ├── ResponsiveButton.tsx
│   │   │   └── ResponsiveTable.tsx
│   │   │
│   │   └── loading/          # Loading states (2)
│   │       ├── index.ts
│   │       ├── SkeletonCard.tsx
│   │       └── SkeletonTable.tsx
│   │
│   ├── lib/                  # Utility functions
│   │   ├── index.ts          # Barrel export
│   │   ├── utils.ts          # cn() function
│   │   └── formatters.ts     # Date, number, currency formatters
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── index.ts
│   │   ├── use-toast.ts      # Toast notifications
│   │   └── use-mobile.ts     # Responsive breakpoint detection
│   │
│   ├── styles/               # Global styles
│   │   └── globals.css       # CSS variables, base styles
│   │
│   └── types/                # TypeScript types
│       └── index.ts          # Exported type definitions
│
├── dist/                     # Build output (generated, gitignored)
│   ├── index.js              # Bundled ESM
│   ├── index.d.ts            # Type definitions
│   ├── components/
│   │   ├── index.js
│   │   ├── index.d.ts
│   │   ├── ui/
│   │   ├── responsive/
│   │   └── loading/
│   ├── lib/
│   ├── hooks/
│   └── styles/
│
├── tailwind.config.js        # Tailwind preset (exported)
├── postcss.config.js         # PostCSS configuration
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript base config
├── tsconfig.build.json       # TypeScript build config
├── package.json              # Package metadata
└── README.md                 # User documentation
```

### Key Files Explained

#### `src/index.ts`
Main entry point that re-exports everything:
```typescript
export * from './components'
export * from './lib'
export * from './hooks'
export * from './types'
```

#### `src/components/index.ts`
Component barrel export:
```typescript
export * from './ui'
export * from './responsive'
export * from './loading'
```

#### `package.json` - Exports Field
Defines granular entry points:
```json
{
  "exports": {
    ".": "./dist/index.js",
    "./components": "./dist/components/index.js",
    "./components/ui": "./dist/components/ui/index.js",
    "./components/responsive": "./dist/components/responsive/index.js",
    "./components/loading": "./dist/components/loading/index.js",
    "./lib": "./dist/lib/index.js",
    "./hooks": "./dist/hooks/index.js",
    "./styles": "./dist/styles/globals.css",
    "./tailwind-preset": "./tailwind.config.js"
  }
}
```

## Build System

### Technology Stack

- **Build Tool**: Vite 5.x (fast, modern, optimized)
- **Compiler**: TypeScript 5.x + SWC (fast compilation)
- **CSS Processor**: PostCSS + Tailwind CSS 3.x
- **Type Generation**: vite-plugin-dts

### Build Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { glob } from 'glob'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx']
    })
  ],
  
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/index': resolve(__dirname, 'src/components/index.ts'),
        'components/ui/index': resolve(__dirname, 'src/components/ui/index.ts'),
        'components/responsive/index': resolve(__dirname, 'src/components/responsive/index.ts'),
        'components/loading/index': resolve(__dirname, 'src/components/loading/index.ts'),
        'lib/index': resolve(__dirname, 'src/lib/index.ts'),
        'hooks/index': resolve(__dirname, 'src/hooks/index.ts')
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@radix-ui\/.*/,
        // Other peer dependencies
      ],
      output: {
        preserveModules: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    
    minify: false, // Keep readable for debugging
    sourcemap: true
  }
})
```

### Build Process

```bash
npm run build
```

**Steps**:
1. **TypeScript Compilation**: `tsc` generates type definitions
2. **Vite Build**: Bundles JavaScript with tree-shaking
3. **CSS Processing**: PostCSS + Tailwind processes styles
4. **Type Declaration**: vite-plugin-dts generates `.d.ts` files
5. **Output**: `dist/` directory with ESM modules

**Output Structure**:
```
dist/
├── index.js (and .d.ts)
├── components/
│   ├── index.js
│   ├── ui/index.js
│   ├── responsive/index.js
│   └── loading/index.js
├── lib/index.js
├── hooks/index.js
└── styles/globals.css
```

### Development Mode

```bash
npm run dev
```

Runs Vite in watch mode - rebuilds on file changes.

## Module System & Exports

### ESM Only

The package uses ES Modules exclusively:
```json
{
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js"
}
```

### Granular Exports

Allows importing from specific paths for better tree-shaking:

```typescript
// Main (imports everything)
import { Button } from '@core-erp/ui'

// Specific path (better tree-shaking)
import { Button } from '@core-erp/ui/components/ui'

// Utilities only
import { cn, formatDate } from '@core-erp/ui/lib'

// Hooks only
import { useToast } from '@core-erp/ui/hooks'

// Tailwind preset
import uiPreset from '@core-erp/ui/tailwind-preset'
```

### Export Map

Each export point maps to built files:

| Import Path | Source | Output |
|-------------|--------|--------|
| `@core-erp/ui` | `src/index.ts` | `dist/index.js` |
| `@core-erp/ui/components` | `src/components/index.ts` | `dist/components/index.js` |
| `@core-erp/ui/components/ui` | `src/components/ui/index.ts` | `dist/components/ui/index.js` |
| `@core-erp/ui/lib` | `src/lib/index.ts` | `dist/lib/index.js` |
| `@core-erp/ui/hooks` | `src/hooks/index.ts` | `dist/hooks/index.js` |
| `@core-erp/ui/styles` | `src/styles/globals.css` | `dist/styles/globals.css` |
| `@core-erp/ui/tailwind-preset` | `tailwind.config.js` | `tailwind.config.js` |

## Component Architecture

### Component Categories

#### 1. UI Components (shadcn/ui)
Built on Radix UI primitives, styled with Tailwind.

**Pattern**:
```typescript
// components/ui/button.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground...",
        outline: "border border-input bg-background...",
        // More variants
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Key Patterns**:
- **cva**: Type-safe variants
- **forwardRef**: Ref forwarding for composition
- **asChild**: Polymorphic components via Radix Slot
- **cn()**: Class merging with conflict resolution

#### 2. Responsive Components
Custom components for adaptive layouts.

**Example**: `PageHeader.tsx`
```typescript
interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  breadcrumbs?: React.ReactNode
}

export function PageHeader({ title, subtitle, action, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm md:text-base text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">{action}</div>
      )}
    </div>
  )
}
```

**Responsive Strategies**:
- **Tailwind breakpoints**: `md:`, `lg:`, `xl:`
- **Flex layouts**: Adapt from column to row
- **Conditional rendering**: Use `useIsMobile()` hook
- **Fluid typography**: `clamp()` for font sizes

#### 3. Loading Components
Skeleton states for async content.

**Example**: `SkeletonCard.tsx`
```typescript
import { Skeleton } from '../ui/skeleton'
import { Card, CardHeader, CardContent } from '../ui/card'

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  )
}
```

### Component Composition

Components are designed for composition:

```typescript
// Compose Card with other UI elements
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Manage your profile information</CardDescription>
  </CardHeader>
  <CardContent>
    <Form>
      <Input label="Name" />
      <Textarea label="Bio" />
    </Form>
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

## Design System Architecture

### CSS Variable System

**Theme Structure**:
```css
:root {
  /* Color tokens */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  
  /* Sizing */
  --radius: 0.5rem;
}

.dark {
  /* Dark mode variables */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

**HSL Color Format**:
- Uses HSL without `hsl()` wrapper
- Allows alpha channel: `hsl(var(--primary) / 0.5)`
- Easy manipulation in CSS

### Tailwind Preset

**tailwind.config.js** (exported):
```javascript
module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // More colors...
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

**Consuming the Preset**:
```typescript
// In consumer's tailwind.config.ts
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@core-erp/ui/dist/**/*.js'
  ],
  theme: {
    extend: {
      // Custom overrides
    }
  }
}
```

### Responsive Design System

**Breakpoints**:
```
sm:  640px  - Small tablets
md:  768px  - Tablets
lg:  1024px - Small desktops
xl:  1280px - Desktops
2xl: 1536px - Large desktops
```

**Fluid Typography**:
```css
.text-fluid-sm { font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1rem); }
.text-fluid-base { font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); }
.text-fluid-lg { font-size: clamp(1.125rem, 1rem + 0.625vw, 1.5rem); }
```

## Type System

### TypeScript Configuration

**tsconfig.json** (base):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

**tsconfig.build.json**:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declarationDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.tsx", "**/*.stories.tsx"]
}
```

### Type Exports

All types are exported for consumer use:

```typescript
// From components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// From utilities
export type FormatterOptions = {
  locale?: string
  format?: string
}

// Re-exported from dependencies
export type { VariantProps } from 'class-variance-authority'
```

## Integration Patterns

### In Core ERP

**package.json**:
```json
{
  "dependencies": {
    "@core-erp/ui": "file:../core-ui"
  }
}
```

**tailwind.config.ts**:
```typescript
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@core-erp/ui/dist/**/*.js'
  ]
}
```

**Usage**:
```typescript
import { Button } from '@core-erp/ui/components/ui'
import { PageHeader } from '@core-erp/ui/components/responsive'
```

### In Plugins

**package.json**:
```json
{
  "peerDependencies": {
    "@core-erp/ui": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**Note**: Plugins don't bundle @core-erp/ui. They expect it to be provided by the host application.

## Performance Considerations

### Bundle Size Optimization

1. **Tree-Shaking**: Granular exports allow unused code elimination
2. **No Default Exports**: Named exports for better tree-shaking
3. **External Dependencies**: React and Radix UI marked as external
4. **Code Splitting**: Each export path is a separate entry point

### Runtime Performance

1. **React.memo**: Performance-critical components are memoized
2. **Lazy Loading**: Consumers can dynamically import large components
3. **GPU Acceleration**: Animations use `transform` and `opacity`
4. **Virtualization**: Large lists use virtual scrolling (via react-window)

### CSS Performance

1. **Purge Unused**: Tailwind purges unused classes in production
2. **Critical CSS**: Inline critical styles
3. **CSS Variables**: Minimal runtime recalculation
4. **Will-Change**: Optimized animations

## Security Considerations

### Dependency Security

- Regular `npm audit` checks
- Pinned major versions
- Trusted dependencies only (Radix UI, Tailwind)

### XSS Prevention

- All components use React's built-in XSS protection
- Sanitize user content before rendering
- Use `dangerouslySetInnerHTML` sparingly

### Type Safety

- Strict TypeScript mode
- Runtime validation with Zod (for forms)
- Prop type validation

## Future Architecture Considerations

### Planned Enhancements

1. **Component Lazy Loading**: Dynamic imports for large components
2. **Micro-Frontends**: Support for federated modules
3. **Storybook Integration**: Visual component documentation
4. **Theme Builder**: Runtime theme customization
5. **A11y Testing**: Automated accessibility tests
6. **Visual Regression**: Automated visual testing

### Scalability

- **Versioning Strategy**: Semantic versioning with changelog
- **Breaking Changes**: Migration guides for major versions
- **Deprecation Policy**: 2-version deprecation window
- **Multiple Versions**: Support for parallel major versions if needed

---

**Next**: Review [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) for detailed component documentation.

