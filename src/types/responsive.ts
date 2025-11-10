import type { Breakpoint } from '../lib/breakpoints'

/**
 * Responsive value that can be a single value or an object with breakpoints
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint | 'base', T>>

/**
 * Check if a value is a responsive object
 */
export function isResponsiveValue<T>(
  value: ResponsiveValue<T>
): value is Partial<Record<Breakpoint | 'base', T>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Get the actual value from a responsive value for current breakpoint
 * This is for client-side resolution
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  currentBreakpoint: Breakpoint
): T | undefined {
  if (!isResponsiveValue(value)) {
    return value
  }

  // Breakpoint priority order
  const order: (Breakpoint | 'base')[] = ['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', 'base']
  const currentIndex = order.indexOf(currentBreakpoint)

  // Find the closest matching breakpoint value
  for (let i = currentIndex; i < order.length; i++) {
    const bp = order[i]
    if (bp in value && value[bp] !== undefined) {
      return value[bp]
    }
  }

  return undefined
}

