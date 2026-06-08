import { useTranslation } from 'react-i18next'
import { FilterX } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { images } from '@/constants/images'
import { VendorApprovalCard, VendorApprovalFilters, VendorApprovalLoadingSkeleton } from '../components'
import { useVendorApproval } from '../hooks/useVendorApproval'
import { useFilters } from '@/hooks/useFilter'
import { vendorApprovalFilterConfig } from '../configs/vendorApproval.config'

const VendorApprovalPage = () => {
  const { t } = useTranslation('vendors')
  const { requests, loading, refetch } = useVendorApproval()

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } =
    useFilters({
      data: requests,
      config: vendorApprovalFilterConfig,
      syncWithURL: false,
    })

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader
        title={t('vendorApproval.title')}
        description={t('vendorApproval.description')}
       image={{
        src:images.store,
        alt:'store'
       }}
      />

<div className='mt-4'>

      <VendorApprovalFilters
        initialFilters={filtersForForm }
        onApplyFilters={(values) => applyFilters(values as Record<string, any>)}
        onResetFilters={resetFilters}
        isLoading={loading}
        />

        </div>
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {loading ? (
          <div className="p-6">
            <VendorApprovalLoadingSkeleton count={6} />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('vendorApproval.emptyState')}
                description={t('vendorApproval.filterDescription')}
                imageUrl={images.emptyVendors}
                primaryAction={{
                  label: t('filters.resetFilters'),
                  onClick: resetFilters,
                  icon: FilterX,
                }}
              />
            ) : (
              <EmptyState
                title={t('vendorApproval.emptyState')}
                description={t('vendorApproval.filterDescription')}
                imageUrl={images.emptyVendors}
              />
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((request) => (
                <VendorApprovalCard
                  key={request.id}
                  request={request}
                  onUpdate={refetch}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorApprovalPage
