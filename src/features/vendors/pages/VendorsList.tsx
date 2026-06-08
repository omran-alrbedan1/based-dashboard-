import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterX, Store, Clock, CheckCircle } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import StatCard from '@/components/shared/cards/StatCard'
import { useFilters } from '@/hooks/useFilter'
import { images } from '@/constants/images'
import { vendorFilterConfig } from '../configs/vendors.config'
import { VendorFilters, VendorsTable } from '../components'
import type { VendorFilterForm } from '../types/vendors.types'
import { useVendors } from '../hooks/useVendors'

const VendorsList = () => {
  const { t } = useTranslation('vendors')

  const [filters, setFilters] = useState({
    page: 1,
    per_page: 15,
    search: '',
    status: 'all',
    type: 'all',
  })

  const { vendors, pagination, loading } = useVendors(filters)

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } =
    useFilters({
      data: vendors,
      config: vendorFilterConfig,
      syncWithURL: true,
    })

  const filteredVendors = filteredData

  // Stats from full mock data
  const totalVendors = 13
  const pendingVendors = 5
  const approvedVendors = 8

  const handleFormFilterChange = (formValues: VendorFilterForm) => {
    setFilters({
      ...filters,
      search: formValues.search,
      status: formValues.status,
      type: formValues.type,
      page: 1,
    })
    applyFilters(formValues as Record<string, any>)
  }

  const handleResetFilters = () => {
    setFilters({ page: 1, per_page: 15, search: '', status: 'all', type: 'all' })
    resetFilters()
  }


  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader
        title={t('vendorsListPage.pageTitle')}
        description={t('vendorsListPage.pageDescription')}
        image={{ src: images.vendors, alt: t('vendorsListPage.pageTitle') }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-6 lg:my-8">
        <StatCard
          label={t('stats.totalVendors')}
          value={totalVendors}
          sub={t('stats.totalVendorsSub')}
          icon={<Store className="h-5 w-5" />}
        />
        <StatCard
          label={t('stats.pendingVendors')}
          value={pendingVendors}
          sub={t('stats.pendingVendorsSub')}
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          label={t('stats.approvedVendors')}
          value={approvedVendors}
          sub={t('stats.approvedVendorsSub')}
          icon={<CheckCircle className="h-5 w-5" />}
        />
      </div>

      <VendorFilters
        onApplyFilters={handleFormFilterChange}
        onResetFilters={handleResetFilters}
        isLoading={loading}
        initialFilters={filtersForForm as Partial<VendorFilterForm>}
      />

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {loading ? (
          <VendorsTable
            vendors={[]}
            loading={true}
            pagination={{
              total: 0,
              page: 1,
              lastPage: 1,
            }}
            onPageChange={() => {}}
          />
        ) : filteredVendors.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('table.noVendors')}
                description={t('vendorsListPage.pageDescription')}
                imageUrl={images.emptyVendors}
                primaryAction={{
                  label: t('filters.resetFilters'),
                  onClick: handleResetFilters,
                  icon: FilterX,
                }}
              />
            ) : (
              <EmptyState
                title={t('table.noVendors')}
                description={t('vendorsListPage.pageDescription')}
                imageUrl={images.emptyVendors}
              />
            )}
          </div>
        ) : (
          <VendorsTable
            vendors={filteredVendors}
            loading={false}
            pagination={{
              total: pagination.total,
              page: pagination.page,
              lastPage: pagination.lastPage,
            }}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        )}
      </div>
    </div>
  )
}

export default VendorsList