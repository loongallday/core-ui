/**
 * ThemeProvider component for @core-erp/ui
 * Provides theme configuration to all child components
 */

import * as React from 'react'
import {
  type ThemeConfig,
  defaultThemeConfig,
  themeConfigToCSS,
  mergeThemeConfig,
  validateThemeConfig,
} from '../lib/theme-config'

interface ThemeContextValue {
  config: ThemeConfig
  setConfig: (config: Partial<ThemeConfig>) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export interface ThemeProviderProps {
  /**
   * Theme configuration
   */
  config?: Partial<ThemeConfig>

  /**
   * Child components
   */
  children: React.ReactNode

  /**
   * Apply theme CSS variables to this element
   * @default 'root'
   */
  target?: 'root' | 'parent'

  /**
   * Custom class name for the wrapper
   */
  className?: string
}

/**
 * ThemeProvider - Provides theme configuration context
 * 
 * @example
 * <ThemeProvider config={{ radius: 'lg', spacing: 'compact' }}>
 *   <App />
 * </ThemeProvider>
 * 
 * @example Custom colors
 * <ThemeProvider config={{
 *   colors: {
 *     primary: '220 90% 50%',
 *     secondary: '240 80% 60%'
 *   }
 * }}>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  config: initialConfig = {},
  children,
  target = 'root',
  className,
}: ThemeProviderProps) {
  const [config, setConfigState] = React.useState<ThemeConfig>(() =>
    mergeThemeConfig(defaultThemeConfig, initialConfig)
  )

  const setConfig = React.useCallback((newConfig: Partial<ThemeConfig>) => {
    setConfigState((prev) => {
      const merged = mergeThemeConfig(prev, newConfig)
      if (validateThemeConfig(merged)) {
        return merged
      }
      return prev
    })
  }, [])

  // Apply CSS variables
  React.useEffect(() => {
    const cssVars = themeConfigToCSS(config)
    const targetElement = target === 'root' ? document.documentElement : document.body

    Object.entries(cssVars).forEach(([key, value]) => {
      targetElement.style.setProperty(key, value)
    })

    // Animation preferences
    if (config.animations === 'none') {
      targetElement.classList.add('no-animations')
    } else {
      targetElement.classList.remove('no-animations')
    }

    // Cleanup
    return () => {
      if (target === 'parent') {
        Object.keys(cssVars).forEach((key) => {
          targetElement.style.removeProperty(key)
        })
      }
    }
  }, [config, target])

  const value = React.useMemo(
    () => ({ config, setConfig }),
    [config, setConfig]
  )

  if (target === 'parent') {
    return (
      <ThemeContext.Provider value={value}>
        <div className={className}>{children}</div>
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to access theme configuration
 * Must be used within ThemeProvider
 * 
 * @example
 * function MyComponent() {
 *   const { config, setConfig } = useThemeConfig()
 *   
 *   return (
 *     <button onClick={() => setConfig({ radius: 'lg' })}>
 *       Change radius
 *     </button>
 *   )
 * }
 */
export function useThemeConfig(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useThemeConfig must be used within ThemeProvider')
  }
  
  return context
}

ThemeProvider.displayName = 'ThemeProvider'

