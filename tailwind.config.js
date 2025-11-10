import plugin from 'tailwindcss/plugin'

/**
 * Core ERP UI Tailwind Preset
 * 
 * This preset contains all the design tokens and utilities used across
 * Core ERP applications and plugins. Import this in your tailwind.config.ts:
 * 
 * import uiPreset from '@core-erp/ui/tailwind-preset'
 * 
 * export default {
 *   presets: [uiPreset],
 *   content: ['./src/**\/*.{ts,tsx}']
 * }
 */
export default {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        xs: ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        sm: ['clamp(0.875rem, 0.8rem + 0.35vw, 1rem)', { lineHeight: '1.5' }],
        base: ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', { lineHeight: '1.6' }],
        lg: ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', { lineHeight: '1.5' }],
        xl: ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 1.8rem + 2vw, 3rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(3rem, 2.4rem + 2.5vw, 3.75rem)', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'fade-out': 'fadeOut 150ms ease-in',
        'slide-in-from-top': 'slideInFromTop 200ms ease-out',
        'slide-in-from-bottom': 'slideInFromBottom 200ms ease-out',
        'slide-in-from-left': 'slideInFromLeft 200ms ease-out',
        'slide-in-from-right': 'slideInFromRight 200ms ease-out',
        'slide-out-to-top': 'slideOutToTop 200ms ease-in',
        'slide-out-to-bottom': 'slideOutToBottom 200ms ease-in',
        'slide-out-to-left': 'slideOutToLeft 200ms ease-in',
        'slide-out-to-right': 'slideOutToRight 200ms ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInFromTop: {
          '0%': { transform: 'translate3d(0, -10px, 0)', opacity: '0' },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translate3d(0, 10px, 0)', opacity: '0' },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translate3d(-10px, 0, 0)', opacity: '0' },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translate3d(10px, 0, 0)', opacity: '0' },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
        },
        slideOutToTop: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
          '100%': { transform: 'translate3d(0, -10px, 0)', opacity: '0' },
        },
        slideOutToBottom: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
          '100%': { transform: 'translate3d(0, 10px, 0)', opacity: '0' },
        },
        slideOutToLeft: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
          '100%': { transform: 'translate3d(-10px, 0, 0)', opacity: '0' },
        },
        slideOutToRight: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
          '100%': { transform: 'translate3d(10px, 0, 0)', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'out-smooth': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-smooth': 'cubic-bezier(0.32, 0, 0.67, 0)',
        'in-out-smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function({ addUtilities, addComponents }) {
      addUtilities({
        // Touch-friendly minimum target size
        '.touch-target': {
          minWidth: '44px',
          minHeight: '44px',
        },
        // Thin scrollbar styling
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--border)) transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: 'hsl(var(--border))',
          borderRadius: '4px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: 'hsl(var(--border) / 0.8)',
        },
        // Safe area padding utilities
        '.pt-safe': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.pb-safe': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.pl-safe': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.pr-safe': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.p-safe': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
      })
      addComponents({
        '.responsive-container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@screen sm': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
          '@screen md': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
          '@screen lg': {
            maxWidth: '1280px',
          },
        },
      })
    }),
  ],
}

