/**
 * Component defaults registry
 * Allows setting default props for components globally
 */

import type { ButtonProps } from '../components/ui/button'
import type { InputProps } from '../components/ui/input'

/**
 * Component defaults configuration
 */
export interface ComponentDefaults {
  Button?: Partial<Omit<ButtonProps, 'children' | 'onClick' | 'type'>>
  Input?: Partial<Omit<InputProps, 'value' | 'onChange' | 'onBlur' | 'onFocus' | 'name'>>
  // Add more components as needed
  [key: string]: any
}

/**
 * Global defaults storage
 */
let globalDefaults: ComponentDefaults = {}

/**
 * Set component defaults globally
 * 
 * @param defaults - Component defaults configuration
 * 
 * @example
 * setComponentDefaults({
 *   Button: { variant: 'outline', size: 'sm' },
 *   Input: { size: 'lg', fullWidth: true }
 * })
 */
export function setComponentDefaults(defaults: ComponentDefaults): void {
  globalDefaults = {
    ...globalDefaults,
    ...defaults,
  }
}

/**
 * Get defaults for a specific component
 * 
 * @param componentName - Name of the component
 * @returns Component defaults or undefined
 * 
 * @example
 * const buttonDefaults = getComponentDefaults('Button')
 */
export function getComponentDefaults<T = any>(componentName: string): T | undefined {
  return globalDefaults[componentName] as T | undefined
}

/**
 * Clear all component defaults
 */
export function clearComponentDefaults(): void {
  globalDefaults = {}
}

/**
 * Clear defaults for a specific component
 * 
 * @param componentName - Name of the component
 */
export function clearComponentDefault(componentName: string): void {
  delete globalDefaults[componentName]
}

/**
 * Get all component defaults
 * 
 * @returns All component defaults
 */
export function getAllComponentDefaults(): Readonly<ComponentDefaults> {
  return { ...globalDefaults }
}

/**
 * Merge component props with defaults
 * 
 * @param componentName - Name of the component
 * @param props - Component props
 * @returns Merged props
 * 
 * @example
 * const Button = (props) => {
 *   const mergedProps = mergeWithDefaults('Button', props)
 *   // Use mergedProps...
 * }
 */
export function mergeWithDefaults<T extends Record<string, any>>(
  componentName: string,
  props: T
): T {
  const defaults = getComponentDefaults<Partial<T>>(componentName)
  
  if (!defaults) {
    return props
  }

  // Merge, with provided props taking precedence
  return {
    ...defaults,
    ...props,
  } as T
}

/**
 * Hook to use component defaults
 * 
 * @param componentName - Name of the component
 * @param props - Component props
 * @returns Merged props with defaults
 * 
 * @example
 * function Button(props: ButtonProps) {
 *   const mergedProps = useComponentDefaults('Button', props)
 *   return <button {...mergedProps} />
 * }
 */
export function useComponentDefaults<T extends Record<string, any>>(
  componentName: string,
  props: T
): T {
  return mergeWithDefaults(componentName, props)
}

