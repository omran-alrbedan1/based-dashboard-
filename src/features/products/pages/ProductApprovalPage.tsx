import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterX } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { images } from '@/constants/images'
import { ProductApprovalCard, ProductApprovalFilters, ProductApprovalLoadingSkeleton } from '../components'
import { useProductApproval } from '../hooks/useProductApproval'
import { useFilters } from '@/hooks/useFilter'
import { productApprovalFilterConfig } from '../configs/productApproval.config'
import { DataPagination } from '@/components/shared/pagination/DataPagination'

const ITEMS_PER_PAGE = 6

const ProductApprovalPage = () => {
  const { t } = useTranslation('productApproval')
  const { requests, loading, refetch } = useProductApproval()

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } =
    useFilters({
      data: requests,
      config: productApprovalFilterConfig,
      syncWithURL: false,
    })

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredData.length])

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader
        title={t('title')}
        description={t('description')}
        image={{
          src: images.approve,
          alt: 'products',
        }}
      />

      <div className="mt-4">
        <ProductApprovalFilters
          initialFilters={filtersForForm}
          onApplyFilters={(values) => applyFilters(values as Record<string, any>)}
          onResetFilters={resetFilters}
          isLoading={loading}
        />
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {loading ? (
          <div className="p-6">
            <ProductApprovalLoadingSkeleton count={6} />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('noResultsTitle')}
                description={t('noResultsDescription')}
                imageUrl={images.emptyProducts}
                primaryAction={{
                  label: t('clearAllFilters'),
                  onClick: resetFilters,
                  icon: FilterX,
                }}
              />
            ) : (
              <EmptyState
                title={t('emptyTitle')}
                description={t('emptyDescription')}
                imageUrl={images.emptyProducts}
              />
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((request) => (
                <ProductApprovalCard
                  key={request.id}
                  request={request}
                  onUpdate={refetch}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && filteredData.length > 0 && totalPages > 1 && (
          <div className="my-4">
            <DataPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductApprovalPage
