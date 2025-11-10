import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardHeader } from '../ui/card'

interface SkeletonCardProps {
  hasHeader?: boolean
  lines?: number
}

export function SkeletonCard({ hasHeader = true, lines = 2 }: SkeletonCardProps) {
  return (
    <Card className="contain-layout">
      {hasHeader && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
      )}
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-full mb-1" />
        ))}
      </CardContent>
    </Card>
  )
}

