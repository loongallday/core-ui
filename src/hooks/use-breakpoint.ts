import { useEffect, useState } from 'react'
import { type Breakpoint, getCurrentBreakpoint, breakpoints } from '../lib/breakpoints'

/**
 * Hook to get the current breakpoint name
 * Updates on window resize
 * 
 * @returns Current breakpoint name (xs, sm, md, lg, xl, 2xl, 3xl)
 * 
 * @example
 * const breakpoint = useBreakpoint()
 * if (breakpoint === 'md' || breakpoint === 'lg') {
 *   // Render tablet/desktop layout
 * }
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'md' // SSR default
    return getCurrentBreakpoint(window.innerWidth)
  })

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint(window.innerWidth))
    }

    // Set initial value
    handleResize()

    // Listen for resize events with debouncing
    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return breakpoint
}

/**
 * Hook to check if screen is at or above a breakpoint
 * 
 * @param breakpoint - Breakpoint to check
 * @returns True if screen width is at or above breakpoint
 * 
 * @example
 * const isDesktop = useBreakpointValue('lg')
 * return isDesktop ? <DesktopNav /> : <MobileNav />
 */
export function useBreakpointValue(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= breakpoints[breakpoint]
  })

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.innerWidth >= breakpoints[breakpoint])
    }

    handleResize()

    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [breakpoint])

  return matches
}

