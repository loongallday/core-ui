# Migration Guide to v2.0

This guide will help you upgrade from @core-erp/ui v1.x to v2.0.

## Overview of Changes

Version 2.0 brings significant improvements to responsiveness, configurability, and standardization:

- ✨ **Container queries** support for component-level responsiveness
- ✨ **Enhanced breakpoint system** with xs and 3xl breakpoints
- ✨ **Theme configuration** system with ThemeProvider
- ✨ **Component defaults** registry
- ✨ **Comprehensive design tokens** as CSS variables
- ✨ **Mobile-optimized components** with touch-friendly variants
- ✨ **Responsive variant props** (e.g., `size={{ base: 'sm', md: 'lg' }}`)
- ⚠️ **Breaking changes** to Button, Input, and Table components

## Breaking Changes

### Button Component

#### New Props
- `fullWidth` prop added
- `touchOptimized` prop added for mobile
- `loading` prop added
- `leftIcon` and `rightIcon` props added

#### New Size Variants
- Added `xs` and `xl` sizes
- Icon button now has `touchOptimized` compound variant

#### Migration Required
```tsx
// v1.x
<Button size="sm">Click me</Button>

// v2.0 - No changes needed, but new features available
<Button size="sm">Click me</Button>

// v2.0 - New features
<Button size="xs" touchOptimized>Mobile Button</Button>
<Button loading>Loading...</Button>
<Button fullWidth>Full Width</Button>
```

### Input Component

#### Breaking Changes
- `size` prop now conflicts with HTML input size attribute
- New `variant` prop added ('default', 'error', 'success')
- New `fullWidth` prop added

#### New Props
- `error` - Error message
- `success` - Success message
- `leftIcon` - Icon at start
- `rightIcon` - Icon at end
- `inputMode` - Mobile keyboard type

#### New Size Variants
- Added `xs`, `lg`, `xl` sizes

#### Migration Required
```tsx
// v1.x
<Input type="text" />

// v2.0 - If you used HTML size attribute
<Input type="text" size={20} /> // ❌ This will now set the visual size

// Fix: Remove size or use cols/style instead
<Input type="text" style={{ width: '20ch' }} />

// v2.0 - New features
<Input variant="error" error="Invalid email" />
<Input size="lg" leftIcon={<Icon />} />
<Input inputMode="email" /> // Better mobile keyboard
```

### Table Component

#### New Props
- `stickyHeader` - Enable sticky headers
- `mobileScroll` - Horizontal scroll on mobile (default: true)

#### New TableHead Props
- `sticky` - Make individual header sticky

#### Migration Required
```tsx
// v1.x
<Table>
  <TableHead>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHead>
  <TableBody>
    {/* rows */}
  </TableBody>
</Table>

// v2.0 - No changes needed, but new features available
<Table stickyHeader mobileScroll>
  <TableHead>
    <TableRow>
      <TableHead sticky>Name</TableHead>
    </TableRow>
  </TableHead>
  <TableBody>
    {/* rows */}
  </TableBody>
</Table>
```

## New Features

### 1. Theme Configuration

Set up theme configuration at the root of your app:

```tsx
// v1.x
import '@core-erp/ui/styles'

function App() {
  return <YourApp />
}

// v2.0
import { ThemeProvider } from '@core-erp/ui'
import '@core-erp/ui/styles'

function App() {
  return (
    <ThemeProvider 
      config={{
        radius: 'lg',
        spacing: 'compact',
        colors: {
          primary: '220 90% 50%'
        }
      }}
    >
      <YourApp />
    </ThemeProvider>
  )
}
```

### 2. Component Defaults

Set default props for components globally:

```tsx
import { setComponentDefaults } from '@core-erp/ui/lib'

// Before rendering your app
setComponentDefaults({
  Button: { 
    variant: 'outline', 
    touchOptimized: true // Better for mobile apps
  },
  Input: { 
    size: 'lg',
    fullWidth: true
  }
})
```

### 3. Container Queries

Use container queries for component-level responsiveness:

```tsx
import { cq } from '@core-erp/ui/lib'

<div className={cq('inline-size')}>
  <div className="@md:grid-cols-2 @lg:grid-cols-3 grid">
    {/* Responsive to container width, not viewport */}
  </div>
</div>
```

### 4. Enhanced Breakpoints

New hooks for responsive behavior:

```tsx
import { 
  useBreakpoint, 
  useBreakpointValue,
  useMediaQuery,
  useOrientation,
  usePrefersReducedMotion
} from '@core-erp/ui/hooks'

function MyComponent() {
  const breakpoint = useBreakpoint() // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  const isDesktop = useBreakpointValue('lg')
  const isPortrait = useOrientation() === 'portrait'
  const reduceMotion = usePrefersReducedMotion()
  
  return (
    <div>
      Current breakpoint: {breakpoint}
      {isDesktop ? <DesktopNav /> : <MobileNav />}
    </div>
  )
}
```

### 5. Responsive Variant Props

Components can now accept responsive values:

```tsx
// v2.0
<Button size={{ base: 'sm', md: 'default', lg: 'lg' }}>
  Responsive Button
</Button>

// Currently works with size props
// More components will support this in future updates
```

### 6. CSS Design Tokens

All design tokens are now available as CSS variables:

```css
/* Custom overrides in your global CSS */
:root {
  --spacing-md: 2rem;
  --font-size-base: 1.125rem;
  --duration-normal: 300ms;
  --z-modal: 100;
}
```

See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) for full list of tokens.

## New Exports

### Updated Import Paths

```tsx
// Theme configuration
import { ThemeProvider, useThemeConfig } from '@core-erp/ui'
import type { ThemeConfig } from '@core-erp/ui/lib/theme-config'

// Component defaults
import { setComponentDefaults } from '@core-erp/ui/lib'

// Breakpoints
import { breakpoints, getCurrentBreakpoint } from '@core-erp/ui/lib/breakpoints'

// New hooks
import { 
  useBreakpoint,
  useMediaQuery,
  useThemeConfig,
  useComponentDefaults
} from '@core-erp/ui/hooks'

// Container queries
import { cq, cqMin, cqMax } from '@core-erp/ui/lib'

// Design tokens (CSS only)
import '@core-erp/ui/styles/tokens'
```

## Tailwind Configuration

### Container Queries Support

Update your Tailwind config to enable container queries:

```js
// tailwind.config.js
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@core-erp/ui/dist/**/*.js'
  ]
  // Container queries are now automatically included
}
```

### New Breakpoints

The preset now includes:
- `xs: 475px` - Small phones
- `3xl: 1920px` - Large desktops

```tsx
// Usage
<div className="xs:text-sm 3xl:text-2xl">
  Responsive text
</div>
```

## TypeScript Improvements

### New Shared Types

```tsx
import type {
  Size,
  Variant,
  ResponsiveValue,
  InteractiveComponentProps,
  FormInputProps
} from '@core-erp/ui/types'

// Use responsive values in your components
type MyComponentProps = {
  size?: ResponsiveValue<Size>
  variant?: Variant
}
```

### Better Type Inference

Component prop types are now exported:

```tsx
import type { ButtonProps, InputProps, CardProps } from '@core-erp/ui'

// Use in your wrapper components
function MyButton(props: ButtonProps) {
  return <Button {...props} />
}
```

## Performance Improvements

### Animation Control

```tsx
// Disable animations for better performance
<ThemeProvider config={{ animations: 'none' }}>
  <App />
</ThemeProvider>

// Or use CSS
<div className="no-animations">
  {/* All animations disabled */}
</div>
```

### Tree-Shaking

Granular exports for better tree-shaking:

```tsx
// v1.x - Imports everything
import { Button, Input, Card } from '@core-erp/ui'

// v2.0 - Still supported
import { Button, Input, Card } from '@core-erp/ui'

// v2.0 - Granular (better for tree-shaking)
import { Button } from '@core-erp/ui/components/ui'
import { PageHeader } from '@core-erp/ui/components/responsive'
import { useBreakpoint } from '@core-erp/ui/hooks'
```

## Step-by-Step Migration

### 1. Update Dependencies

```bash
npm install @core-erp/ui@^2.0.0
# or
yarn add @core-erp/ui@^2.0.0
```

### 2. Install New Peer Dependencies

```bash
npm install @tailwindcss/container-queries
```

### 3. Update Tailwind Config

Your existing config should work, but you can now use container queries:

```js
// tailwind.config.js - no changes required
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  content: ['./src/**/*.{ts,tsx}']
}
```

### 4. Wrap App with ThemeProvider (Optional)

```tsx
import { ThemeProvider } from '@core-erp/ui'

function App() {
  return (
    <ThemeProvider config={{ /* optional config */ }}>
      <YourApp />
    </ThemeProvider>
  )
}
```

### 5. Fix Breaking Changes

Search your codebase for:
- `<Input size={number}>` - Replace with style or remove
- Manual size calculations - Can now use responsive size props

### 6. Test Your Application

```bash
npm run build
npm run type-check
```

## Common Issues

### Issue: Input size prop conflict

**Problem:** HTML input `size` attribute conflicts with new visual `size` prop.

**Solution:** 
```tsx
// Before
<Input type="text" size={20} />

// After - use style or className
<Input type="text" style={{ width: '20ch' }} />
<Input type="text" className="w-[20ch]" />
```

### Issue: Container queries not working

**Problem:** Container query classes not applying.

**Solution:** Ensure you've installed the plugin:
```bash
npm install @tailwindcss/container-queries
```

The plugin is automatically included in the preset.

### Issue: Type errors with responsive props

**Problem:** TypeScript errors when using responsive values.

**Solution:** Import the ResponsiveValue type:
```tsx
import type { ResponsiveValue, Size } from '@core-erp/ui/types'

interface Props {
  size?: ResponsiveValue<Size>
}
```

## Support

- **Documentation**: [docs/](./README.md)
- **API Reference**: [API_REFERENCE.md](./API_REFERENCE.md)
- **Customization Guide**: [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md)
- **GitHub Issues**: [Report issues](https://github.com/your-org/core-ui/issues)

## What's Next?

- **v2.1**: Storybook documentation
- **v2.2**: Build-time configuration
- **v2.3**: More responsive variant props
- **v2.4**: Complete component standardization

Stay tuned for updates!

