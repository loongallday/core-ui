# @core-erp/ui - Plugin Integration Guide

Complete guide for integrating @core-erp/ui into Core ERP plugins.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Using Components](#using-components)
6. [Styling & Theming](#styling--theming)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### Why Use @core-erp/ui in Plugins?

**Benefits**:
1. **Visual Consistency**: Plugins look native to Core ERP
2. **Rapid Development**: Full UI toolkit out of the box
3. **Reduced Bundle Size**: Shared components via peer dependency
4. **Automatic Updates**: UI improvements propagate to all plugins
5. **Type Safety**: Full TypeScript support

### Plugin Architecture

```
Core ERP Application
├── @core-erp/ui (bundled)
├── Plugin A
│   └── Uses @core-erp/ui (peer dependency)
├── Plugin B
│   └── Uses @core-erp/ui (peer dependency)
└── Plugin C
    └── Uses @core-erp/ui (peer dependency)
```

Plugins don't bundle @core-erp/ui - they import from the host application.

---

## Quick Start

### Generated Plugins (Recommended)

Use the plugin template generator - @core-erp/ui is already configured:

```bash
cd core-erp
npm run generate-plugin
```

Follow prompts. The generated plugin includes:
- ✅ @core-erp/ui as peer dependency
- ✅ Tailwind configured with UI preset
- ✅ TypeScript properly configured
- ✅ Example components using @core-erp/ui

**Skip to [Using Components](#using-components)**

### Manual Integration

For existing plugins, follow [Installation](#installation) and [Configuration](#configuration).

---

## Installation

### 1. Add Peer Dependencies

In your plugin's `package.json`:

```json
{
  "name": "your-plugin",
  "version": "1.0.0",
  "peerDependencies": {
    "@core-erp/ui": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**Why Peer Dependencies?**
- Plugin doesn't bundle React or @core-erp/ui
- Uses versions from host application
- Prevents duplicate instances
- Reduces plugin bundle size

### 2. Install Development Dependencies

For local development:

```bash
npm install --save-dev @core-erp/ui react react-dom
```

These are for TypeScript/IDE support during development.

---

## Configuration

### TypeScript Configuration

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Tailwind CSS Configuration

**tailwind.config.ts**:
```typescript
import type { Config } from 'tailwindcss'
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  // Use @core-erp/ui preset
  presets: [uiPreset],
  
  // Include your plugin files AND @core-erp/ui dist
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@core-erp/ui/dist/**/*.js'
  ],
  
  // Optional: Extend or override theme
  theme: {
    extend: {
      // Your custom theme extensions
    }
  },
} satisfies Config
```

**Important**: Include `./node_modules/@core-erp/ui/dist/**/*.js` in content paths so Tailwind can detect classes used by @core-erp/ui components.

### PostCSS Configuration

**postcss.config.js**:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Vite Configuration

**vite.config.ts** (if using Vite):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    // Mark peer dependencies as external
    rollupOptions: {
      external: ['react', 'react-dom', '@core-erp/ui'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@core-erp/ui': 'CoreUI'
        }
      }
    }
  }
})
```

### CSS Import

**src/index.css** or **src/main.css**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 
  Optional: Import @core-erp/ui global styles
  Only if you need the CSS variables and base styles
*/
@import '@core-erp/ui/styles';
```

**Note**: In most cases, you don't need to import @core-erp/ui styles as they're already loaded by the host application.

---

## Using Components

### Importing Components

**UI Components**:
```typescript
import { Button, Card, Dialog, Table } from '@core-erp/ui/components/ui'
import { Input, Select, Form } from '@core-erp/ui/components/ui'
```

**Responsive Components**:
```typescript
import { 
  PageContainer, 
  PageHeader,
  ResponsiveGrid 
} from '@core-erp/ui/components/responsive'
```

**Loading Components**:
```typescript
import { SkeletonCard, SkeletonTable } from '@core-erp/ui/components/loading'
```

**Utilities**:
```typescript
import { cn, formatDate, formatCurrency } from '@core-erp/ui/lib'
```

**Hooks**:
```typescript
import { useToast, useIsMobile } from '@core-erp/ui/hooks'
```

### Example Plugin Component

```typescript
// src/components/InventoryList.tsx
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@core-erp/ui/components/ui'
import { PageHeader, PageContainer } from '@core-erp/ui/components/responsive'
import { SkeletonTable } from '@core-erp/ui/components/loading'
import { useToast } from '@core-erp/ui/hooks'
import { formatCurrency, cn } from '@core-erp/ui/lib'
import { Plus } from 'lucide-react'

export function InventoryList() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const items = [
    { id: 1, name: 'Item A', quantity: 100, price: 29.99 },
    { id: 2, name: 'Item B', quantity: 50, price: 49.99 },
  ]
  
  const handleAdd = () => {
    toast.success('Item added successfully!')
  }
  
  return (
    <PageContainer>
      <PageHeader
        title="Inventory Management"
        subtitle="Manage your inventory items"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              {/* Form here */}
            </DialogContent>
          </Dialog>
        }
      />
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonTable rows={5} columns={4} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  )
}
```

---

## Styling & Theming

### Using Theme Colors

Components automatically use theme colors from @core-erp/ui:

```tsx
// Background colors
<div className="bg-background">
<div className="bg-card">
<div className="bg-primary">

// Text colors
<p className="text-foreground">
<p className="text-muted-foreground">
<p className="text-destructive">

// Borders
<div className="border border-border">
```

### Custom Styling

**Extending Components**:
```tsx
import { Button } from '@core-erp/ui/components/ui'
import { cn } from '@core-erp/ui/lib'

<Button className={cn('custom-class', 'hover:opacity-90')}>
  Custom Button
</Button>
```

**Custom Component with UI Components**:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@core-erp/ui/components/ui'

export function StatsCard({ title, value, icon }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
```

### Responsive Design

Use Tailwind responsive prefixes:

```tsx
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2 lg:w-1/3">
    {/* Responsive width */}
  </div>
</div>

<h1 className="text-xl md:text-2xl lg:text-3xl">
  {/* Responsive typography */}
</h1>
```

Or use responsive components:

```tsx
import { ResponsiveGrid } from '@core-erp/ui/components/responsive'

<ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</ResponsiveGrid>
```

---

## Best Practices

### Component Selection

**✅ Do**:
- Use @core-erp/ui components whenever possible
- Import from specific paths for better tree-shaking
- Compose complex UIs from simple components
- Use responsive components for layouts

**❌ Don't**:
- Don't recreate components that exist in @core-erp/ui
- Don't import entire library (`import * from '@core-erp/ui'`)
- Don't bundle @core-erp/ui with your plugin

### Performance

**Optimize Imports**:
```typescript
// Good - specific imports
import { Button, Card } from '@core-erp/ui/components/ui'
import { useToast } from '@core-erp/ui/hooks'

// Bad - wildcard imports
import * as UI from '@core-erp/ui'
```

**Lazy Loading**:
```typescript
import { lazy, Suspense } from 'react'
import { SkeletonCard } from '@core-erp/ui/components/loading'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export function PluginPage() {
  return (
    <Suspense fallback={<SkeletonCard />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### Type Safety

**Always Type Props**:
```typescript
import { ButtonProps } from '@core-erp/ui/components/ui'

interface CustomButtonProps extends ButtonProps {
  customProp: string
}

export function CustomButton({ customProp, ...props }: CustomButtonProps) {
  return <Button {...props}>{customProp}</Button>
}
```

### Accessibility

**Use Semantic HTML**:
```tsx
<Button asChild>
  <a href="/link">Link as Button</a>
</Button>
```

**Add ARIA Labels**:
```tsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

**Keyboard Navigation**:
All @core-erp/ui components support keyboard navigation out of the box.

---

## Common Patterns

### Form with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from '@core-erp/ui/components/ui'
import { useToast } from '@core-erp/ui/hooks'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
})

export function ItemForm() {
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', quantity: 0 },
  })
  
  const onSubmit = (data) => {
    toast.success('Item saved!')
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Save Item</Button>
      </form>
    </Form>
  )
}
```

### Data Table with Actions

```typescript
import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@core-erp/ui/components/ui'
import { MoreVertical, Edit, Trash } from 'lucide-react'
import { useToast } from '@core-erp/ui/hooks'

export function DataTable({ data }) {
  const { toast } = useToast()
  
  const handleEdit = (id) => {
    toast.info(`Editing item ${id}`)
  }
  
  const handleDelete = (id) => {
    toast.success(`Deleted item ${id}`)
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(item.id)}
                    className="text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### Confirmation Dialog

```typescript
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@core-erp/ui/components/ui'

export function DeleteButton({ onConfirm }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## Troubleshooting

### Issue: Components not rendering

**Symptoms**: Import errors or blank components

**Solutions**:
1. Verify @core-erp/ui is in peerDependencies
2. Check host application has @core-erp/ui installed
3. Ensure correct import paths

```typescript
// Correct
import { Button } from '@core-erp/ui/components/ui'

// Incorrect
import { Button } from '@core-erp/ui/components/ui/button'
```

---

### Issue: Styles not applying

**Symptoms**: Components render but look unstyled

**Solutions**:
1. Include @core-erp/ui in Tailwind content paths:
```typescript
content: [
  './src/**/*.{ts,tsx}',
  './node_modules/@core-erp/ui/dist/**/*.js'  // Add this
]
```

2. Ensure Tailwind preset is imported:
```typescript
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],  // Add this
  // ...
}
```

3. Import Tailwind directives in CSS:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Issue: TypeScript errors

**Symptoms**: Type errors when importing

**Solutions**:
1. Install @core-erp/ui in devDependencies for types
2. Check tsconfig.json includes proper module resolution:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "skipLibCheck": true
  }
}
```

---

### Issue: Toast not working

**Symptoms**: `toast()` doesn't show notifications

**Solution**: Ensure `<Toaster />` is in your plugin's root:

```tsx
import { Toaster } from '@core-erp/ui/components/ui'

export function PluginRoot() {
  return (
    <>
      <YourPlugin />
      <Toaster />
    </>
  )
}
```

**Note**: If host application already has `<Toaster />`, you don't need it in plugin.

---

### Issue: Bundle size too large

**Symptoms**: Large plugin bundle

**Solutions**:
1. Verify externals in build config:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', '@core-erp/ui']
    }
  }
})
```

2. Use specific imports:
```typescript
// Good
import { Button } from '@core-erp/ui/components/ui'

// Bad
import * as UI from '@core-erp/ui'
```

---

## Next Steps

- Review [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) for all available components
- Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for styling guidelines
- See [API_REFERENCE.md](./API_REFERENCE.md) for detailed API documentation

---

**Happy Plugin Development!** 🔌

