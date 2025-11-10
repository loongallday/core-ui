# Customization Guide

This guide explains how to customize @core-erp/ui to match your brand and design requirements.

## Table of Contents

- [Theme Configuration](#theme-configuration)
- [CSS Variable Overrides](#css-variable-overrides)
- [Component Defaults](#component-defaults)
- [Tailwind Customization](#tailwind-customization)
- [Font Customization](#font-customization)
- [Animation Preferences](#animation-preferences)

## Theme Configuration

Use the `ThemeProvider` component to configure theme settings at runtime.

### Basic Setup

```tsx
import { ThemeProvider } from '@core-erp/ui'

function App() {
  return (
    <ThemeProvider 
      config={{
        radius: 'lg',
        spacing: 'compact',
        animations: 'full'
      }}
    >
      <YourApp />
    </ThemeProvider>
  )
}
```

### Available Configuration Options

#### Radius

Control border radius across all components:

- `'none'` - No border radius (0)
- `'sm'` - Small radius (0.25rem / 4px)
- `'md'` - Medium radius (0.5rem / 8px) - **default**
- `'lg'` - Large radius (0.75rem / 12px)
- `'full'` - Fully rounded (9999px)

```tsx
<ThemeProvider config={{ radius: 'lg' }}>
  <App />
</ThemeProvider>
```

#### Spacing

Adjust spacing density:

- `'compact'` - 12.5% less spacing
- `'default'` - Standard spacing - **default**
- `'relaxed'` - 12.5% more spacing

```tsx
<ThemeProvider config={{ spacing: 'compact' }}>
  <App />
</ThemeProvider>
```

#### Animations

Control animation behavior:

- `'none'` - Disable all animations
- `'reduced'` - Reduce motion (respects prefers-reduced-motion)
- `'full'` - Full animations - **default**

```tsx
<ThemeProvider config={{ animations: 'reduced' }}>
  <App />
</ThemeProvider>
```

### Color Customization

Override semantic colors using HSL values:

```tsx
<ThemeProvider 
  config={{
    colors: {
      primary: '220 90% 50%',        // Blue
      secondary: '240 80% 60%',      // Purple
      destructive: '0 84% 60%',      // Red
      accent: '150 60% 50%',         // Green
    }
  }}
>
  <App />
</ThemeProvider>
```

Available color tokens:
- `background` - Page background
- `foreground` - Text color
- `card` - Card background
- `cardForeground` - Card text
- `popover` - Popover background
- `popoverForeground` - Popover text
- `primary` - Primary brand color
- `primaryForeground` - Text on primary
- `secondary` - Secondary color
- `secondaryForeground` - Text on secondary
- `muted` - Muted background
- `mutedForeground` - Muted text
- `accent` - Accent color
- `accentForeground` - Text on accent
- `destructive` - Error/danger color
- `destructiveForeground` - Text on destructive
- `border` - Border color
- `input` - Input border color
- `ring` - Focus ring color

### Font Family Customization

```tsx
<ThemeProvider 
  config={{
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace']
    }
  }}
>
  <App />
</ThemeProvider>
```

## CSS Variable Overrides

All design tokens can be overridden with CSS custom properties.

### In Your Global CSS

```css
:root {
  /* Spacing */
  --spacing-md: 2rem; /* Increase medium spacing from 1.5rem to 2rem */
  
  /* Typography */
  --font-size-base: 1.125rem; /* Larger base font (18px instead of 16px) */
  --line-height-normal: 1.6; /* Increased line height */
  
  /* Animations */
  --duration-normal: 300ms; /* Slower transitions */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Custom easing */
  
  /* Z-index */
  --z-modal: 100; /* Adjust modal z-index */
  
  /* Shadows */
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15); /* Custom shadow */
}
```

### Available Token Categories

#### Spacing Tokens
```css
--spacing-xs: 0.5rem;    /* 8px */
--spacing-sm: 1rem;      /* 16px */
--spacing-md: 1.5rem;    /* 24px */
--spacing-lg: 2rem;      /* 32px */
--spacing-xl: 3rem;      /* 48px */
--spacing-2xl: 4rem;     /* 64px */
```

#### Typography Tokens
```css
--font-size-xs: 0.75rem;     /* 12px */
--font-size-sm: 0.875rem;    /* 14px */
--font-size-base: 1rem;      /* 16px */
--font-size-lg: 1.125rem;    /* 18px */
--font-size-xl: 1.25rem;     /* 20px */
--font-size-2xl: 1.5rem;     /* 24px */

--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Animation Tokens
```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);
```

#### Z-Index Scale
```css
--z-dropdown: 10;
--z-sticky: 20;
--z-fixed: 30;
--z-overlay: 40;
--z-modal: 50;
--z-popover: 60;
--z-tooltip: 70;
```

#### Component-Specific Tokens
```css
--button-height-sm: 2.25rem;   /* 36px */
--button-height-md: 2.5rem;    /* 40px */
--button-height-lg: 2.75rem;   /* 44px */

--input-height-sm: 2.25rem;
--input-height-md: 2.5rem;
--input-height-lg: 2.75rem;

--touch-target-min: 44px; /* Minimum touch target for mobile */
```

### Scoped Overrides

Override tokens for specific sections:

```css
.admin-panel {
  --primary: 200 100% 50%; /* Cyan for admin area */
  --spacing-md: 2.5rem; /* More spacious */
}

.compact-view {
  --spacing-md: 1rem; /* Tighter spacing */
  --font-size-base: 0.875rem; /* Smaller text */
}
```

## Component Defaults

Set default props for components (coming in v2.1):

```tsx
import { setComponentDefaults } from '@core-erp/ui/lib'

setComponentDefaults({
  Button: { 
    variant: 'outline', 
    size: 'sm',
    touchOptimized: true // Better for mobile
  },
  Input: { 
    size: 'lg',
    fullWidth: true
  },
  Card: { 
    className: 'shadow-md' 
  }
})
```

## Tailwind Customization

Extend the Tailwind preset in your project:

```js
// tailwind.config.js
import uiPreset from '@core-erp/ui/tailwind-preset'

export default {
  presets: [uiPreset],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... your brand colors
        }
      },
      fontFamily: {
        sans: ['Your Font', ...uiPreset.theme.fontFamily.sans],
      },
      // Override container padding
      container: {
        padding: {
          DEFAULT: '2rem',
          lg: '3rem',
        }
      }
    }
  }
}
```

## Font Customization

### Using System Fonts

```tsx
<ThemeProvider 
  config={{
    fontFamily: {
      sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Consolas']
    }
  }}
>
  <App />
</ThemeProvider>
```

### Using Custom Web Fonts

```tsx
// App.tsx
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

<ThemeProvider 
  config={{
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  }}
>
  <App />
</ThemeProvider>
```

### Using Google Fonts

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```tsx
<ThemeProvider 
  config={{
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  }}
>
  <App />
</ThemeProvider>
```

## Animation Preferences

### Respecting User Preferences

The library automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Disabling Animations Globally

```tsx
<ThemeProvider config={{ animations: 'none' }}>
  <App />
</ThemeProvider>
```

### Custom Animation Durations

```css
:root {
  --duration-fast: 100ms;    /* Faster animations */
  --duration-normal: 250ms;  /* Default transitions */
  --duration-slow: 400ms;    /* Slower animations */
}
```

## Dark Mode

Dark mode is controlled by adding the `dark` class to the root element:

```tsx
// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark')
}

// Set dark mode
function setDarkMode(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
```

### With Theme Provider

```tsx
import { ThemeProvider } from '@core-erp/ui'
import { useState, useEffect } from 'react'

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <ThemeProvider config={{ /* ... */ }}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Dark Mode
      </button>
      <YourApp />
    </ThemeProvider>
  )
}
```

## Complete Example

```tsx
import { ThemeProvider } from '@core-erp/ui'
import '@core-erp/ui/styles'
import './custom-overrides.css'

function App() {
  return (
    <ThemeProvider 
      config={{
        // Border radius
        radius: 'lg',
        
        // Spacing density
        spacing: 'compact',
        
        // Animation preferences
        animations: 'full',
        
        // Custom colors
        colors: {
          primary: '220 90% 50%',
          secondary: '240 80% 60%',
        },
        
        // Custom fonts
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['Fira Code', 'Consolas', 'monospace']
        }
      }}
    >
      <YourApp />
    </ThemeProvider>
  )
}
```

```css
/* custom-overrides.css */
:root {
  /* Larger base font */
  --font-size-base: 1.125rem;
  
  /* Tighter line height */
  --line-height-normal: 1.5;
  
  /* Custom shadows */
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.16);
  
  /* Custom z-indexes */
  --z-modal: 100;
  --z-notification: 150;
}

.dark {
  /* Darker shadow in dark mode */
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.5);
}
```

## Next Steps

- See [API Reference](./API_REFERENCE.md) for complete component APIs
- Check [Design System](./DESIGN_SYSTEM.md) for color and spacing guidelines
- Review [Component Catalog](./COMPONENT_CATALOG.md) for all available components

