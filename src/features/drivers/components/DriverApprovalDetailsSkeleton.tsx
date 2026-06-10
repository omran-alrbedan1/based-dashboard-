import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonRow: React.FC = () => (
  <div className="flex items-start gap-3">
    <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
    <div className="flex-1 space-y-1.5">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-40" />
    </div>
  </div>
)

const DriverApprovalDetailsSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Identity Header */}
    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Skeleton className="h-20 w-20 rounded-full shrink-0" />
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <Skeleton className="h-7 w-48" />
            </div>
            <Skeleton className="h-4 w-28 mx-auto sm:mx-0" />
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Personal Information */}
    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
          <div className="sm:col-span-2 lg:col-span-3">
            <SkeletonRow />
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Vehicle Information */}
    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Documents */}
    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border border-border/60 bg-background-secondary/50 p-4">
              <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
                <div className="flex gap-3 mt-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Additional Information */}
    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Bottom Action Buttons */}
    <div className="flex items-center justify-end gap-3">
      <Skeleton className="h-9 w-24 rounded-lg" />
      <Skeleton className="h-9 w-24 rounded-lg" />
    </div>
  </div>
)

export default DriverApprovalDetailsSkeleton
