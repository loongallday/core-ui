/**
 * Breakpoint constants matching Tailwind config
 */
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
  '3xl': 1920,
} as const

export type Breakpoint = keyof typeof breakpoints

/**
 * Get breakpoint value in pixels
 * @param breakpoint - Breakpoint name
 * @returns Breakpoint value in pixels
 */
export function getBreakpointValue(breakpoint: Breakpoint): number {
  return breakpoints[breakpoint]
}

/**
 * Check if current width is at or above a breakpoint
 * @param width - Current width in pixels
 * @param breakpoint - Breakpoint to check
 * @returns True if width is at or above breakpoint
 */
export function isAboveBreakpoint(width: number, breakpoint: Breakpoint): boolean {
  return width >= breakpoints[breakpoint]
}

/**
 * Check if current width is below a breakpoint
 * @param width - Current width in pixels
 * @param breakpoint - Breakpoint to check
 * @returns True if width is below breakpoint
 */
export function isBelowBreakpoint(width: number, breakpoint: Breakpoint): boolean {
  return width < breakpoints[breakpoint]
}

/**
 * Get current breakpoint name based on width
 * @param width - Current width in pixels
 * @returns Current breakpoint name
 */
export function getCurrentBreakpoint(width: number): Breakpoint {
  const sortedBreakpoints = Object.entries(breakpoints)
    .sort(([, a], [, b]) => b - a) as [Breakpoint, number][]

  for (const [name, value] of sortedBreakpoints) {
    if (width >= value) {
      return name
    }
  }

  return 'xs'
}

/**
 * Create a media query string for a breakpoint
 * @param breakpoint - Breakpoint name
 * @param type - Query type: 'min' or 'max'
 * @returns Media query string
 */
export function createMediaQuery(
  breakpoint: Breakpoint,
  type: 'min' | 'max' = 'min'
): string {
  const value = breakpoints[breakpoint]
  return type === 'min'
    ? `(min-width: ${value}px)`
    : `(max-width: ${value - 1}px)`
}

/**
 * Create orientation media query
 * @param orientation - 'portrait' or 'landscape'
 * @returns Media query string
 */
export function createOrientationQuery(
  orientation: 'portrait' | 'landscape'
): string {
  return `(orientation: ${orientation})`
}

