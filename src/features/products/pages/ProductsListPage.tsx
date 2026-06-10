import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ProductFilters, LoadingSkeleton, ProductCard, ProductListItem } from '../components'
import { FilterX, LayoutGrid, List } from 'lucide-react'
import { EmptyState, ErrorState } from '@/components/shared/states'
import { approvalRequests, ProductApprovalRequest } from '@/features/products/data/products.data'
import { images } from '@/constants/images'
import { useFilters } from '@/hooks/useFilter'
import PageHeader from '@/components/shared/headers/PageHeader'
import { DataPagination } from '@/components/shared/pagination/DataPagination'
import { Button } from '@/components/ui/button'

const ITEMS_PER_PAGE = 12

const ProductsListPage = () => {
  const { t } = useTranslation('productApproval')
  const [requests, setRequests] = useState<ProductApprovalRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        setRequests([...approvalRequests])
        setIsError(false)
      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const config = [
    { key: 'search', label: 'Search', type: 'search' as const, getValue: (item: ProductApprovalRequest) => [item.name.en, item.name.ar, item.vendorName.en] },
    { key: 'vendor', label: 'Vendor', type: 'select' as const, getValue: (item: ProductApprovalRequest) => item.vendorName.en },
    { key: 'category', label: 'Category', type: 'select' as const, getValue: (item: ProductApprovalRequest) => item.category },
    { key: 'status', label: 'Status', type: 'select' as const, getValue: (item: ProductApprovalRequest) => item.status },
    { key: 'dateRange', label: 'Submitted Date', type: 'range' as const, getValue: (item: ProductApprovalRequest) => new Date(item.submittedDate).getTime() },
  ]

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } =
    useFilters({ data: requests, config, syncWithURL: false })

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredData.length])

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(Math.max(1, totalPages))
  }, [currentPage, totalPages])

  const handleRetry = () => {
    setIsLoading(true)
    setTimeout(() => {
      setRequests([...approvalRequests])
      setIsLoading(false)
      setIsError(false)
    }, 800)
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('title')} description={t('description')} />
        <ErrorState variant="500" title={t('errorTitle')} description={t('errorDescription')} retry={handleRetry} size="lg" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader title={t('title')} description={t('description')} image={{ src: images.products, alt: 'Products' }} />

      <div className="mt-4">
        <ProductFilters
          initialFilters={filtersForForm}
          onApplyFilters={(values) => applyFilters(values as Record<string, any>)}
          onResetFilters={resetFilters}
          isLoading={isLoading}
        />
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {isLoading ? (
          <div className="p-6">
            <LoadingSkeleton viewMode={viewMode} count={6} />
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState title={t('noResultsTitle')} description={t('noResultsDescription')} imageUrl={images.emptyProducts} primaryAction={{ label: t('clearAllFilters'), onClick: resetFilters, icon: FilterX }} />
            ) : (
              <EmptyState title={t('emptyTitle')} description={t('emptyDescription')} imageUrl={images.emptyProducts} />
            )}
          </div>
        ) : (
          <div>
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-text-secondary">{t('showingRequests', { count: paginatedData.length, total: filteredData.length })}</p>
                <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-0.5">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <LayoutGrid className={`h-4 w-4  ${viewMode === 'grid'?'text-white':''}`} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className={`h-4 w-4 ${viewMode === 'list'?'text-white':''}`} />
                  </Button>
                </div>
              </div>
              {viewMode === 'grid' ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {paginatedData.map((request) => <ProductCard key={request.id} request={request} />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedData.map((request) => <ProductListItem key={request.id} request={request} />)}
                </div>
              )}
            </div>

            {!isLoading && paginatedData.length > 0 && totalPages > 1 && (
              <div className="px-6 pb-6 pt-4">
                <DataPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsListPage
