import React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingSkeletonProps {
  viewMode?: "grid" | "list"
  count?: number
}

export const CardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 relative">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4" />
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
}

export const ListItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
      {/* Image Skeleton */}
      <Skeleton className="h-20 w-20 rounded-lg flex-shrink-0" />
      
      {/* Content Skeleton */}
      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  )
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  viewMode = "grid", 
  count = 6 
}) => {
  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {[...Array(count)].map((_, index) => (
          <ListItemSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(count)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}

export default LoadingSkeleton