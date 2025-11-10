# @core-erp/ui - Design System

Complete design system documentation including tokens, patterns, and guidelines.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Layout](#layout)
6. [Shadows & Borders](#shadows--borders)
7. [Animations](#animations)
8. [Responsive Design](#responsive-design)
9. [Dark Mode](#dark-mode)
10. [Accessibility](#accessibility)
11. [Customization](#customization)

---

## Design Philosophy

### Core Principles

1. **Consistency**: Uniform design across all applications and plugins
2. **Accessibility**: WCAG 2.1 AA compliance minimum
3. **Responsiveness**: Mobile-first, works on all screen sizes
4. **Performance**: Optimized for fast rendering and interactions
5. **Flexibility**: Easily customizable while maintaining consistency

### Design Values

- **Clarity**: Clear visual hierarchy and information architecture
- **Efficiency**: Minimize cognitive load and interaction cost
- **Beauty**: Aesthetically pleasing without sacrificing usability
- **Reliability**: Predictable behavior and visual feedback

---

## Color System

### Semantic Colors

The design system uses semantic color naming that describes purpose, not appearance.

#### CSS Variables (HSL format)

```css
:root {
  /* Backgrounds */
  --background: 0 0% 100%;           /* Main background */
  --foreground: 222.2 84% 4.9%;      /* Main text */
  
  /* Cards & Elevated surfaces */
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  
  /* Popovers & floating elements */
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  
  /* Primary actions & focus */
  --primary: 221.2 83.2% 53.3%;      /* Primary blue */
  --primary-foreground: 210 40% 98%;
  
  /* Secondary actions */
  --secondary: 210 40% 96.1%;        /* Light gray */
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Muted elements */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  /* Accent highlights */
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* Destructive actions */
  --destructive: 0 84.2% 60.2%;      /* Red */
  --destructive-foreground: 210 40% 98%;
  
  /* Borders & separators */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  
  /* Focus rings */
  --ring: 221.2 83.2% 53.3%;
  
  /* Border radius */
  --radius: 0.5rem;
}
```

### Using Colors in Code

#### Tailwind Classes
```tsx
// Background colors
<div className="bg-background">
<div className="bg-card">
<div className="bg-primary">

// Text colors
<p className="text-foreground">
<p className="text-muted-foreground">
<p className="text-primary">

// Borders
<div className="border border-border">
```

#### Direct CSS
```css
.custom-element {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}

/* With alpha channel */
.overlay {
  background: hsl(var(--background) / 0.8);
}
```

### Color Palette

#### Primary (Blue)
- **Use for**: Primary actions, links, active states, focus indicators
- **Shades**: Automatically generated via HSL manipulation
- **HSL**: `221.2 83.2% 53.3%`

#### Secondary (Gray)
- **Use for**: Secondary actions, less prominent UI elements
- **Shades**: Automatically generated
- **HSL**: `210 40% 96.1%`

#### Destructive (Red)
- **Use for**: Delete actions, errors, critical warnings
- **HSL**: `0 84.2% 60.2%`

#### Muted (Light Gray)
- **Use for**: Disabled states, placeholder text, subtle backgrounds
- **HSL**: `210 40% 96.1%`

### Color Usage Guidelines

**Do's**:
- ✅ Use semantic color names (`bg-primary`, not `bg-blue-500`)
- ✅ Use `text-muted-foreground` for secondary text
- ✅ Use `bg-destructive` for dangerous actions
- ✅ Maintain sufficient contrast (WCAG AA minimum)

**Don'ts**:
- ❌ Don't use hard-coded color values
- ❌ Don't use colors outside the design system
- ❌ Don't use color as the only indicator
- ❌ Don't use low-contrast combinations

---

## Typography

### Font Family

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

Uses system fonts for optimal performance and native feel.

### Type Scale

| Size | Class | Font Size | Line Height | Use Case |
|------|-------|-----------|-------------|----------|
| xs | `text-xs` | 0.75rem (12px) | 1rem | Captions, labels |
| sm | `text-sm` | 0.875rem (14px) | 1.25rem | Secondary text |
| base | `text-base` | 1rem (16px) | 1.5rem | Body text (default) |
| lg | `text-lg` | 1.125rem (18px) | 1.75rem | Subtitles |
| xl | `text-xl` | 1.25rem (20px) | 1.75rem | Small headings |
| 2xl | `text-2xl` | 1.5rem (24px) | 2rem | Section headings |
| 3xl | `text-3xl` | 1.875rem (30px) | 2.25rem | Page headings |
| 4xl | `text-4xl` | 2.25rem (36px) | 2.5rem | Large headings |
| 5xl | `text-5xl` | 3rem (48px) | 1 | Display text |

### Font Weights

| Weight | Class | Value | Use Case |
|--------|-------|-------|----------|
| Normal | `font-normal` | 400 | Body text |
| Medium | `font-medium` | 500 | Emphasis |
| Semibold | `font-semibold` | 600 | Subheadings |
| Bold | `font-bold` | 700 | Headings |

### Fluid Typography

For responsive font sizes that scale smoothly:

```css
.text-fluid-sm {
  font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1rem);
}

.text-fluid-base {
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
}

.text-fluid-lg {
  font-size: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
}

.text-fluid-xl {
  font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
}
```

### Typography Guidelines

**Headings**:
```tsx
<h1 className="text-3xl font-bold tracking-tight">Page Title</h1>
<h2 className="text-2xl font-semibold">Section Title</h2>
<h3 className="text-xl font-semibold">Subsection</h3>
```

**Body Text**:
```tsx
<p className="text-base text-foreground">Primary text</p>
<p className="text-sm text-muted-foreground">Secondary text</p>
```

**Labels**:
```tsx
<label className="text-sm font-medium">Field Label</label>
```

---

## Spacing

### Spacing Scale

Tailwind's spacing scale (1 unit = 0.25rem = 4px):

| Value | Class | Size | Use Case |
|-------|-------|------|----------|
| 0 | `p-0`, `m-0` | 0 | Reset |
| 1 | `p-1`, `m-1` | 0.25rem (4px) | Tight spacing |
| 2 | `p-2`, `m-2` | 0.5rem (8px) | Small spacing |
| 3 | `p-3`, `m-3` | 0.75rem (12px) | Compact spacing |
| 4 | `p-4`, `m-4` | 1rem (16px) | **Default spacing** |
| 6 | `p-6`, `m-6` | 1.5rem (24px) | Medium spacing |
| 8 | `p-8`, `m-8` | 2rem (32px) | Large spacing |
| 12 | `p-12`, `m-12` | 3rem (48px) | Extra large |
| 16 | `p-16`, `m-16` | 4rem (64px) | Section spacing |

### Common Patterns

**Card Padding**:
```tsx
<Card className="p-4 md:p-6">
  {/* Content with responsive padding */}
</Card>
```

**Stack Spacing**:
```tsx
<div className="space-y-4">
  {/* Items with 1rem vertical spacing */}
</div>
```

**Section Margins**:
```tsx
<section className="mb-8 md:mb-12">
  {/* Section with responsive bottom margin */}
</section>
```

---

## Layout

### Container

Responsive container with automatic centering:

```tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

**Breakpoints**:
- Default: Full width with padding
- 2xl (1536px+): Max width 1400px

### Grid System

```tsx
// Auto-fit responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

// Explicit columns
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-8">Main content</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>
```

### Flexbox Patterns

```tsx
// Horizontal layout with space between
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

// Vertical stack
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Center content
<div className="flex items-center justify-center min-h-screen">
  <div>Centered content</div>
</div>
```

---

## Shadows & Borders

### Shadows

```css
/* Tailwind shadow utilities */
.shadow-sm    /* Subtle shadow for cards */
.shadow       /* Default shadow */
.shadow-md    /* Medium shadow for elevated elements */
.shadow-lg    /* Large shadow for modals */
.shadow-xl    /* Extra large shadow */
```

**Usage**:
```tsx
<Card className="shadow-sm hover:shadow-md transition-shadow">
  {/* Elevated card with hover effect */}
</Card>
```

### Borders

**Border Width**:
```css
.border       /* 1px border */
.border-2     /* 2px border */
.border-t     /* Top border only */
```

**Border Color**:
```tsx
<div className="border border-border">
  {/* Uses semantic border color */}
</div>
```

### Border Radius

Using CSS variable for consistency:

```css
--radius: 0.5rem; /* Base radius */

.rounded-sm   /* calc(var(--radius) - 4px) = 4px */
.rounded-md   /* calc(var(--radius) - 2px) = 6px */
.rounded-lg   /* var(--radius) = 8px */
.rounded-xl   /* calc(var(--radius) + 4px) = 12px */
```

---

## Animations

### Transition Utilities

```tsx
// General transitions
<div className="transition-all duration-200">

// Specific properties
<div className="transition-colors duration-150">
<div className="transition-transform duration-300">
<div className="transition-opacity duration-200">
```

### Custom Animations

**Accordion**:
```css
@keyframes accordion-down {
  from { height: 0 }
  to { height: var(--radix-accordion-content-height) }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height) }
  to { height: 0 }
}

.animate-accordion-down { animation: accordion-down 0.2s ease-out }
.animate-accordion-up { animation: accordion-up 0.2s ease-out }
```

**Fade In**:
```css
@keyframes fade-in {
  from { opacity: 0 }
  to { opacity: 1 }
}

.animate-fade-in { animation: fade-in 0.3s ease-out }
```

### Animation Guidelines

**Do's**:
- ✅ Use transitions for interactive elements (hover, focus)
- ✅ Keep animations under 300ms for UI feedback
- ✅ Use `ease-out` for entering elements
- ✅ Use `ease-in` for exiting elements
- ✅ Use `transform` and `opacity` for performance

**Don'ts**:
- ❌ Don't animate width/height (use transform)
- ❌ Don't make animations too slow
- ❌ Don't animate without purpose
- ❌ Don't forget `prefers-reduced-motion`

---

## Responsive Design

### Breakpoints

```javascript
{
  sm: '640px',    // Small tablets
  md: '768px',    // Tablets
  lg: '1024px',   // Small desktops
  xl: '1280px',   // Desktops
  '2xl': '1536px' // Large desktops
}
```

### Mobile-First Approach

```tsx
// Default (mobile), then override at breakpoints
<div className="text-sm md:text-base lg:text-lg">
  {/* Text grows with screen size */}
</div>

<div className="flex-col md:flex-row">
  {/* Stack on mobile, row on tablet+ */}
</div>

<div className="p-4 md:p-6 lg:p-8">
  {/* Responsive padding */}
</div>
```

### Responsive Patterns

**Hide/Show**:
```tsx
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

**Responsive Grid**:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Responsive columns */}
</div>
```

**Responsive Spacing**:
```tsx
<section className="py-8 md:py-12 lg:py-16">
  {/* Increases spacing on larger screens */}
</section>
```

### Touch Targets

Minimum 44x44px for interactive elements:

```tsx
// Custom utility
<button className="touch-target">
  {/* Minimum 44x44px */}
</button>
```

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

---

## Dark Mode

### Infrastructure (Ready, Not Fully Implemented)

The system is set up for dark mode with CSS variables:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... more dark mode variables */
}
```

### Activation (Future)

To enable dark mode:

1. Add theme toggle to application
2. Use `next-themes` or similar
3. Apply `dark` class to root element
4. All components automatically adapt

```tsx
// Future implementation
<html className={theme === 'dark' ? 'dark' : ''}>
```

---

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Test Contrast**:
```tsx
// Good
<p className="text-foreground">Sufficient contrast</p>

// Avoid
<p className="text-gray-400 bg-gray-300">Low contrast</p>
```

### Focus Indicators

All interactive elements have visible focus states:

```tsx
<Button className="focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Keyboard accessible
</Button>
```

### ARIA Attributes

Components include proper ARIA attributes:

```tsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

<Dialog aria-describedby="dialog-description">
  <DialogDescription id="dialog-description">
    Description text
  </DialogDescription>
</Dialog>
```

### Keyboard Navigation

All components support:
- Tab navigation
- Enter/Space activation
- Arrow key navigation (where applicable)
- Escape to close overlays

---

## Customization

### Overriding Theme Colors

In your application's Tailwind config:

```typescript
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(262 83% 58%)', // Custom primary color
          foreground: 'hsl(210 20% 98%)',
        },
      },
    },
  },
}
```

### Custom CSS Variables

In your global CSS:

```css
:root {
  --primary: 262 83% 58%; /* Custom primary */
  --radius: 0.75rem;      /* More rounded corners */
}
```

### Component Variants

Create custom variants using `cva`:

```typescript
import { cva } from 'class-variance-authority'
import { Button } from '@core-erp/ui/components/ui'

const customButtonVariants = cva(
  "base-styles",
  {
    variants: {
      custom: {
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      }
    }
  }
)

// Use custom variant
<Button className={customButtonVariants({ custom: 'gradient' })}>
  Custom Button
</Button>
```

### Extending Components

Wrap and extend existing components:

```typescript
import { Button } from '@core-erp/ui/components/ui'

export function IconButton({ icon, children, ...props }) {
  return (
    <Button {...props}>
      {icon}
      <span className="ml-2">{children}</span>
    </Button>
  )
}
```

---

## Best Practices

### Do's
- ✅ Use semantic color names
- ✅ Follow spacing scale
- ✅ Test on multiple screen sizes
- ✅ Ensure sufficient color contrast
- ✅ Provide keyboard navigation
- ✅ Use CSS variables for consistency
- ✅ Follow mobile-first approach

### Don'ts
- ❌ Don't use hard-coded values
- ❌ Don't ignore accessibility
- ❌ Don't create inconsistent patterns
- ❌ Don't override without good reason
- ❌ Don't use color alone to convey information

---

**Next**: Review [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for contributing to the design system.

