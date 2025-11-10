import type { ResponsiveValue } from './responsive'

/**
 * Standard size variants used across components
 */
export type Size = 'xs' | 'sm' | 'default' | 'lg' | 'xl'

/**
 * Standard visual variants used across components
 */
export type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'

/**
 * Standard state for components
 */
export type ComponentState = 'default' | 'loading' | 'disabled' | 'error' | 'success'

/**
 * Base props that all components should support
 */
export interface BaseComponentProps {
  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Component children
   */
  children?: React.ReactNode
}

/**
 * Props for components that support sizing
 */
export interface SizeProps {
  /**
   * Component size - can be responsive
   * @example 'lg'
   * @example { base: 'sm', md: 'lg' }
   */
  size?: ResponsiveValue<Size>
}

/**
 * Props for components that support variants
 */
export interface VariantProps {
  /**
   * Visual variant style
   */
  variant?: Variant
}

/**
 * Props for components that support loading state
 */
export interface LoadingProps {
  /**
   * Whether the component is in a loading state
   */
  loading?: boolean
}

/**
 * Props for components that support disabled state
 */
export interface DisabledProps {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean
}

/**
 * Props for components that support full width
 */
export interface FullWidthProps {
  /**
   * Whether component should take full width
   * Can be responsive
   */
  fullWidth?: ResponsiveValue<boolean>
}

/**
 * Props for components with responsive behavior
 */
export interface ResponsiveComponentProps {
  /**
   * Enable automatic responsive behavior
   */
  responsive?: boolean
}

/**
 * Standard accessibility props
 */
export interface A11yProps {
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string

  /**
   * ID of element that describes this component
   */
  'aria-describedby'?: string

  /**
   * ID of element that labels this component
   */
  'aria-labelledby'?: string

  /**
   * Whether component is required
   */
  'aria-required'?: boolean

  /**
   * Whether component is invalid
   */
  'aria-invalid'?: boolean
}

/**
 * Standard props for interactive components
 */
export interface InteractiveComponentProps
  extends BaseComponentProps,
    SizeProps,
    VariantProps,
    LoadingProps,
    DisabledProps,
    FullWidthProps,
    ResponsiveComponentProps,
    A11yProps {}

/**
 * Standard props for form input components
 */
export interface FormInputProps
  extends InteractiveComponentProps {
  /**
   * Input name attribute
   */
  name?: string

  /**
   * Input value
   */
  value?: string

  /**
   * Default value
   */
  defaultValue?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Whether input is required
   */
  required?: boolean

  /**
   * Whether input is read-only
   */
  readOnly?: boolean

  /**
   * Error message
   */
  error?: string

  /**
   * Change handler
   */
  onChange?: (value: string) => void

  /**
   * Blur handler
   */
  onBlur?: () => void

  /**
   * Focus handler
   */
  onFocus?: () => void
}

