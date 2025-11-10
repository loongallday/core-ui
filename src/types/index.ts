/**
 * Shared TypeScript types for Core ERP UI components
 */

export interface ResponsiveProps {
  className?: string
  children?: React.ReactNode
}

export type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface PageContainerProps extends ResponsiveProps {
  maxWidth?: MaxWidth
}

export interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  backButton?: {
    label: string
    onClick: () => void
  }
  className?: string
}

