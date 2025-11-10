import { Table } from '../ui/table'
import { cn } from '../../lib/utils'

interface ResponsiveTableProps {
  children: React.ReactNode
  className?: string
  minWidth?: string
}

export function ResponsiveTable({ 
  children, 
  className,
  minWidth = '640px' 
}: ResponsiveTableProps) {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <Table 
        className={cn(className)}
        style={{ minWidth }}
      >
        {children}
      </Table>
    </div>
  )
}

interface ResponsiveTableCellProps {
  children: React.ReactNode
  className?: string
  sticky?: boolean
}

export function ResponsiveTableCell({ 
  children, 
  className,
  sticky = false 
}: ResponsiveTableCellProps) {
  return (
    <td 
      className={cn(
        sticky && 'sticky left-0 bg-card z-10',
        className
      )}
    >
      {children}
    </td>
  )
}

