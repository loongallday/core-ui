# @core-erp/ui - Migration Guide

Guide for migrating existing projects to use @core-erp/ui.

## Table of Contents

1. [Overview](#overview)
2. [Pre-Migration Checklist](#pre-migration-checklist)
3. [Migration Steps](#migration-steps)
4. [Import Path Changes](#import-path-changes)
5. [Component API Changes](#component-api-changes)
6. [Tailwind Configuration](#tailwind-configuration)
7. [Removing Duplicate Code](#removing-duplicate-code)
8. [Testing After Migration](#testing-after-migration)
9. [Rollback Plan](#rollback-plan)

---

## Overview

### What's Changing?

**Before Migration**:
```
your-project/
├── src/
│   ├── components/
│   │   ├── ui/          # 48 shadcn/ui components
│   │   ├── responsive/  # Custom components
│   │   └── loading/     # Loading states
│   ├── lib/
│   │   ├── utils.ts
│   │   └── formatters.ts
│   └── hooks/
│       └── use-toast.ts
└── tailwind.config.ts   # Full config
```

**After Migration**:
```
your-project/
├── src/
│   ├── components/
│   │   ├── AppLayout.tsx    # Project-specific only
│   │   └── CustomFeature.tsx
│   └── (imports from @core-erp/ui)
├── package.json             # Added @core-erp/ui
└── tailwind.config.ts       # Uses ui preset
```

### Benefits

- ✅ Reduced codebase size (~150KB removed)
- ✅ Single source of truth for UI
- ✅ Automatic UI updates
- ✅ Better type safety
- ✅ Consistent design across ecosystem

---

## Pre-Migration Checklist

Before starting migration:

- [ ] **Backup Project**: Commit current state or create branch
- [ ] **Review Dependencies**: Note any customized components
- [ ] **Document Custom Styles**: List any CSS overrides
- [ ] **Test Current State**: Ensure everything works
- [ ] **Plan Downtime**: If production, schedule maintenance window

```bash
# Create migration branch
git checkout -b migrate-to-core-ui

# Commit current state
git add .
git commit -m "chore: pre-migration checkpoint"
```

---

## Migration Steps

### Step 1: Install @core-erp/ui

**For Core ERP (main app)**:
```bash
npm install file:../core-ui
```

**For Plugins**:
```json
// package.json
{
  "peerDependencies": {
    "@core-erp/ui": "^1.0.0"
  }
}
```

```bash
npm install --save-dev @core-erp/ui
```

### Step 2: Update Tailwind Config

**Before**:
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { /* ... */ },
    extend: {
      colors: { /* ... */ },
      borderRadius: { /* ... */ },
      keyframes: { /* ... */ },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

**After**:
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],  // Use @core-erp/ui preset
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@core-erp/ui/dist/**/*.js'  // Include @core-erp/ui
  ],
  // Optional: custom overrides
  theme: {
    extend: {
      // Your project-specific customizations
    }
  },
} satisfies Config
```

### Step 3: Update Imports

Use search & replace to update import paths:

**UI Components**:
```typescript
// Before
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'

// After
import { Button, Card, Dialog } from '@core-erp/ui/components/ui'
```

**Responsive Components**:
```typescript
// Before
import { PageHeader } from '@/components/responsive'
import { ResponsiveGrid } from '@/components/responsive'

// After
import { PageHeader, ResponsiveGrid } from '@core-erp/ui/components/responsive'
```

**Loading Components**:
```typescript
// Before
import { SkeletonCard } from '@/components/loading'

// After
import { SkeletonCard } from '@core-erp/ui/components/loading'
```

**Utilities**:
```typescript
// Before
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/formatters'

// After
import { cn, formatDate } from '@core-erp/ui/lib'
```

**Hooks**:
```typescript
// Before
import { useToast } from '@/hooks/use-toast'

// After
import { useToast } from '@core-erp/ui/hooks'
```

### Step 4: Automated Find & Replace

Use your editor's find & replace:

**VS Code**:
1. Press `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac)
2. Enable regex mode
3. Use these patterns:

```regex
# Pattern 1: UI components
Find:    import \{ (.+?) \} from ['"]@/components/ui/(.+?)['"]
Replace: import { $1 } from '@core-erp/ui/components/ui'

# Pattern 2: Responsive components
Find:    import \{ (.+?) \} from ['"]@/components/responsive['"]
Replace: import { $1 } from '@core-erp/ui/components/responsive'

# Pattern 3: Loading components
Find:    import \{ (.+?) \} from ['"]@/components/loading['"]
Replace: import { $1 } from '@core-erp/ui/components/loading'

# Pattern 4: Utils
Find:    import \{ (.+?) \} from ['"]@/lib/utils['"]
Replace: import { $1 } from '@core-erp/ui/lib'

# Pattern 5: Formatters
Find:    import \{ (.+?) \} from ['"]@/lib/formatters['"]
Replace: import { $1 } from '@core-erp/ui/lib'

# Pattern 6: Hooks
Find:    import \{ useToast \} from ['"]@/hooks/use-toast['"]
Replace: import { useToast } from '@core-erp/ui/hooks'
```

### Step 5: Remove Duplicate Files

After confirming imports work, remove migrated files:

```bash
# UI components (if all are standard shadcn/ui)
rm -rf src/components/ui

# Responsive components (if standard)
rm -rf src/components/responsive

# Loading components (if standard)
rm -rf src/components/loading

# Utilities (if standard)
rm src/lib/utils.ts
rm src/lib/formatters.ts

# Hooks (if standard)
rm src/hooks/use-toast.ts
rm src/hooks/use-mobile.ts
```

**Keep**:
- Project-specific components (e.g., `AppLayout.tsx`, `ProtectedRoute.tsx`)
- Custom utilities
- Business logic hooks

### Step 6: Update CSS Imports

If you were importing component styles:

**Before**:
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component styles */
@import './components/ui/styles.css';
```

**After**:
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* @core-erp/ui styles (optional, usually not needed) */
/* Host application should already load these */
```

### Step 7: Test Build

```bash
# Clean build
rm -rf dist node_modules/.vite

# Reinstall
npm install

# Build
npm run build

# Should succeed with no errors
```

### Step 8: Test Application

```bash
npm run dev
```

**Test Checklist**:
- [ ] All pages load without errors
- [ ] Components render correctly
- [ ] Styles are applied properly
- [ ] Interactive elements work (buttons, forms, dialogs)
- [ ] Toast notifications work
- [ ] Responsive behavior correct
- [ ] TypeScript has no errors

---

## Import Path Changes

### Complete Mapping

| Before | After |
|--------|-------|
| `@/components/ui/*` | `@core-erp/ui/components/ui` |
| `@/components/responsive/*` | `@core-erp/ui/components/responsive` |
| `@/components/loading/*` | `@core-erp/ui/components/loading` |
| `@/lib/utils` | `@core-erp/ui/lib` |
| `@/lib/formatters` | `@core-erp/ui/lib` |
| `@/hooks/use-toast` | `@core-erp/ui/hooks` |
| `@/hooks/use-mobile` | `@core-erp/ui/hooks` |

### Special Cases

**Mixed Imports**:
```typescript
// Before
import { Button } from '@/components/ui/button'
import { CustomFeature } from '@/components/CustomFeature'

// After
import { Button } from '@core-erp/ui/components/ui'
import { CustomFeature } from '@/components/CustomFeature'  // Keep local
```

**Utility Functions**:
```typescript
// Before
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/formatters'

// After - Can import together
import { cn, formatDate } from '@core-erp/ui/lib'
```

---

## Component API Changes

### No Breaking Changes

@core-erp/ui components maintain the same API as shadcn/ui components. No code changes needed.

**Example** - Button API remains the same:
```typescript
// Before (local component)
<Button variant="default" size="lg" onClick={handleClick}>
  Click Me
</Button>

// After (@core-erp/ui) - Identical API
<Button variant="default" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### Custom Modifications

If you customized components, you have two options:

#### Option 1: Wrap @core-erp/ui Component

```typescript
// src/components/CustomButton.tsx
import { Button } from '@core-erp/ui/components/ui'
import { cn } from '@core-erp/ui/lib'

export function CustomButton({ children, ...props }) {
  return (
    <Button 
      className={cn('custom-styles', props.className)} 
      {...props}
    >
      {children}
    </Button>
  )
}
```

#### Option 2: Keep Custom Component

Keep your custom component alongside @core-erp/ui components:

```typescript
// src/components/EnhancedButton.tsx
// Your custom implementation
export function EnhancedButton({ ... }) {
  // Custom logic
}

// Usage
import { Button } from '@core-erp/ui/components/ui'  // Standard
import { EnhancedButton } from '@/components/EnhancedButton'  // Custom
```

---

## Tailwind Configuration

### Configuration Changes

**Before** - Full configuration:
```typescript
export default {
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        // ... 20+ color definitions
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // ... more config
    }
  }
}
```

**After** - Uses preset:
```typescript
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],  // All base config from preset
  theme: {
    extend: {
      // Only project-specific overrides
    }
  }
}
```

### Customizing After Migration

Override specific values:

```typescript
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  theme: {
    extend: {
      colors: {
        // Override primary color
        primary: {
          DEFAULT: 'hsl(262 83% 58%)',  // Custom primary
          foreground: 'hsl(210 20% 98%)',
        },
        // Add custom colors
        brand: {
          DEFAULT: 'hsl(340 82% 52%)',
          light: 'hsl(340 82% 62%)',
        }
      },
      // Add custom spacing
      spacing: {
        '128': '32rem',
      }
    }
  }
}
```

---

## Removing Duplicate Code

### Safe Deletion Checklist

Before deleting files:

1. **Verify imports updated**: Search for old import paths
```bash
# Find any remaining old imports
grep -r "@/components/ui" src/
grep -r "@/lib/utils" src/
grep -r "@/hooks/use-toast" src/
```

2. **Check build succeeds**: `npm run build`

3. **Run type check**: `npm run type-check`

4. **Test application**: `npm run dev` and test features

### Files to Delete

After verification:

```bash
# Standard shadcn/ui components (if not customized)
rm -rf src/components/ui/

# Standard responsive components (if not customized)
rm -rf src/components/responsive/

# Standard loading components (if not customized)
rm -rf src/components/loading/

# Standard utilities (if not customized)
rm src/lib/utils.ts
rm src/lib/formatters.ts

# Standard hooks (if not customized)
rm src/hooks/use-toast.ts
rm src/hooks/use-mobile.ts
```

### Files to Keep

**Always keep**:
- Project-specific components
- Business logic hooks
- Custom utilities
- Application-specific styling
- Context providers
- Route configurations

**Example - Core ERP**:
```
src/components/
├── AppLayout.tsx        ✅ Keep (project-specific)
├── LocaleSelector.tsx   ✅ Keep (project-specific)
├── ProtectedRoute.tsx   ✅ Keep (project-specific)
└── ui/                  ❌ Delete (from @core-erp/ui)
```

---

## Testing After Migration

### Comprehensive Test Plan

#### 1. Visual Testing

Test all pages:
- [ ] Pages render correctly
- [ ] Layouts are intact
- [ ] Spacing/padding correct
- [ ] Colors match expected
- [ ] Responsive behavior works

#### 2. Interaction Testing

Test interactive elements:
- [ ] Buttons clickable
- [ ] Forms submittable
- [ ] Dialogs open/close
- [ ] Dropdowns work
- [ ] Tooltips appear
- [ ] Tabs switch
- [ ] Accordions expand/collapse

#### 3. Functional Testing

Test application features:
- [ ] User authentication
- [ ] CRUD operations
- [ ] Data fetching
- [ ] Form validation
- [ ] Error handling
- [ ] Toast notifications

#### 4. Browser Testing

Test across browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

#### 5. Build Testing

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

---

## Rollback Plan

If migration fails:

### Quick Rollback

```bash
# Discard changes
git reset --hard HEAD

# Or revert to branch
git checkout main
```

### Partial Rollback

If some files migrated:

```bash
# Restore specific directories
git checkout HEAD -- src/components/ui
git checkout HEAD -- src/lib
git checkout HEAD -- tailwind.config.ts
```

### Troubleshooting Failed Migration

**Issue**: Build fails after migration

**Solution**:
1. Check `node_modules/@core-erp/ui` exists
2. Verify Tailwind content paths include @core-erp/ui
3. Ensure all imports updated
4. Clear cache: `rm -rf node_modules/.vite dist`

**Issue**: Styles not applying

**Solution**:
1. Verify Tailwind preset imported
2. Check content paths in tailwind.config.ts
3. Restart dev server

**Issue**: TypeScript errors

**Solution**:
1. Install @core-erp/ui (if missing)
2. Run `npm run type-check`
3. Check for outdated import paths

---

## Post-Migration

### Documentation Updates

Update your project documentation:
- Note dependency on @core-erp/ui
- Update component import examples
- Document any custom wrappers
- Update developer setup guide

### Team Communication

Inform team:
- New import paths
- Updated development workflow
- Benefits of migration
- How to handle conflicts (if any)

### Continuous Integration

Update CI/CD pipelines:
- Ensure @core-erp/ui available during build
- Update test scripts if needed
- Verify build cache configurations

---

## Next Steps

After successful migration:

1. **Review** [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - See all available components
2. **Explore** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Understand design system
3. **Reference** [API_REFERENCE.md](./API_REFERENCE.md) - Lookup component APIs

---

**Migration Complete!** 🎉

Your project now benefits from a centralized, maintainable UI system.

