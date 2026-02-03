import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-accent/50',
        className
      )}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl border border-border/40 bg-card space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full max-w-[200px]" />
            <Skeleton className="h-3 w-full max-w-[150px]" />
          </div>
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex items-end gap-2 h-64">
        {Array.from({ length: 7 }).map((_, i) => {
          const height = Math.random() * 60 + 40
          return (
            <div 
              key={i} 
              className="flex-1"
              style={{ height: `${height}%` }}
            >
              <Skeleton className="h-full w-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
