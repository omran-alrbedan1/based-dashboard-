import { Skeleton } from '@/components/ui/skeleton'

export const DriverDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
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

      {/* Stats Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Deliveries', width: 'w-20' },
            { title: 'On-Time Rate', width: 'w-24' },
            { title: 'Safety Score', width: 'w-24' },
            { title: 'Rating', width: 'w-16' },
          ].map((card, i) => (
            <div key={i} className="rounded-2xl border border-border bg-background-card p-5">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className={`h-4 ${card.width}`} />
                <Skeleton className="h-8 w-8 rounded-xl" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-1 border-b border-border">
          {['Overview', 'Documents', 'Work Areas', 'Activity'].map((tab, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-t-lg" />
          ))}
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border border-border bg-background-card overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Profile */}
            <div className="md:w-[340px] p-8 flex flex-col items-center border-r border-border">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              
              {/* Avatar */}
              <Skeleton className="h-36 w-36 rounded-full" />
              
              {/* Name */}
              <Skeleton className="h-7 w-40 mt-5" />
              
              {/* Email */}
              <Skeleton className="h-4 w-48 mt-2" />
            </div>

            {/* Right Side - Key Info */}
            <div className="flex-1 p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { label: 'PHONE', width: 'w-32' },
                  { label: 'EMAIL', width: 'w-32' },
                  { label: 'SERVICE AREAS', width: 'w-32' },
                  { label: 'JOINED', width: 'w-32' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className={`h-4 ${item.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}