import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  ApprovalFilters,
  LoadingSkeleton,
  ApprovalRequestCard,
  ApprovalRequestListItem,
} from "@/components/product-approval"
import { Button } from "@/components/ui/button"
import { LayoutGrid, LayoutList, FilterX } from "lucide-react"
import { EmptyState, ErrorState } from "@/components/shared/states"
import { approvalRequests, ProductApprovalRequest } from "@/data/productApproval.data"
import { images } from "@/constants/images"
import { useFilters } from "@/hooks/useFilter"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import PageHeader from "@/components/shared/headers/PageHeader"

type ViewMode = "grid" | "list"

const ProductApprovalPage: React.FC = () => {
  const { t } = useTranslation('productApproval')
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [requests, setRequests] = useState<ProductApprovalRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Simulate loading the data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        setRequests([...approvalRequests])
        setIsError(false)
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const {
    filters,
    filteredData: filteredRequests,
    hasActiveFilters,
    activeFiltersCount,
    handleFilterChange,
    resetFilters
  } = useFilters({
    data: requests,
    config: [
      {
        key: "search",
        label: "Search",
        type: "search",
        getValue: (item) => [item.name.en, item.name.ar]
      },
      {
        key: "vendor",
        label: "Vendor",
        type: "select",
        getValue: (item) => item.vendorName.en
      },
      {
        key: "category",
        label: "Category",
        type: "select",
        getValue: (item) => item.category
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        getValue: (item) => item.status
      }
    ]
  })

  const vendors = Array.from(new Set(requests.map(item => item.vendorName.en))).sort()
  const categories = Array.from(new Set(requests.map(item => item.category))).sort()

  const handleRetry = () => {
    setIsLoading(true)
    setTimeout(() => {
      setRequests([...approvalRequests])
      setIsLoading(false)
      setIsError(false)
    }, 800)
  }

  const handleStatusChange = (
    productId: string,
    newStatus: "Approved" | "Rejected",
    reason?: { en: string; ar: string }  
  ) => {
    // Empty for now
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t("title")}
          description={t("description")}
        />
        <ErrorState
          variant="500"
          title={t("errorTitle")}
          description={t("errorDescription")}
          retry={handleRetry}
          size="lg"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("description")}
        image={{
          src: images.products,
          alt: "Product Approval",
        }}
      />

      {/* Filters Section */}
      <ApprovalFilters
        search={filters.search || ""}
        vendor={filters.vendor || ""}
        category={filters.category || ""}
        status={filters.status || ""}
        vendors={vendors}
        categories={categories}
        hasActiveFilters={hasActiveFilters}
        activeFiltersCount={activeFiltersCount}
        onSearchChange={(value) => handleFilterChange("search", value)}
        onVendorChange={(value) => handleFilterChange("vendor", value)}
        onCategoryChange={(value) => handleFilterChange("category", value)}
        onStatusChange={(value) => handleFilterChange("status", value)}
        onResetFilters={resetFilters}
      />

      {/* Results Section */}
      <div className="rounded-lg bg-card p-6 shadow-xs">
        {isLoading ? (
          <LoadingSkeleton viewMode={viewMode} count={6} />
        ) : filteredRequests.length === 0 ? (
          hasActiveFilters ? (
            <EmptyState
              title={t("noResultsTitle")}
              description={t("noResultsDescription")}
              imageUrl={images.emptyProducts}
              primaryAction={{
                label: t("clearAllFilters"),
                onClick: resetFilters,
                icon: FilterX
              }}
            />
          ) : (
            <EmptyState
              title={t("emptyTitle")}
              description={t("emptyDescription")}
              imageUrl={images.emptyProducts}
            />
          )
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                {t("showingRequests", { count: filteredRequests.length, total: requests.length })}
              </p>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={handleRetry} disabled={isLoading}>
                  {t("refresh")}
                </Button>
                {/* @ts-ignore */}
                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
                  <ToggleGroupItem value="grid" aria-label={t("gridView")}>
                    <LayoutGrid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label={t("listView")}>
                    <LayoutList className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {filteredRequests.map((request) => (
                  <ApprovalRequestCard
                    key={request.id}
                    request={request}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRequests.map((request) => (
                  <ApprovalRequestListItem
                    key={request.id}
                    request={request}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductApprovalPage