import { toast as sonnerToast } from 'sonner'

/**
 * Toast notification utilities
 * Wrapper around sonner toast for consistent API
 */
export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
  warning: (message: string) => sonnerToast.warning(message),
}

/**
 * Hook for using toast notifications
 * @returns Toast utilities object
 */
export function useToast() {
  return { toast }
}

