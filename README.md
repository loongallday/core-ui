# @core-erp/ui

Shared UI components and design system for Core ERP applications and plugins.

## Overview

`@core-erp/ui` is a comprehensive UI package that provides:
- **48 shadcn/ui components** - Battle-tested, accessible React components
- **Custom responsive components** - Page layouts optimized for all screen sizes
- **Loading states** - Skeleton components for better UX
- **Tailwind preset** - Consistent design tokens across all apps
- **Utilities & hooks** - Common formatters, helpers, and React hooks
- **TypeScript support** - Full type safety out of the box

## Installation

```bash
npm install @core-erp/ui
# or
yarn add @core-erp/ui
# or
pnpm add @core-erp/ui
```

For local development with the Core ERP monorepo:
```bash
npm install file:../core-ui
```

## Setup

### 1. Configure Tailwind CSS

Update your `tailwind.config.ts` to use the Core ERP UI preset:

```typescript
import type { Config } from 'tailwindcss'
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@core-erp/ui/dist/**/*.js'
  ],
  // Add custom overrides if needed
  theme: {
    extend: {
      // Your customizations
    }
  },
} satisfies Config
```

### 2. Import Global Styles

In your main CSS file (e.g., `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... other CSS variables */
  }
}
```

### 3. Add Toaster (Optional)

For toast notifications, add the `Toaster` component to your app root:

```tsx
import { Toaster } from '@core-erp/ui/components/ui'

function App() {
  return (
    <>
      <YourApp />
      <Toaster />
    </>
  )
}
```

## Usage

### UI Components

Import any of the 48 shadcn/ui components:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@core-erp/ui/components/ui'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

**Available UI Components:**
- Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge
- Breadcrumb, Button, Calendar, Card, Carousel, Chart
- Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer
- DropdownMenu, Form, HoverCard, Input, InputOTP, Label
- Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup
- Resizable, ScrollArea, Select, Separator, Sheet, Sidebar
- Skeleton, Slider, Sonner (Toaster), Switch, Table, Tabs
- Textarea, Toast, Toggle, ToggleGroup, Tooltip

### Responsive Components

Custom responsive components for consistent page layouts:

```tsx
import { 
  PageContainer, 
  PageHeader,
  ResponsiveGrid,
  ResponsiveStack,
  ResponsiveButton,
  ResponsiveTable 
} from '@core-erp/ui/components/responsive'

function MyPage() {
  return (
    <PageContainer maxWidth="xl">
      <PageHeader 
        title="Dashboard"
        subtitle="Welcome back!"
        action={<Button>Add New</Button>}
      />
      
      <ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {/* Grid items */}
      </ResponsiveGrid>
    </PageContainer>
  )
}
```

### Loading Components

Skeleton loaders for better perceived performance:

```tsx
import { SkeletonCard, SkeletonTable } from '@core-erp/ui/components/loading'

function LoadingState() {
  return (
    <div>
      <SkeletonCard />
      <SkeletonTable />
    </div>
  )
}
```

### Utilities

Common utility functions:

```tsx
import { cn, formatDate, formatCurrency, formatNumber } from '@core-erp/ui/lib'

// Merge classnames
const className = cn('base-class', condition && 'conditional-class')

// Format date
const date = formatDate(new Date(), 'en', 'PP') // Dec 25, 2023

// Format currency
const price = formatCurrency(1299.99, 'en') // $1,299.99

// Format number
const quantity = formatNumber(10000, 'en') // 10,000
```

### Hooks

Custom React hooks:

```tsx
import { useToast, useIsMobile } from '@core-erp/ui/hooks'

function MyComponent() {
  const { toast } = useToast()
  const isMobile = useIsMobile()
  
  const handleClick = () => {
    toast.success('Action completed!')
  }
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}
```

## Package Exports

The package provides granular exports for better tree-shaking:

```typescript
// Main export
import { Button } from '@core-erp/ui'

// Components
import { Button, Card } from '@core-erp/ui/components/ui'
import { PageHeader } from '@core-erp/ui/components/responsive'
import { SkeletonCard } from '@core-erp/ui/components/loading'

// Utilities
import { cn, formatDate } from '@core-erp/ui/lib'

// Hooks
import { useToast, useIsMobile } from '@core-erp/ui/hooks'

// Tailwind preset
import uiPreset from '@core-erp/ui/tailwind-preset'
```

## Customization

### Overriding Theme

You can override any theme values in your Tailwind config:

```typescript
export default {
  presets: [uiPreset],
  theme: {
    extend: {
      colors: {
        // Override primary color
        primary: {
          DEFAULT: 'hsl(262.1 83.3% 57.8%)',
          foreground: 'hsl(210 20% 98%)',
        },
      },
    },
  },
}
```

### Custom CSS Variables

Override CSS variables in your global styles:

```css
:root {
  --primary: 262.1 83.3% 57.8%;
  --radius: 0.75rem;
}
```

## Best Practices

1. **Import from package level**: Use `@core-erp/ui/components/ui` instead of deep imports
2. **Use responsive components**: Leverage `PageContainer`, `PageHeader` for consistent layouts
3. **Utilize formatters**: Use built-in formatters for consistent data display
4. **Type safety**: Take advantage of full TypeScript support
5. **Toast notifications**: Use `sonner` for all toast notifications (already included)

## Plugin Development

When creating plugins for Core ERP:

```json
{
  "peerDependencies": {
    "@core-erp/ui": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

Use the same imports as shown above. The UI package ensures consistent design across all plugins.

## Development

Building the package:

```bash
cd core-ui
npm install
npm run build
```

Watch mode:

```bash
npm run dev
```

## Migration from Local Components

If you're migrating from local components to `@core-erp/ui`:

### Before:
```tsx
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/responsive'
import { cn } from '@/lib/utils'
```

### After:
```tsx
import { Button } from '@core-erp/ui/components/ui'
import { PageHeader } from '@core-erp/ui/components/responsive'
import { cn } from '@core-erp/ui/lib'
```

## Support

For issues, questions, or contributions, please refer to the Core ERP project documentation.

## License

MIT

