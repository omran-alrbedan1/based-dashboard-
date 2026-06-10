import { Search, CalendarDays, Car, Bike } from 'lucide-react'
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter'
import { useTranslation } from 'react-i18next'
import type { DateRange } from 'react-day-picker'

interface DriverApprovalFilterForm {
  name: string
  vehicleType: string
  dateRange: DateRange | undefined
}

interface DriverApprovalFiltersProps {
  onApplyFilters: (values: DriverApprovalFilterForm) => void
  onResetFilters: () => void
  isLoading?: boolean
  initialFilters?: Partial<DriverApprovalFilterForm>
}

const EMPTY_TYPE = 'all'

const defaultValues: DriverApprovalFilterForm = { name: '', vehicleType: EMPTY_TYPE, dateRange: undefined }

const DriverApprovalFilters: React.FC<DriverApprovalFiltersProps> = ({
  onApplyFilters,
  onResetFilters,
  isLoading = false,
  initialFilters,
}) => {
  const { t } = useTranslation('drivers')

  const driverApprovalFilterConfig: FilterField<DriverApprovalFilterForm>[] = [
    {
      name: 'name',
      label: t('driverApprovalCard.driverName'),
      type: 'text',
      placeholder: t('filters.search.placeholder'),
      icon: Search,
      minWidth: '180px',
    },
    {
      name: 'vehicleType',
      label: t('driverApprovalCard.vehicleType'),
      type: 'select',
      icon: Car,
      minWidth: '140px',
      emptyValue: EMPTY_TYPE,
      options: [
        { value: EMPTY_TYPE, label: t('filters.vehicleType.all') },
        { value: 'car', label: t('filters.vehicleType.car'), icon: Car },
        { value: 'motorcycle', label: t('filters.vehicleType.motorcycle'), icon: Bike },
      ],
    },
    {
      name: 'dateRange',
      label: t('driverApprovalCard.submittedDate'),
      type: 'date-range',
      icon: CalendarDays,
      minWidth: '200px',
    },
  ]

  return (
    <CustomFilter<DriverApprovalFilterForm>
      title={t('driverApproval.filterTitle')}
      filters={driverApprovalFilterConfig}
      defaultValues={defaultValues}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
    />
  )
}

export default DriverApprovalFilters
