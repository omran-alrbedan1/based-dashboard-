import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const VendorCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <CardContent className="p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </CardContent>
    <CardFooter className="p-5 pt-0">
      <div className="flex gap-2 w-full">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </CardFooter>
  </Card>
)

interface VendorApprovalLoadingSkeletonProps {
  count?: number
}

const VendorApprovalLoadingSkeleton: React.FC<VendorApprovalLoadingSkeletonProps> = ({
  count = 6,
}) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(count)].map((_, index) => (
      <VendorCardSkeleton key={index} />
    ))}
  </div>
)

export default VendorApprovalLoadingSkeleton
