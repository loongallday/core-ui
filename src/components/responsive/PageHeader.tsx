import { cn } from '../../lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
  sticky?: boolean
}

export function PageHeader({ 
  title, 
  subtitle, 
  actions, 
  className,
  sticky = true 
}: PageHeaderProps) {
  return (
    <header 
      className={cn(
        'border-b bg-card shadow-sm',
        sticky && 'sticky top-0 z-10',
        className
      )}
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold truncate">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-2 truncate">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

