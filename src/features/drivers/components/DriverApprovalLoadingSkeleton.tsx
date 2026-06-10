import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const DriverCardSkeleton: React.FC = () => (
  <Card className="group relative overflow-hidden bg-card border border-border rounded-xl transition-all duration-300">
    <CardContent className="p-0">
      {/* Header Section */}
      <div className="p-5 pb-3 border-b border-border/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Avatar Skeleton */}
            <div className="relative shrink-0">
              <div className="h-12 w-12 rounded-xl p-[2px]">
                <Skeleton className="h-full w-full rounded-[10px]" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>

          {/* Menu Button Skeleton */}
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>

      {/* Contact Info Skeleton */}
      <div className="px-5 py-3 space-y-2">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-7 w-7 rounded-full shrink-0" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-7 w-7 rounded-full shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border/50 my-1" />

      {/* Vehicle Details Skeleton */}
      <div className="px-5 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-7 w-7 rounded-full shrink-0" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-7 w-7 rounded-full shrink-0" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-7 w-7 rounded-full shrink-0" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Documents Skeleton */}
      <div className="mx-5 my-4 px-3 py-2 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </CardContent>
  </Card>
)

interface DriverApprovalLoadingSkeletonProps {
  count?: number
}

const DriverApprovalLoadingSkeleton: React.FC<DriverApprovalLoadingSkeletonProps> = ({
  count = 6,
}) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(count)].map((_, index) => (
      <DriverCardSkeleton key={index} />
    ))}
  </div>
)

export default DriverApprovalLoadingSkeleton