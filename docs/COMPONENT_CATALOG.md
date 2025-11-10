# @core-erp/ui - Component Catalog

Complete reference of all 56 components available in @core-erp/ui.

## Table of Contents

1. [UI Components (48)](#ui-components)
   - [Form Controls](#form-controls)
   - [Data Display](#data-display)
   - [Feedback & Overlays](#feedback--overlays)
   - [Navigation](#navigation)
   - [Layout](#layout)
2. [Responsive Components (6)](#responsive-components)
3. [Loading Components (2)](#loading-components)

---

## UI Components

### Form Controls

#### Button
Versatile button component with multiple variants and sizes.

**Import**: `import { Button } from '@core-erp/ui/components/ui'`

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`  
**Sizes**: `default`, `sm`, `lg`, `icon`

**Example**:
```tsx
<Button variant="default" size="lg">Click Me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="icon"><Plus /></Button>
```

**Props**:
- `variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'`
- `size?: 'default' | 'sm' | 'lg' | 'icon'`
- `asChild?: boolean` - Compose with other elements

---

#### Input
Standard text input with label and error support.

**Import**: `import { Input } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Input type="email" placeholder="Enter email" />
<Input type="password" placeholder="Password" disabled />
```

**Props**:
- All standard `<input>` HTML attributes
- Fully controlled or uncontrolled

---

#### Textarea
Multi-line text input.

**Import**: `import { Textarea } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Textarea placeholder="Enter your message" rows={5} />
```

---

#### Checkbox
Accessible checkbox with label support.

**Import**: `import { Checkbox } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>
```

**Props**:
- `checked?: boolean`
- `onCheckedChange?: (checked: boolean) => void`

---

#### RadioGroup
Group of radio buttons.

**Import**: `import { RadioGroup, RadioGroupItem } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>
```

---

#### Select
Dropdown select menu with search support.

**Import**: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

#### Switch
Toggle switch for boolean values.

**Import**: `import { Switch } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

---

#### Slider
Range slider for numeric values.

**Import**: `import { Slider } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Slider defaultValue={[50]} max={100} step={1} />
<Slider defaultValue={[20, 80]} max={100} step={5} />
```

---

#### Calendar
Date picker calendar component.

**Import**: `import { Calendar } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

---

#### Form
Form component with validation support (react-hook-form + zod).

**Import**: `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

---

#### Label
Accessible form label.

**Import**: `import { Label } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

---

#### InputOTP
One-time password input with multiple slots.

**Import**: `import { InputOTP, InputOTPGroup, InputOTPSlot } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

---

### Data Display

#### Card
Container for content with header, content, and footer sections.

**Import**: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

#### Table
Responsive data table with sorting capabilities.

**Import**: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Table>
  <TableCaption>A list of users</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

#### Badge
Small status or category indicator.

**Import**: `import { Badge } from '@core-erp/ui/components/ui'`

**Variants**: `default`, `secondary`, `destructive`, `outline`

**Example**:
```tsx
<Badge>Default</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Pending</Badge>
```

---

#### Avatar
User avatar with fallback support.

**Import**: `import { Avatar, AvatarImage, AvatarFallback } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

---

#### Tooltip
Hover tooltip for additional information.

**Import**: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Helpful information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

#### HoverCard
Rich hover card with detailed information.

**Import**: `import { HoverCard, HoverCardTrigger, HoverCardContent } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-2">
      <h4 className="font-semibold">Title</h4>
      <p className="text-sm">Detailed information here</p>
    </div>
  </HoverCardContent>
</HoverCard>
```

---

#### Popover
Floating content container.

**Import**: `import { Popover, PopoverTrigger, PopoverContent } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content here</p>
  </PopoverContent>
</Popover>
```

---

#### Accordion
Collapsible content sections.

**Import**: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

#### Collapsible
Simple collapsible container.

**Import**: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    <p>Hidden content</p>
  </CollapsibleContent>
</Collapsible>
```

---

#### Chart
Recharts-based charting components.

**Import**: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@core-erp/ui/components/ui'`

**Example**: See Recharts documentation for detailed examples.

---

#### Carousel
Image/content carousel.

**Import**: `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

---

#### AspectRatio
Maintain aspect ratio for content.

**Import**: `import { AspectRatio } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Image" className="rounded-md object-cover" />
</AspectRatio>
```

---

### Feedback & Overlays

#### Alert
Informational alert messages.

**Import**: `import { Alert, AlertTitle, AlertDescription } from '@core-erp/ui/components/ui'`

**Variants**: `default`, `destructive`

**Example**:
```tsx
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>
```

---

#### AlertDialog
Modal dialog for confirmations.

**Import**: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

#### Dialog
Modal dialog for forms and content.

**Import**: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

#### Toast
Temporary notification messages (using sonner).

**Import**: `import { toast } from '@core-erp/ui/hooks'`

**Example**:
```tsx
import { useToast } from '@core-erp/ui/hooks'

function Component() {
  const { toast } = useToast()
  
  return (
    <Button onClick={() => toast.success('Success!')}>
      Show Toast
    </Button>
  )
}
```

**Methods**:
- `toast.success(message)`
- `toast.error(message)`
- `toast.info(message)`
- `toast.warning(message)`
- `toast.promise(promise, { loading, success, error })`

---

#### Toaster
Toast container component. Add once to your app root.

**Import**: `import { Toaster } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
function App() {
  return (
    <>
      <YourApp />
      <Toaster />
    </>
  )
}
```

---

#### Drawer
Mobile-friendly bottom drawer (vaul).

**Import**: `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">Content</div>
    <DrawerFooter>
      <Button>Action</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

---

#### Sheet
Side panel overlay.

**Import**: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@core-erp/ui/components/ui'`

**Sides**: `top`, `right`, `bottom`, `left`

**Example**:
```tsx
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

---

#### Progress
Progress bar indicator.

**Import**: `import { Progress } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Progress value={60} />
```

---

#### Skeleton
Loading skeleton placeholder.

**Import**: `import { Skeleton } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

---

### Navigation

#### Breadcrumb
Navigation breadcrumb trail.

**Import**: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/users">Users</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>John Doe</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

#### Tabs
Tabbed content interface.

**Import**: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Tab 1 content</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Tab 2 content</p>
  </TabsContent>
</Tabs>
```

---

#### NavigationMenu
Complex navigation menu with dropdowns.

**Import**: `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@core-erp/ui/components/ui'`

**Example**: See shadcn/ui docs for complex examples.

---

#### Menubar
Application menu bar.

**Import**: `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
      <MenubarItem>Save</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

---

#### DropdownMenu
Dropdown menu for actions.

**Import**: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

#### ContextMenu
Right-click context menu.

**Import**: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

---

#### Command
Command palette for search and actions.

**Import**: `import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

---

#### Pagination
Page navigation for lists.

**Import**: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

---

#### Sidebar
Application sidebar navigation.

**Import**: `import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@core-erp/ui/components/ui'`

**Example**: See shadcn/ui sidebar documentation for comprehensive examples.

---

### Layout

#### Separator
Visual divider between content.

**Import**: `import { Separator } from '@core-erp/ui/components/ui'`

**Orientations**: `horizontal`, `vertical`

**Example**:
```tsx
<div>
  <h1>Section 1</h1>
  <Separator className="my-4" />
  <h2>Section 2</h2>
</div>

<div className="flex h-5 items-center space-x-4">
  <div>Link 1</div>
  <Separator orientation="vertical" />
  <div>Link 2</div>
</div>
```

---

#### ScrollArea
Custom scrollbar container.

**Import**: `import { ScrollArea } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  <div className="space-y-4">
    {items.map((item) => (
      <div key={item}>{item}</div>
    ))}
  </div>
</ScrollArea>
```

---

#### Resizable
Resizable panel layout.

**Import**: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    <div>Left Panel</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div>Right Panel</div>
  </ResizablePanel>
</ResizablePanelGroup>
```

---

#### Toggle
Toggle button for on/off states.

**Import**: `import { Toggle } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

---

#### ToggleGroup
Group of toggle buttons.

**Import**: `import { ToggleGroup, ToggleGroupItem } from '@core-erp/ui/components/ui'`

**Example**:
```tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>
```

---

## Responsive Components

### PageContainer
Responsive page wrapper with max-width control.

**Import**: `import { PageContainer } from '@core-erp/ui/components/responsive'`

**Props**:
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` (default: 'xl')
- `className?: string`

**Example**:
```tsx
<PageContainer maxWidth="2xl">
  <PageHeader title="Dashboard" />
  {/* Page content */}
</PageContainer>
```

---

### PageHeader
Consistent page headers with title, subtitle, and actions.

**Import**: `import { PageHeader } from '@core-erp/ui/components/responsive'`

**Props**:
- `title: string` - Page title (required)
- `subtitle?: string` - Optional subtitle
- `actions?: React.ReactNode` - Action buttons
- `sticky?: boolean` - Sticky header (default: true)
- `className?: string`

**Example**:
```tsx
<PageHeader
  title="User Management"
  subtitle="Manage system users and their permissions"
  actions={
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add User
    </Button>
  }
/>
```

---

### ResponsiveGrid
Grid layout that adapts to screen size.

**Import**: `import { ResponsiveGrid } from '@core-erp/ui/components/responsive'`

**Props**:
- `columns?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number }`
- `gap?: number` - Gap between items (default: 4)
- `className?: string`

**Example**:
```tsx
<ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</ResponsiveGrid>
```

---

### ResponsiveStack
Vertical/horizontal stack with responsive spacing.

**Import**: `import { ResponsiveStack } from '@core-erp/ui/components/responsive'`

**Props**:
- `direction?: 'vertical' | 'horizontal'` (default: 'vertical')
- `spacing?: number` - Spacing between items (default: 4)
- `align?: 'start' | 'center' | 'end'`
- `className?: string`

**Example**:
```tsx
<ResponsiveStack spacing={6} align="center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ResponsiveStack>
```

---

### ResponsiveButton
Button with responsive sizing for mobile/desktop.

**Import**: `import { ResponsiveButton } from '@core-erp/ui/components/responsive'`

**Props**: Extends all `Button` props

**Example**:
```tsx
<ResponsiveButton variant="default">
  {/* Automatically adjusts size on mobile */}
  Click Me
</ResponsiveButton>
```

---

### ResponsiveTable
Mobile-friendly table with card fallback on small screens.

**Import**: `import { ResponsiveTable } from '@core-erp/ui/components/responsive'`

**Props**:
- `data: any[]` - Table data
- `columns: ColumnDef[]` - Column definitions
- `mobileBreakpoint?: number` - Switch to cards (default: 768)

**Example**:
```tsx
<ResponsiveTable
  data={users}
  columns={[
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' }
  ]}
/>
```

---

## Loading Components

### SkeletonCard
Loading skeleton for card layouts.

**Import**: `import { SkeletonCard } from '@core-erp/ui/components/loading'`

**Props**:
- `lines?: number` - Number of content lines (default: 3)
- `className?: string`

**Example**:
```tsx
{isLoading ? (
  <SkeletonCard lines={4} />
) : (
  <Card>{/* Actual content */}</Card>
)}
```

---

### SkeletonTable
Loading skeleton for table data.

**Import**: `import { SkeletonTable } from '@core-erp/ui/components/loading'`

**Props**:
- `rows?: number` - Number of rows (default: 5)
- `columns?: number` - Number of columns (default: 4)
- `className?: string`

**Example**:
```tsx
{isLoading ? (
  <SkeletonTable rows={10} columns={5} />
) : (
  <Table>{/* Actual data */}</Table>
)}
```

---

## Best Practices

### Component Selection
- Use **shadcn/ui components** for standard UI elements
- Use **responsive components** for page layouts and containers
- Use **loading components** during data fetching

### Composition
- Compose complex UIs from simple components
- Use `asChild` prop for polymorphic behavior
- Leverage Tailwind classes for customization

### Accessibility
- Always include proper labels for form controls
- Use ARIA attributes when needed
- Ensure keyboard navigation works
- Test with screen readers

### Performance
- Import specific components, not entire library
- Use loading states for better perceived performance
- Memoize expensive computations
- Lazy load heavy components when possible

---

**Next**: See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design tokens and theming.

