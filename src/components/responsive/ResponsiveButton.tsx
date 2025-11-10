import { forwardRef } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { cn } from '../../lib/utils'

interface ResponsiveButtonProps extends ButtonProps {
  fullWidthOnMobile?: boolean
}

export const ResponsiveButton = forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  ({ className, fullWidthOnMobile = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          'touch-target',
          fullWidthOnMobile && 'w-full sm:w-auto',
          className
        )}
        {...props}
      />
    )
  }
)

ResponsiveButton.displayName = 'ResponsiveButton'

