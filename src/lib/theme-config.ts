/**
 * Theme configuration system for @core-erp/ui
 * Allows runtime customization of design tokens
 */

export type RadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type SpacingScale = 'compact' | 'default' | 'relaxed'
export type AnimationMode = 'none' | 'reduced' | 'full'

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  /**
   * Color overrides using CSS variable values
   * @example { primary: '220 90% 50%' }
   */
  colors?: Partial<{
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }>

  /**
   * Border radius scale
   * @default 'md'
   */
  radius?: RadiusScale

  /**
   * Font family configuration
   */
  fontFamily?: {
    sans?: string[]
    mono?: string[]
  }

  /**
   * Spacing density
   * @default 'default'
   */
  spacing?: SpacingScale

  /**
   * Animation preferences
   * @default 'full'
   */
  animations?: AnimationMode
}

/**
 * Default theme configuration
 */
export const defaultThemeConfig: ThemeConfig = {
  colors: {},
  radius: 'md',
  fontFamily: {},
  spacing: 'default',
  animations: 'full',
}

/**
 * Convert theme config to CSS variables
 */
export function themeConfigToCSS(config: ThemeConfig): Record<string, string> {
  const cssVars: Record<string, string> = {}

  // Color overrides
  if (config.colors) {
    Object.entries(config.colors).forEach(([key, value]) => {
      if (value) {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        cssVars[`--${cssKey}`] = value
      }
    })
  }

  // Radius
  if (config.radius) {
    const radiusMap: Record<RadiusScale, string> = {
      none: '0rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    }
    cssVars['--radius'] = radiusMap[config.radius]
  }

  // Spacing modifiers
  if (config.spacing && config.spacing !== 'default') {
    const spacingMultiplier = config.spacing === 'compact' ? 0.875 : 1.125
    cssVars['--spacing-scale'] = spacingMultiplier.toString()
  }

  return cssVars
}

/**
 * Merge theme configurations
 */
export function mergeThemeConfig(
  base: ThemeConfig,
  override: Partial<ThemeConfig>
): ThemeConfig {
  return {
    ...base,
    ...override,
    colors: {
      ...base.colors,
      ...override.colors,
    },
    fontFamily: {
      ...base.fontFamily,
      ...override.fontFamily,
    },
  }
}

/**
 * Validate theme configuration
 */
export function validateThemeConfig(config: ThemeConfig): boolean {
  // Check radius
  if (config.radius && !['none', 'sm', 'md', 'lg', 'full'].includes(config.radius)) {
    console.warn(`Invalid radius value: ${config.radius}`)
    return false
  }

  // Check spacing
  if (config.spacing && !['compact', 'default', 'relaxed'].includes(config.spacing)) {
    console.warn(`Invalid spacing value: ${config.spacing}`)
    return false
  }

  // Check animations
  if (config.animations && !['none', 'reduced', 'full'].includes(config.animations)) {
    console.warn(`Invalid animations value: ${config.animations}`)
    return false
  }

  return true
}

