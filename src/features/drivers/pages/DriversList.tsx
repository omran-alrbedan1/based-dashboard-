import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterX, Users, Truck, Star } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { useFilters } from '@/hooks/useFilter'
import { images } from '@/constants/images'
import { driverFilterConfig } from '../configs/drivers.config'
import { DriverFilters, DriversTable } from '../components'
import type { IDriverFilterForm } from '../types/drivers.types'
import { useDrivers } from '../hooks/useDrivers'
import StatCard from '@/components/shared/cards/StatCard'

const DriversList = () => {
  const { t } = useTranslation('drivers')
  const [filters, setFilters] = useState({
    page: 1,
    per_page: 15,
    search: '',
    status: '',
    area_id: '',
  })
  
  const { drivers, pagination, loading } = useDrivers(filters)
  const MOCK_DRIVERS = drivers

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } = useFilters({
    data: MOCK_DRIVERS,
    config: driverFilterConfig,
    syncWithURL: true,
  })

  const filteredDrivers = filteredData 

  // Calculate statistics
  const totalDrivers = 12
  const activeDrivers = 4
  const averageRating = 4

  const handleFormFilterChange = (formValues: IDriverFilterForm) => {
    setFilters({
      ...filters,
      search: formValues.search,
      status: formValues.status,
      area_id: formValues.area_id,
      page: 1,
    })
    applyFilters(formValues as Record<string, any>)
  }

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      per_page: 15,
      search: '',
      status: '',
      area_id: '',
    })
    resetFilters()
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader
        title={t('driversListPage.pageTitle')}
        description={t('driversListPage.pageDescription')}
        image={{ src: images.drivers, alt: t('driversListPage.pageTitle') }}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-6 lg:my-8">
        <StatCard
          label={t('stats.totalDrivers')}
          value={totalDrivers}
          sub={t('stats.totalDriversSub')}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label={t('stats.activeDrivers')}
          value={activeDrivers}
          sub={t('stats.activeDriversSub')}
          icon={<Truck className="h-5 w-5" />}
        />
        <StatCard
          label={t('stats.averageRating')}
          value={averageRating.toFixed(1)}
          sub={t('stats.averageRatingSub')}
          icon={<Star className="h-5 w-5" />}
        />
      </div>

      <DriverFilters
        onApplyFilters={handleFormFilterChange}
        onResetFilters={handleResetFilters}
        isLoading={loading}
        initialFilters={filtersForForm as Partial<IDriverFilterForm>}
      />

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {loading ? (
          <DriversTable
            drivers={[]}
            loading={true}
            pagination={{
              total: 0,
              page: 1,
              lastPage: 1,
            }}
            onPageChange={() => {}}
          />
        ) : filteredDrivers.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('table.noDrivers')}
                description={t('driversListPage.pageDescription', {
                  filteredCount: 0,
                  totalCount: MOCK_DRIVERS.length,
                })}
                imageUrl={images.emptyDrivers}
                primaryAction={{
                  label: t('clear', { ns: 'common' }),
                  onClick: () => handleResetFilters(),
                  icon: FilterX,
                }}
              />
            ) : (
              <EmptyState
                title={t('table.noDrivers')}
                description={t('driversListPage.pageDescription', {
                  filteredCount: 0,
                  totalCount: MOCK_DRIVERS.length,
                })}
                imageUrl={images.emptyDrivers}
              />
            )}
          </div>
        ) : (
          <DriversTable
            drivers={filteredDrivers}
            loading={false}
            pagination={{
              total: pagination.total,
              page: pagination.current_page,
              lastPage: pagination.last_page,
            }}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        )}
      </div>
    </div>
  )
}

export default DriversList