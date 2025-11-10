import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind CSS classes
 * Uses clsx for conditional classes and tailwind-merge to properly merge Tailwind utilities
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Container query utility - marks an element as a container
 * @param type - Container type: 'size' (default), 'inline-size', or 'normal'
 * @returns Container class string
 * 
 * @example
 * <div className={cq('inline-size')}>
 *   <div className="@md:text-lg">Responsive to container width</div>
 * </div>
 */
export function cq(type: 'size' | 'inline-size' | 'normal' = 'inline-size'): string {
  const typeMap = {
    'size': '@container',
    'inline-size': '@container',
    'normal': '@container-normal'
  }
  return typeMap[type]
}

/**
 * Container query minimum width helper
 * @param breakpoint - Container breakpoint (sm, md, lg, xl, 2xl)
 * @param classes - Classes to apply at this breakpoint
 * @returns Conditional class string
 * 
 * @example
 * <div className={cqMin('md', 'grid-cols-2')}>Content</div>
 */
export function cqMin(breakpoint: string, classes: string): string {
  return `@${breakpoint}:${classes}`
}

/**
 * Container query maximum width helper
 * @param breakpoint - Container breakpoint
 * @param classes - Classes to apply below this breakpoint
 * @returns Conditional class string
 */
export function cqMax(breakpoint: string, classes: string): string {
  return `@max-${breakpoint}:${classes}`
}

/**
 * Generate responsive classes from a responsive value object
 * Converts { base: 'sm', md: 'lg' } to appropriate Tailwind classes
 * 
 * @param value - Responsive value object or single value
 * @param prefix - Class prefix (e.g., 'text' for text-sm, text-lg)
 * @returns Space-separated responsive classes
 * 
 * @example
 * responsiveClasses({ base: 'sm', md: 'lg' }, 'text')
 * // Returns: "text-sm md:text-lg"
 * 
 * @example
 * responsiveClasses('lg', 'text')
 * // Returns: "text-lg"
 */
export function responsiveClasses<T extends string>(
  value: T | Partial<Record<'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl', T>>,
  prefix: string = ''
): string {
  // If it's a simple value, return with prefix
  if (typeof value === 'string') {
    return prefix ? `${prefix}-${value}` : value
  }

  // Build responsive classes
  const classes: string[] = []
  const breakpoints = ['base', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const

  for (const bp of breakpoints) {
    const val = value[bp]
    if (val !== undefined) {
      const className = prefix ? `${prefix}-${val}` : val
      if (bp === 'base') {
        classes.push(className)
      } else {
        classes.push(`${bp}:${className}`)
      }
    }
  }

  return classes.join(' ')
}

