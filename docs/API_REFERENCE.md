# @core-erp/ui - API Reference

Complete API documentation for all utilities, hooks, and key components.

## Table of Contents

1. [Utilities](#utilities)
2. [Formatters](#formatters)
3. [Hooks](#hooks)
4. [Key Component APIs](#key-component-apis)
5. [Type Definitions](#type-definitions)

---

## Utilities

### cn()

Merge and deduplicate Tailwind CSS class names with conflict resolution.

**Import**: `import { cn } from '@core-erp/ui/lib'`

**Signature**:
```typescript
function cn(...inputs: ClassValue[]): string
```

**Parameters**:
- `...inputs: ClassValue[]` - Variable number of class names (strings, objects, arrays)

**Returns**: `string` - Merged class names with conflicts resolved

**Examples**:
```typescript
// Basic usage
cn('px-4', 'py-2', 'bg-blue-500')
// → "px-4 py-2 bg-blue-500"

// Conditional classes
cn('base-class', isActive && 'active-class')
// → "base-class active-class" (if isActive is true)
// → "base-class" (if isActive is false)

// Object syntax
cn({ 'text-red-500': hasError, 'text-green-500': isSuccess })
// → "text-red-500" (if hasError is true)

// Conflict resolution (later takes precedence)
cn('px-2', 'px-4')
// → "px-4"

// With className prop
cn('base-styles', className)
// Allows components to be styled from parent
```

**Use Cases**:
- Component class name merging
- Conditional styling
- Resolving Tailwind conflicts
- Accepting className prop in components

---

## Formatters

### formatDate()

Format dates with locale support.

**Import**: `import { formatDate } from '@core-erp/ui/lib'`

**Signature**:
```typescript
function formatDate(
  date: Date | string,
  locale?: SupportedLocale,
  formatStr?: string
): string
```

**Parameters**:
- `date: Date | string` - Date object or ISO date string
- `locale?: SupportedLocale` - Locale code (`'en'` or `'th'`, default: `'en'`)
- `formatStr?: string` - date-fns format string (default: `'PP'`)

**Returns**: `string` - Formatted date

**Format Tokens** (date-fns):
- `'PP'` - Long format (e.g., "Dec 25, 2023")
- `'P'` - Short format (e.g., "12/25/2023")
- `'PPP'` - Long format with weekday (e.g., "Monday, Dec 25, 2023")
- `'yyyy-MM-dd'` - ISO format (e.g., "2023-12-25")
- Custom patterns supported

**Examples**:
```typescript
const date = new Date('2023-12-25')

formatDate(date)
// → "Dec 25, 2023"

formatDate(date, 'th')
// → "25 ธ.ค. 2023"

formatDate(date, 'en', 'yyyy-MM-dd')
// → "2023-12-25"

formatDate(date, 'en', 'EEEE, MMMM d, yyyy')
// → "Monday, December 25, 2023"

formatDate('2023-12-25T10:30:00Z')
// → "Dec 25, 2023" (accepts ISO strings)
```

---

### formatDateTime()

Format date and time together.

**Import**: `import { formatDateTime } from '@core-erp/ui/lib'`

**Signature**:
```typescript
function formatDateTime(
  date: Date | string,
  locale?: SupportedLocale
): string
```

**Parameters**:
- `date: Date | string` - Date object or ISO date string
- `locale?: SupportedLocale` - Locale code (default: `'en'`)

**Returns**: `string` - Formatted date and time

**Examples**:
```typescript
const date = new Date('2023-12-25T14:30:00')

formatDateTime(date)
// → "Dec 25, 2023, 2:30 PM"

formatDateTime(date, 'th')
// → "25 ธ.ค. 2023 14:30 น."
```

---

### formatRelativeTime()

Format relative time (e.g., "2 hours ago").

**Import**: `import { formatRelativeTime } from '@core-erp/ui/lib'`

**Signature**:
```typescript
function formatRelativeTime(
  date: Date | string,
  locale?: SupportedLocale
): string
```

**Parameters**:
- `date: Date | string` - Date object or ISO date string
- `locale?: SupportedLocale` - Locale code (default: `'en'`)

**Returns**: `string` - Relative time description

**Examples**:
```typescript
// Assuming current time is 2023-12-25 15:00:00

formatRelativeTime(new Date('2023-12-25T14:30:00'))
// → "30 minutes ago"

formatRelativeTime(new Date('2023-12-24T15:00:00'))
// → "yesterday"

formatRelativeTime(new Date('2023-12-20T15:00:00'))
// → "5 days ago"

formatRelativeTime(new Date('2022-12-25T15:00:00'))
// → "last year"
```

---

### formatNumber()

Format numbers with locale-specific separators.

**Import**: `import { formatNumber } from '@core-erp/ui/lib'`

**Signature**:
```typescript
function formatNumber(
  value: number,
  locale?: SupportedLocale,
  options?: Intl.NumberFormatOptions
): string
```

**Parameters**:
- `value: number` - Number to format
- `locale?: SupportedLocale` - Locale code (default: `'en'`)
- `options?: Intl.NumberFormatOptions` - Intl.NumberFormat options

**Returns**: `string` - Formatted number

**Examples**:
```typescript
formatNumber(1234567.89)
// → "1,234,567.89"

formatNumber(1234567.89, 'th')
// → "1,234,567.89"

formatNumber(0.1234, 'en', { minimumFractionDigits: 4 })
// → "0.1234"

formatNumber(1000, 'en', { notation: 'compact' })
// → "1K"
```

---

### formatCurrency()

Format currency amounts.

**Import**: `import { formatCurrency } from '@core-erp/ui/lib'`

**Signature**:
```typescript
function formatCurrency(
  amount: number,
  locale?: SupportedLocale,
  currency?: string
): string
```

**Parameters**:
- `amount: number` - Amount to format
- `locale?: SupportedLocale` - Locale code (default: `'en'`)
- `currency?: string` - Currency code (default: locale's currency)

**Default Currencies**:
- `'en'` → `'USD'`
- `'th'` → `'THB'`

**Returns**: `string` - Formatted currency

**Examples**:
```typescript
formatCurrency(1299.99)
// → "$1,299.99"

formatCurrency(1299.99, 'th')
// → "฿1,299.99"

formatCurrency(1299.99, 'en', 'EUR')
// → "€1,299.99"

formatCurrency(50000, 'th', 'THB')
// → "฿50,000.00"
```

---

### formatPercentage()

Format percentages.

**Import**: `import { formatPercentage } from '@core-erp/ui/lib'`

**Signature**:
```typescript
function formatPercentage(
  value: number,
  locale?: SupportedLocale,
  decimals?: number
): string
```

**Parameters**:
- `value: number` - Value to format (0.5 = 50%)
- `locale?: SupportedLocale` - Locale code (default: `'en'`)
- `decimals?: number` - Decimal places (default: `2`)

**Returns**: `string` - Formatted percentage

**Examples**:
```typescript
formatPercentage(0.5)
// → "50.00%"

formatPercentage(0.1234)
// → "12.34%"

formatPercentage(0.1234, 'en', 4)
// → "12.3400%"

formatPercentage(1.5)
// → "150.00%"
```

---

## Hooks

### useToast()

Toast notification hook (powered by sonner).

**Import**: `import { useToast } from '@core-erp/ui/hooks'`

**Returns**: `{ toast: ToastFunction }`

**ToastFunction Methods**:

#### toast(message, options?)
```typescript
toast("Message here", { duration: 5000 })
```

#### toast.success(message, options?)
```typescript
toast.success("Operation successful!")
```

#### toast.error(message, options?)
```typescript
toast.error("Something went wrong")
```

#### toast.info(message, options?)
```typescript
toast.info("Here's some information")
```

#### toast.warning(message, options?)
```typescript
toast.warning("Please be careful")
```

#### toast.promise(promise, options)
```typescript
toast.promise(
  fetchData(),
  {
    loading: 'Loading...',
    success: 'Data loaded!',
    error: 'Failed to load'
  }
)
```

**Options**:
```typescript
interface ToastOptions {
  duration?: number        // Duration in ms (default: 4000)
  position?: 'top-left' | 'top-center' | 'top-right' | 
             'bottom-left' | 'bottom-center' | 'bottom-right'
  description?: string     // Additional description
  action?: {              // Action button
    label: string
    onClick: () => void
  }
}
```

**Complete Example**:
```typescript
import { useToast } from '@core-erp/ui/hooks'

function MyComponent() {
  const { toast } = useToast()
  
  const handleSave = async () => {
    try {
      await saveData()
      toast.success("Saved successfully!", {
        description: "Your changes have been saved",
        duration: 5000
      })
    } catch (error) {
      toast.error("Failed to save", {
        description: error.message,
        action: {
          label: "Retry",
          onClick: handleSave
        }
      })
    }
  }
  
  return <Button onClick={handleSave}>Save</Button>
}
```

**Requirements**:
- `<Toaster />` must be mounted in your app root

---

### useIsMobile()

Responsive breakpoint detection hook.

**Import**: `import { useIsMobile } from '@core-erp/ui/hooks'`

**Signature**:
```typescript
function useIsMobile(breakpoint?: number): boolean
```

**Parameters**:
- `breakpoint?: number` - Breakpoint in pixels (default: `768`)

**Returns**: `boolean` - `true` if viewport width < breakpoint

**Example**:
```typescript
import { useIsMobile } from '@core-erp/ui/hooks'

function ResponsiveComponent() {
  const isMobile = useIsMobile()
  
  return (
    <div>
      {isMobile ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  )
}

// Custom breakpoint
function CustomComponent() {
  const isSmall = useIsMobile(640)  // sm breakpoint
  const isMedium = useIsMobile(1024) // lg breakpoint
  
  if (isSmall) return <SmallView />
  if (isMedium) return <MediumView />
  return <LargeView />
}
```

**Common Breakpoints**:
- `640` - Small tablets (sm)
- `768` - Tablets (md) - **default**
- `1024` - Small desktops (lg)
- `1280` - Desktops (xl)

---

## Key Component APIs

### Button

**Import**: `import { Button } from '@core-erp/ui/components/ui'`

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

**Prop Details**:

- **variant**: Visual style
  - `'default'` - Primary button (blue background)
  - `'destructive'` - Danger button (red background)
  - `'outline'` - Outlined button
  - `'secondary'` - Secondary style (gray background)
  - `'ghost'` - Transparent, hover effect only
  - `'link'` - Looks like a link

- **size**: Button size
  - `'default'` - Standard size (h-10)
  - `'sm'` - Small (h-9)
  - `'lg'` - Large (h-11)
  - `'icon'` - Square for icon-only (h-10 w-10)

- **asChild**: Render as child element
  - When `true`, button renders its child (for composition)

**Examples**:
```typescript
// Basic usage
<Button>Click Me</Button>

// With variant and size
<Button variant="destructive" size="lg">Delete</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Search className="h-4 w-4" />
</Button>

// As link (composition with asChild)
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>

// With handler
<Button onClick={() => console.log('Clicked')}>
  Submit
</Button>

// Disabled
<Button disabled>Can't Click</Button>
```

---

### Card

**Import**: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@core-erp/ui/components/ui'`

**Component Structure**:
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Footer actions */}
  </CardFooter>
</Card>
```

**Props** (all components):
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  // All standard div attributes
}
```

**Example**:
```typescript
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Update your profile information</CardDescription>
  </CardHeader>
  <CardContent>
    <Form>
      <Input label="Name" />
      <Input label="Email" />
    </Form>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

---

### Dialog

**Import**: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@core-erp/ui/components/ui'`

**Component Structure**:
```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text
      </DialogDescription>
    </DialogHeader>
    
    {/* Dialog body */}
    <div>Content here</div>
    
    <DialogFooter>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Dialog Props**:
```typescript
interface DialogProps {
  open?: boolean                    // Controlled open state
  onOpenChange?: (open: boolean) => void  // Open state change handler
  children: React.ReactNode
}
```

**DialogContent Props**:
```typescript
interface DialogContentProps {
  className?: string
  children: React.ReactNode
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
}
```

**Controlled Example**:
```typescript
function ControlledDialog() {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSubmit = () => {
    // Save logic
    setIsOpen(false)  // Close dialog
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

---

### Form

**Import**: `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@core-erp/ui/components/ui'`

**Used with react-hook-form + zod**

**Complete Example**:
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
  FormDescription,
  Input,
  Button,
} from '@core-erp/ui/components/ui'

const schema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      age: 0,
    },
  })
  
  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

**FormField Props**:
```typescript
interface FormFieldProps {
  control: Control                  // From useForm()
  name: string                      // Field name
  render: (props: {
    field: ControllerRenderProps    // Field props (value, onChange, etc.)
    fieldState: ControllerFieldState // Field state (error, etc.)
  }) => React.ReactElement
}
```

---

### PageHeader

**Import**: `import { PageHeader } from '@core-erp/ui/components/responsive'`

**Props**:
```typescript
interface PageHeaderProps {
  title: string             // Page title (required)
  subtitle?: string         // Optional subtitle
  actions?: React.ReactNode // Action buttons
  sticky?: boolean          // Sticky header (default: true)
  className?: string
}
```

**Example**:
```typescript
<PageHeader
  title="User Management"
  subtitle="Manage system users and permissions"
  actions={
    <>
      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </>
  }
/>
```

---

### ResponsiveGrid

**Import**: `import { ResponsiveGrid } from '@core-erp/ui/components/responsive'`

**Props**:
```typescript
interface ResponsiveGridProps {
  columns?: {
    base?: number    // Default columns (mobile)
    sm?: number      // Small tablets (640px+)
    md?: number      // Tablets (768px+)
    lg?: number      // Small desktops (1024px+)
    xl?: number      // Desktops (1280px+)
  }
  gap?: number       // Gap between items (default: 4)
  className?: string
  children: React.ReactNode
}
```

**Example**:
```typescript
<ResponsiveGrid 
  columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
  gap={6}
>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</ResponsiveGrid>
```

---

## Type Definitions

### SupportedLocale

```typescript
type SupportedLocale = 'en' | 'th'
```

Supported locale codes for formatters.

---

### ClassValue

```typescript
type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined
type ClassDictionary = Record<string, any>
type ClassArray = ClassValue[]
```

Accepted values for `cn()` function.

---

### ButtonProps

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

---

### ToastOptions

```typescript
interface ToastOptions {
  duration?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 
             'bottom-left' | 'bottom-center' | 'bottom-right'
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}
```

---

## Usage Patterns

### Combining Utilities

```typescript
import { cn, formatDate, formatCurrency } from '@core-erp/ui/lib'
import { useToast, useIsMobile } from '@core-erp/ui/hooks'

function ProductCard({ product, className }) {
  const { toast } = useToast()
  const isMobile = useIsMobile()
  
  const handleAddToCart = () => {
    toast.success('Added to cart!')
  }
  
  return (
    <Card className={cn('hover:shadow-lg transition', className)}>
      <CardHeader>
        <CardTitle className={cn(isMobile ? 'text-lg' : 'text-xl')}>
          {product.name}
        </CardTitle>
        <CardDescription>
          Added {formatDate(product.createdAt, 'en', 'PP')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {formatCurrency(product.price)}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
```

---

## Related Documentation

- [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Complete component list
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design tokens and guidelines
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development workflow

---

**End of API Reference**

