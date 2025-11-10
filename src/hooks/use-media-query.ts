import { useEffect, useState } from 'react'

/**
 * Hook to match a media query with SSR safety
 * 
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @param defaultValue - Default value for SSR (default: false)
 * @returns True if media query matches
 * 
 * @example
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 * const isPortrait = useMediaQuery('(orientation: portrait)')
 */
export function useMediaQuery(
  query: string,
  defaultValue: boolean = false
): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // SSR-safe: return default value on server
    if (typeof window === 'undefined') return defaultValue

    // Check if matchMedia is supported
    if (!window.matchMedia) return defaultValue

    return window.matchMedia(query).matches
  })

  useEffect(() => {
    // Skip if matchMedia not supported
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQueryList = window.matchMedia(query)

    // Update state
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches)
    }

    // Set initial value
    handleChange(mediaQueryList)

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange)
      return () => mediaQueryList.removeEventListener('change', handleChange)
    }
    // Legacy browsers (Safari < 14)
    else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleChange)
      return () => mediaQueryList.removeListener(handleChange)
    }
  }, [query])

  return matches
}

/**
 * Hook to detect device orientation
 * 
 * @returns 'portrait' or 'landscape'
 * 
 * @example
 * const orientation = useOrientation()
 * if (orientation === 'portrait') {
 *   // Show vertical layout
 * }
 */
export function useOrientation(): 'portrait' | 'landscape' {
  const isPortrait = useMediaQuery('(orientation: portrait)', true)
  return isPortrait ? 'portrait' : 'landscape'
}

/**
 * Hook to detect if user prefers reduced motion
 * 
 * @returns True if user prefers reduced motion
 * 
 * @example
 * const prefersReducedMotion = usePrefersReducedMotion()
 * return (
 *   <div className={prefersReducedMotion ? 'no-animation' : 'animated'}>
 *     Content
 *   </div>
 * )
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false)
}

/**
 * Hook to detect if user prefers dark color scheme
 * 
 * @returns True if user prefers dark mode
 * 
 * @example
 * const prefersDark = usePrefersDark()
 */
export function usePrefersDark(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)', false)
}

/**
 * Hook to detect high contrast mode
 * 
 * @returns True if high contrast is active
 */
export function usePrefersHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: high)', false)
}

