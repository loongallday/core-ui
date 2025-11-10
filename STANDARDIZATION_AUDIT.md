# Component Standardization Audit

This document tracks the standardization status of all 56 components in @core-erp/ui.

## Status Legend
- ✅ Fully standardized
- 🔄 Partially standardized
- ❌ Needs standardization

## UI Components (48 from shadcn/ui)

### Form Components

| Component | Size Variants | Visual Variants | Loading | Disabled | Responsive | A11y | Status |
|-----------|--------------|-----------------|---------|----------|------------|------|--------|
| Button | ✅ sm, lg, icon | ✅ default, destructive, outline, secondary, ghost, link | ❌ | ✅ | ❌ | ⚠️ | 🔄 |
| Input | ❌ Needs xs, xl | ❌ Only default | ❌ | ✅ | ⚠️ base | ⚠️ | 🔄 |
| Textarea | ❌ No sizes | ❌ No variants | ❌ | ✅ | ❌ | ⚠️ | ❌ |
| Select | ❌ No sizes | ❌ No variants | ❌ | ✅ | ❌ | ✅ | ❌ |
| Checkbox | ❌ No sizes | ❌ No variants | ❌ | ✅ | ❌ | ✅ | ❌ |
| Radio Group | ❌ No sizes | ❌ No variants | ❌ | ✅ | ❌ | ✅ | ❌ |
| Switch | ❌ No sizes | ❌ No variants | ❌ | ✅ | ❌ | ✅ | ❌ |
| Slider | ❌ No sizes | ❌ No variants | ❌ | ✅ | ❌ | ✅ | ❌ |
| Label | ❌ No sizes | ❌ No variants | N/A | N/A | ❌ | ✅ | ❌ |
| Form | N/A | N/A | N/A | N/A | ❌ | ✅ | 🔄 |
| Input OTP | ❌ No sizes | ❌ No variants | ❌ | ✅ | ❌ | ✅ | ❌ |

### Display Components

| Component | Size Variants | Visual Variants | Responsive | Status |
|-----------|--------------|-----------------|------------|--------|
| Card | ❌ | ❌ Only default | ⚠️ | ❌ |
| Badge | ❌ | ⚠️ default, secondary, destructive, outline | ❌ | 🔄 |
| Avatar | ⚠️ Some support | ❌ | ❌ | ❌ |
| Skeleton | ❌ | ❌ | ❌ | ❌ |
| Separator | ❌ | ❌ | ❌ | ❌ |
| Alert | ❌ | ⚠️ default, destructive | ❌ | 🔄 |
| Progress | ❌ | ❌ | ❌ | ❌ |

### Navigation Components

| Component | Size Variants | Visual Variants | Responsive | Status |
|-----------|--------------|-----------------|------------|--------|
| Breadcrumb | ❌ | ❌ | ❌ | ❌ |
| Pagination | ❌ | ❌ | ❌ | ❌ |
| Tabs | ❌ | ❌ | ❌ | ❌ |
| Navigation Menu | ❌ | ❌ | ❌ | ❌ |
| Menubar | ❌ | ❌ | ❌ | ❌ |
| Sidebar | ❌ | ❌ | ⚠️ | ❌ |

### Overlay Components

| Component | Size Variants | Visual Variants | Mobile Optimized | Status |
|-----------|--------------|-----------------|------------------|--------|
| Dialog | ❌ | ❌ | ❌ | ❌ |
| Alert Dialog | ❌ | ❌ | ❌ | ❌ |
| Sheet | ❌ | ❌ | ⚠️ | 🔄 |
| Drawer | ❌ | ❌ | ✅ | 🔄 |
| Popover | ❌ | ❌ | ❌ | ❌ |
| Tooltip | ❌ | ❌ | ❌ | ❌ |
| Hover Card | ❌ | ❌ | ❌ | ❌ |

### Menu Components

| Component | Size Variants | Visual Variants | Status |
|-----------|--------------|-----------------|--------|
| Dropdown Menu | ❌ | ❌ | ❌ |
| Context Menu | ❌ | ❌ | ❌ |
| Command | ❌ | ❌ | ❌ |

### Feedback Components

| Component | Size Variants | Visual Variants | Status |
|-----------|--------------|-----------------|--------|
| Toast/Sonner | ❌ | ⚠️ | 🔄 |
| Toaster | N/A | N/A | 🔄 |

### Data Display Components

| Component | Size Variants | Visual Variants | Responsive | Status |
|-----------|--------------|-----------------|------------|--------|
| Table | ❌ | ❌ | ❌ | ❌ |
| Accordion | ❌ | ❌ | ❌ | ❌ |
| Collapsible | ❌ | ❌ | ❌ | ❌ |
| Carousel | ❌ | ❌ | ⚠️ | 🔄 |
| Chart | N/A | N/A | ⚠️ | 🔄 |

### Utility Components

| Component | Status | Notes |
|-----------|--------|-------|
| Aspect Ratio | ✅ | Simple utility, no variants needed |
| Calendar | ❌ | Needs responsive support |
| Resizable | ❌ | Needs standardization |
| Scroll Area | ❌ | Needs standardization |
| Toggle | ❌ | Needs size variants |
| Toggle Group | ❌ | Needs size variants |

## Responsive Components (6 custom)

| Component | Size Variants | Visual Variants | Mobile Optimized | Status |
|-----------|--------------|-----------------|------------------|--------|
| PageHeader | ❌ | ❌ | ⚠️ | 🔄 |
| PageContainer | ⚠️ maxWidth | ❌ | ✅ | 🔄 |
| ResponsiveButton | Inherits Button | Inherits Button | ✅ | 🔄 |
| ResponsiveGrid | N/A | ❌ | ✅ | 🔄 |
| ResponsiveStack | N/A | ❌ | ✅ | 🔄 |
| ResponsiveTable | Inherits Table | ❌ | ✅ | 🔄 |

## Loading Components (2 custom)

| Component | Size Variants | Visual Variants | Status |
|-----------|--------------|-----------------|--------|
| SkeletonCard | ❌ | ❌ | ❌ |
| SkeletonTable | ❌ | ❌ | ❌ |

## Summary

### Overall Status
- **Total Components**: 56
- **Fully Standardized**: 1 (2%)
- **Partially Standardized**: 15 (27%)
- **Needs Standardization**: 40 (71%)

### Priority Actions

#### High Priority (Core interactive components)
1. **Button** - Add xs/xl sizes, loading state, responsive support
2. **Input** - Add size variants (xs-xl), variant types (error, success), loading state
3. **Select** - Add size variants, visual variants, mobile drawer behavior
4. **Card** - Add size variants, elevated/outline/ghost variants
5. **Dialog** - Add size variants, mobile fullscreen behavior
6. **Table** - Add size variants, responsive scroll behavior

#### Medium Priority (Common components)
7. **Textarea** - Add size and variant support
8. **Badge** - Add size variants, add success/warning variants
9. **Alert** - Add size variants, add success/warning/info variants
10. **Checkbox/Radio/Switch** - Add size variants
11. **Tabs** - Add size and variant support
12. **Accordion** - Add size and variant support

#### Low Priority (Specialized components)
13. All navigation components (Breadcrumb, Pagination, Navigation Menu, Menubar)
14. All menu components (Dropdown, Context Menu, Command)
15. Utility components (Toggle, Toggle Group, Calendar, etc.)

## Standardization Checklist

For each component, ensure:

### Props
- [ ] Extends appropriate base interfaces (BaseComponentProps, InteractiveComponentProps, etc.)
- [ ] Supports ResponsiveValue<T> for size prop where applicable
- [ ] Includes all relevant A11y props
- [ ] Has loading prop for interactive components
- [ ] Has disabled prop for interactive components
- [ ] Has fullWidth prop where applicable

### Variants (using cva)
- [ ] size: { xs, sm, default, lg, xl } (or subset)
- [ ] variant: Appropriate variants for component type
- [ ] Consistent naming (default, secondary, outline, ghost, destructive)
- [ ] Compound variants for logical combinations
- [ ] Default variants explicitly set

### TypeScript
- [ ] Full type annotations on props
- [ ] JSDoc comments with @example tags
- [ ] Exported prop types (ComponentNameProps)
- [ ] No 'any' types

### Accessibility
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Focus indicators
- [ ] Screen reader friendly

### Responsive
- [ ] Mobile-first approach
- [ ] Responsive prop support where applicable
- [ ] Touch-friendly targets (44px min)
- [ ] Works with container queries

## Next Steps

1. Create updated component templates
2. Refactor high-priority components first
3. Update documentation as components are standardized
4. Create migration guide for breaking changes
5. Verify all components with TypeScript strict mode
6. Test accessibility with automated tools

