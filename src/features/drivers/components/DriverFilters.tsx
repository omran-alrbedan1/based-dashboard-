import { Search, UserCheck, UserX, UserPlus, WifiOff, MapPin, AlertCircle } from 'lucide-react'
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter';
import { useTranslation } from 'react-i18next'
import { MOCK_AREAS } from '../data/drivers.data'
import { EMPTY_STATUS, EMPTY_AREA, IDriverFilterForm, DRIVER_FILTERS_DEFAULT } from '../types/drivers.types'

interface DriverFiltersProps {
  onApplyFilters: (filters: IDriverFilterForm) => void
  onResetFilters: () => void
  isLoading?: boolean
  initialFilters?: Partial<IDriverFilterForm>
}

export function DriverFilters({
  onApplyFilters,
  onResetFilters,
  isLoading,
  initialFilters,
}: DriverFiltersProps) {
  const { t } = useTranslation('drivers')

  const areaOptions = MOCK_AREAS.map((area) => ({
    value: String(area.id),
    label: area.name,
  }))

  const driverFilterConfig: FilterField<IDriverFilterForm>[] = [
    {
      name: 'search',
      label: t('filters.search.label'),
      type: 'text',
      placeholder: t('filters.search.placeholder'),
      icon: Search,
      minWidth: '200px',
      getDisplayValue: (value) =>
        typeof value === 'string' && value.length > 20
          ? `${value.slice(0, 20)}…`
          : (value as string),
    },
    {
      name: 'status',
      label: t('filters.status.label'),
      type: 'select',
      icon: UserCheck,
      minWidth: '150px',
      emptyValue: EMPTY_STATUS,
      options: [
        { value: EMPTY_STATUS, label: t('filters.status.options.all'), icon: AlertCircle },
        { value: 'active', label: t('filters.status.options.active'), icon: UserCheck },
        { value: 'suspended', label: t('filters.status.options.suspended'), icon: UserX },
        { value: 'pending', label: t('filters.status.options.pending'), icon: UserPlus },
        { value: 'offline', label: t('filters.status.options.offline'), icon: WifiOff },
      ],
    },
    {
      name: 'area_id',
      label: t('filters.area.label'),
      type: 'select',
      icon: MapPin,
      minWidth: '150px',
      emptyValue: EMPTY_AREA,
      options: [
        { value: EMPTY_AREA, label: t('filters.area.all'), icon: AlertCircle },
        ...areaOptions,
      ],
    },
  ]

  return (
    <CustomFilter<IDriverFilterForm>
      title={t('filters.title')}
      filters={driverFilterConfig}
      defaultValues={DRIVER_FILTERS_DEFAULT}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
    />
  )
}
