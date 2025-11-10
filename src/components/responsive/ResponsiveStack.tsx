import { cn } from '../../lib/utils'

interface ResponsiveStackProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'col'
  spacing?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  breakpoint?: 'sm' | 'md' | 'lg'
}

export function ResponsiveStack({ 
  children, 
  className,
  direction = 'row',
  spacing = 2,
  align = 'start',
  justify = 'start',
  breakpoint = 'sm'
}: ResponsiveStackProps) {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }

  const directionClasses = {
    row: {
      sm: 'flex-col sm:flex-row',
      md: 'flex-col md:flex-row',
      lg: 'flex-col lg:flex-row',
    },
    col: {
      sm: 'flex-col',
      md: 'flex-col',
      lg: 'flex-col',
    },
  }

  const gapClass = `gap-${spacing}`

  return (
    <div 
      className={cn(
        'flex',
        directionClasses[direction][breakpoint],
        gapClass,
        alignClasses[align],
        justifyClasses[justify],
        className
      )}
    >
      {children}
    </div>
  )
}

