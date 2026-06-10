import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterX } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { images } from '@/constants/images'
import { DriverApprovalCard, DriverApprovalFilters, DriverApprovalLoadingSkeleton } from '../components'
import { useDriverApproval } from '../hooks/useDriverApproval'
import { useFilters } from '@/hooks/useFilter'
import { driverApprovalFilterConfig } from '../configs/driverApproval.config'
import { DataPagination } from '@/components/shared/pagination/DataPagination'

const ITEMS_PER_PAGE = 6

const DriverApprovalPage = () => {
  const { t } = useTranslation('drivers')
  const { requests, loading, refetch } = useDriverApproval()

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } =
    useFilters({
      data: requests,
      config: driverApprovalFilterConfig,
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
        title={t('driverApproval.title')}
        description={t('driverApproval.description')}
        image={{
          src: images.approve,
          alt: 'drivers',
        }}
      />

      <div className="mt-4">
        <DriverApprovalFilters
          initialFilters={filtersForForm}
          onApplyFilters={(values) => applyFilters(values as Record<string, any>)}
          onResetFilters={resetFilters}
          isLoading={loading}
        />
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {loading ? (
          <div className="p-6">
            <DriverApprovalLoadingSkeleton count={6} />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('driverApproval.emptyState')}
                description={t('driverApproval.filterDescription')}
                imageUrl={images.emptyDrivers}
                primaryAction={{
                  label: t('filters.search.placeholder'),
                  onClick: resetFilters,
                  icon: FilterX,
                }}
              />
            ) : (
              <EmptyState
                title={t('driverApproval.emptyState')}
                description={t('driverApproval.filterDescription')}
                imageUrl={images.emptyDrivers}
              />
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((request) => (
                <DriverApprovalCard
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

export default DriverApprovalPage
