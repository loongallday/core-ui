# @core-erp/ui - Development Guide

Comprehensive guide for developing, building, and contributing to @core-erp/ui.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Adding New Components](#adding-new-components)
6. [Building & Testing](#building--testing)
7. [Versioning & Releases](#versioning--releases)
8. [Contributing Guidelines](#contributing-guidelines)

---

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (comes with Node.js)
- **Git**: For version control

### Initial Setup

```bash
# Clone the repository (if starting fresh)
cd composable-erp/core-ui

# Install dependencies
npm install

# Build the package
npm run build

# Verify build
ls -la dist/
```

### Development Mode

```bash
# Watch mode - rebuilds on file changes
npm run dev
```

Leave this running in a terminal while developing. Changes will automatically rebuild.

---

## Development Environment

### IDE Setup

**VS Code** (Recommended):

Install these extensions:
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind autocomplete
- **TypeScript Hero**: Import organization

**Settings** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### File Structure

```
core-ui/
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── responsive/    # Custom responsive components
│   │   └── loading/       # Loading components
│   ├── lib/               # Utilities
│   ├── hooks/             # Custom hooks
│   ├── styles/            # Global styles
│   └── types/             # TypeScript types
│
├── dist/                  # Build output (gitignored)
│
├── docs/                  # Documentation (you are here)
│
├── package.json           # Package manifest
├── tsconfig.json          # TypeScript config
├── tsconfig.build.json    # Build-specific TS config
├── vite.config.ts         # Vite bundler config
├── tailwind.config.js     # Tailwind preset (exported)
└── postcss.config.js      # PostCSS config
```

---

## Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

This runs Vite in watch mode. Any changes to `src/**/*` trigger a rebuild.

### 2. Make Changes

Edit files in `src/` directory:

```typescript
// Example: Edit src/components/ui/button.tsx
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>
}
```

### 3. Test in Consumer App

In a separate terminal, link and test in core-erp:

```bash
# Terminal 1: Watch mode in core-ui
cd core-ui
npm run dev

# Terminal 2: Run core-erp with changes
cd ../core-erp
npm install  # Re-links core-ui
npm run dev
```

Changes in `core-ui/src` → rebuild → core-erp uses new version automatically.

### 4. Type Check

```bash
npm run type-check
```

Runs TypeScript compiler without emitting files. Catches type errors.

### 5. Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/`.

---

## Adding New Components

### Adding a UI Component (shadcn/ui)

If adding from shadcn/ui library:

```bash
# Use shadcn CLI (if available)
npx shadcn-ui@latest add <component-name>
```

Or manually:

1. **Create Component File**: `src/components/ui/new-component.tsx`
2. **Implement Component**: Follow shadcn/ui patterns
3. **Export from Index**: Add to `src/components/ui/index.ts`
4. **Update Build**: Component automatically included in build

**Example** - Adding a new component:

```typescript
// src/components/ui/custom-input.tsx
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium">
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input",
            "bg-background px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
CustomInput.displayName = 'CustomInput'

export { CustomInput }
```

```typescript
// src/components/ui/index.ts
export * from './button'
export * from './card'
// ... existing exports
export * from './custom-input'  // Add new export
```

### Adding a Responsive Component

1. **Create File**: `src/components/responsive/new-component.tsx`
2. **Implement with Responsive Patterns**:

```typescript
// src/components/responsive/ResponsiveCard.tsx
import { cn } from '../../lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

interface ResponsiveCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function ResponsiveCard({ title, children, className }: ResponsiveCardProps) {
  return (
    <Card className={cn('p-4 md:p-6', className)}>
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  )
}
```

3. **Export**: Add to `src/components/responsive/index.ts`

### Adding a Utility Function

1. **Create or Edit**: `src/lib/formatters.ts` or `src/lib/utils.ts`
2. **Implement Function**:

```typescript
// src/lib/utils.ts
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}
```

3. **Export**: Add to `src/lib/index.ts`

```typescript
// src/lib/index.ts
export * from './utils'
export * from './formatters'
```

### Adding a Hook

1. **Create File**: `src/hooks/use-custom-hook.ts`
2. **Implement Hook**:

```typescript
// src/hooks/use-local-storage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
```

3. **Export**: Add to `src/hooks/index.ts`

```typescript
// src/hooks/index.ts
export * from './use-toast'
export * from './use-mobile'
export * from './use-local-storage'  // Add new hook
```

---

## Building & Testing

### Development Build

```bash
npm run dev
```

**What it does**:
- Runs Vite in watch mode
- Rebuilds on file changes
- Fast, unminified builds
- Source maps included

### Production Build

```bash
npm run build
```

**What it does**:
1. Runs TypeScript compiler (`tsc`) → generates `.d.ts` files
2. Runs Vite bundler → bundles JavaScript
3. Processes CSS with PostCSS + Tailwind
4. Outputs to `dist/` directory

**Output Structure**:
```
dist/
├── index.js
├── index.d.ts
├── components/
│   ├── ui/index.js
│   ├── ui/index.d.ts
│   ├── responsive/index.js
│   └── ...
├── lib/
├── hooks/
└── styles/
```

### Type Checking

```bash
npm run type-check
```

Validates TypeScript without emitting files. Useful for CI/CD.

### Testing Components

Currently, testing is done manually in consumer applications (core-erp).

**Future**: Add unit tests with Vitest + Testing Library.

```bash
# Future
npm run test
npm run test:watch
npm run test:coverage
```

### Linting

**ESLint** (if configured):
```bash
npm run lint
npm run lint:fix
```

**Prettier** (if configured):
```bash
npm run format
npm run format:check
```

---

## Versioning & Releases

### Semantic Versioning

Follow [Semantic Versioning 2.0.0](https://semver.org/):

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Version Update Process

1. **Update Version**:

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major
```

2. **Rebuild**:

```bash
npm run build
```

3. **Update Consumers**:

```bash
# In core-erp or plugins
cd ../core-erp
npm install @core-erp/ui@latest
```

4. **Document Changes**:

Create or update `CHANGELOG.md`:

```markdown
## [1.1.0] - 2025-11-10

### Added
- New ResponsiveCard component
- useLocalStorage hook

### Changed
- Improved Button hover states
- Updated type definitions

### Fixed
- Fixed PageHeader sticky positioning
```

### Publishing (Future)

If publishing to npm registry:

```bash
npm publish
```

For private registry:
```json
// package.json
{
  "publishConfig": {
    "registry": "https://your-private-registry.com"
  }
}
```

---

## Contributing Guidelines

### Code Style

**TypeScript**:
- Use TypeScript for all code
- Prefer `interface` over `type` for objects
- Always type function parameters and returns
- Avoid `any` - use `unknown` if needed

**React**:
- Use functional components with hooks
- Use `React.forwardRef` for ref forwarding
- Memoize expensive computations with `useMemo`
- Use `React.memo` for performance-critical components

**Naming**:
- Components: PascalCase (`Button`, `PageHeader`)
- Files: Match component name (`Button.tsx`, `PageHeader.tsx`)
- Hooks: camelCase with `use` prefix (`useToast`, `useMobile`)
- Utilities: camelCase (`cn`, `formatDate`)
- Types: PascalCase (`ButtonProps`, `FormatterOptions`)

### Component Patterns

**Props Interface**:
```typescript
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props first
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  // Then extends HTML attributes
}
```

**Ref Forwarding**:
```typescript
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('base-styles', className)} {...props} />
  }
)
Component.displayName = 'Component'
```

**Class Name Merging**:
```typescript
import { cn } from '../../lib/utils'

<div className={cn('base-classes', 'conditional-classes', className)} />
```

### Documentation

When adding components:

1. **JSDoc Comments**:
```typescript
/**
 * A versatile button component with multiple variants.
 * 
 * @example
 * <Button variant="default" size="lg">Click me</Button>
 * 
 * @param variant - Button style variant
 * @param size - Button size
 */
export function Button({ variant, size, ...props }: ButtonProps) {
  // ...
}
```

2. **Update Component Catalog**: Add entry to `docs/COMPONENT_CATALOG.md`

3. **Update README**: Mention in main README if significant

### Testing Checklist

Before committing:

- [ ] Code builds without errors (`npm run build`)
- [ ] Types are correct (`npm run type-check`)
- [ ] Component works in core-erp
- [ ] Responsive behavior tested (mobile, tablet, desktop)
- [ ] Accessibility checked (keyboard navigation, screen reader)
- [ ] Documentation updated

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add ResponsiveCard component
fix: correct PageHeader z-index issue
docs: update COMPONENT_CATALOG with new hooks
refactor: simplify Button variant logic
chore: update dependencies
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Create Branch**: `git checkout -b feat/new-component`
2. **Make Changes**: Implement feature/fix
3. **Test**: Verify everything works
4. **Commit**: Use conventional commit messages
5. **Push**: `git push origin feat/new-component`
6. **Create PR**: Include description, screenshots if applicable
7. **Review**: Address feedback
8. **Merge**: Squash and merge

---

## Troubleshooting

### Build Errors

**Problem**: `Cannot find module '@radix-ui/react-*'`

**Solution**: Install missing dependency
```bash
npm install @radix-ui/react-*
```

---

**Problem**: TypeScript errors in consumers

**Solution**: Rebuild with type declarations
```bash
npm run build
```

---

**Problem**: Changes not appearing in core-erp

**Solution**: Reinstall in core-erp
```bash
cd ../core-erp
npm install
```

---

### Type Errors

**Problem**: `Type error in dist/index.d.ts`

**Solution**: Check `tsconfig.json` and `tsconfig.build.json` configuration
```bash
npm run type-check
```

---

### Tailwind Classes Not Working

**Problem**: New classes not applying in consumer

**Solution**: 
1. Ensure content paths include `@core-erp/ui` in consumer's `tailwind.config.ts`
2. Rebuild @core-erp/ui
3. Restart consumer's dev server

```typescript
// In core-erp/tailwind.config.ts
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@core-erp/ui/dist/**/*.js'  // Include this
  ]
}
```

---

## Development Tips

### Performance Optimization

1. **Tree-Shaking**: Use named exports, avoid default exports
2. **Code Splitting**: Import from specific paths (`@core-erp/ui/components/ui`)
3. **Bundle Analysis**: Use `vite-bundle-visualizer` to analyze bundle

### Debugging

**Vite Build Issues**:
```bash
# Verbose build
DEBUG=vite:* npm run build

# Clear cache
rm -rf dist node_modules/.vite
npm run build
```

**TypeScript Issues**:
```bash
# Clean TypeScript cache
rm -rf dist
npx tsc --build --clean
npm run build
```

### Hot Reload

When developing, keep both watch modes running:

```bash
# Terminal 1
cd core-ui && npm run dev

# Terminal 2
cd core-erp && npm run dev
```

Changes in `core-ui` trigger rebuild → core-erp hot reloads.

---

## Next Steps

- Review [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) for all components
- Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design guidelines
- See [API_REFERENCE.md](./API_REFERENCE.md) for detailed API docs

---

**Happy Developing!** 🚀

