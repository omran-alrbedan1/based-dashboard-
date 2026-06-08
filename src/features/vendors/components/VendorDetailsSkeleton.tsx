import { Skeleton } from '@/components/ui/skeleton'

export const VendorDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-7 w-64" />
            </div>
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['Orders', 'Revenue', 'Rating', 'Products'].map((label, i) => (
            <div key={i} className="rounded-2xl border border-border bg-background-card p-5">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-8 rounded-xl" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-1 border-b border-border">
          {['Overview', 'Products'].map((tab, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-t-lg" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
