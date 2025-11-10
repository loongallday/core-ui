import { cn } from '../../lib/utils'

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  minWidth?: string
  gap?: number
}

export function ResponsiveGrid({ 
  children, 
  className,
  minWidth = '280px',
  gap = 4 
}: ResponsiveGridProps) {
  const gapClass = `gap-${gap}`
  
  return (
    <div 
      className={cn(
        'grid',
        gapClass,
        className
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`
      }}
    >
      {children}
    </div>
  )
}

