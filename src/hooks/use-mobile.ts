import { useEffect, useState } from 'react'

/**
 * Hook to detect if the device is mobile
 * @param breakpoint - Breakpoint in pixels (default: 768)
 * @returns Boolean indicating if the device is mobile
 */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check initially
    checkMobile()

    // Listen for resize
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

