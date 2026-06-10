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

const ProductApprovalDetailsSkeleton: React.FC = () => (
  <div className="space-y-6">
    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Skeleton className="h-24 w-24 rounded-xl shrink-0" />
          <div className="flex-1 text-center sm:text-left space-y-3">
            <Skeleton className="h-7 w-48 mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-32 mx-auto sm:mx-0" />
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </CardContent>
    </Card>

    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </CardContent>
    </Card>

    <Card className="overflow-hidden border border-border/60 rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </CardContent>
    </Card>

    <div className="flex items-center justify-end gap-3">
      <Skeleton className="h-9 w-24 rounded-lg" />
      <Skeleton className="h-9 w-24 rounded-lg" />
    </div>
  </div>
)

export default ProductApprovalDetailsSkeleton
