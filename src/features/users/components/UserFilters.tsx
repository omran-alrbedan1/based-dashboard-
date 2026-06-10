import { Search, Filter, Calendar, UserCheck, Ban, Clock } from 'lucide-react'
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter'
import { useTranslation } from 'react-i18next'
import type { UserFilterForm, UserFiltersProps } from '../types/users.types'
import { EMPTY_STATUS, USER_FILTERS_DEFAULT } from '../types/users.types'

const UserFilters = ({
  onApplyFilters,
  onResetFilters,
  isLoading,
  initialFilters,
}: UserFiltersProps) => {
  const { t } = useTranslation('users')

  const userFilterConfig: FilterField<UserFilterForm>[] = [
    {
      name: 'search',
      label: t('filters.search'),
      type: 'text',
      placeholder: t('filters.searchPlaceholder'),
      icon: Search,
      minWidth: '200px',
    },
    {
      name: 'status',
      label: t('filters.statusLabel'),
      type: 'select',
      icon: Filter,
      minWidth: '150px',
      emptyValue: EMPTY_STATUS,
      options: [
        { value: EMPTY_STATUS, label: t('filters.allStatuses') },
        { value: 'Active', label: t('status.active'), icon: UserCheck },
        { value: 'Suspended', label: t('status.suspended'), icon: Ban },
        { value: 'Pending', label: t('status.pending'), icon: Clock },
      ],
    },
    {
      name: 'date_from',
      label: t('filters.dateFrom'),
      type: 'date',
      placeholder: 'Select date',
      icon: Calendar,
      minWidth: '150px',
    },
    {
      name: 'date_to',
      label: t('filters.dateTo'),
      type: 'date',
      placeholder: 'Select date',
      icon: Calendar,
      minWidth: '150px',
    },
  ]

  return (
    <CustomFilter<UserFilterForm>
      title={t('filters.applyFilters')}
      filters={userFilterConfig}
      defaultValues={USER_FILTERS_DEFAULT}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
      className="w-full"
    />
  )
}

export default UserFilters
