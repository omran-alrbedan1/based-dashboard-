import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const VendorCardSkeleton: React.FC = () => (
  <Card className="group overflow-hidden border border-border/60 hover:border-border hover:shadow-md transition-all duration-300 bg-card rounded-xl">
    <CardContent className="p-4 sm:p-5 space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Store Icon Skeleton */}
          <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="min-w-0 flex-1">
            <Skeleton className="h-5 w-32 sm:w-40" />
          </div>
        </div>
        {/* Menu Button Skeleton */}
        <Skeleton className="h-8 w-8 rounded-md shrink-0" />
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Details */}
      <div className="space-y-2">
        {/* Owner Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-3 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
            <Skeleton className="h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-4 w-28 sm:w-32 mt-1 sm:mt-0" />
        </div>

        {/* Email Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-3 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
            <Skeleton className="h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-4 w-40 sm:w-48 mt-1 sm:mt-0" />
        </div>

        {/* Phone Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-3 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
            <Skeleton className="h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-4 w-32 sm:w-36 mt-1 sm:mt-0" />
        </div>

        {/* Area Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-3 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
            <Skeleton className="h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-4 w-24 sm:w-28 mt-1 sm:mt-0" />
        </div>

        {/* Type Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-3 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
            <Skeleton className="h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-4 w-20 sm:w-24 mt-1 sm:mt-0" />
        </div>

        {/* Submitted Date Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-3 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
            <Skeleton className="h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-4 w-28 sm:w-32 mt-1 sm:mt-0" />
        </div>
      </div>
    </CardContent>
  </Card>
)

interface VendorApprovalLoadingSkeletonProps {
  count?: number
}

const VendorApprovalLoadingSkeleton: React.FC<VendorApprovalLoadingSkeletonProps> = ({
  count = 6,
}) => (
  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(count)].map((_, index) => (
      <VendorCardSkeleton key={index} />
    ))}
  </div>
)

export default VendorApprovalLoadingSkeleton