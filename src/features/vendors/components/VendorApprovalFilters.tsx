import { Search, Tag, CalendarDays, UtensilsCrossed, ShoppingBag, Package } from 'lucide-react'
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter'
import { useTranslation } from 'react-i18next'
import type { DateRange } from 'react-day-picker'

interface VendorApprovalFilterForm {
  name: string
  type: string
  dateRange: DateRange | undefined
}

interface VendorApprovalFiltersProps {
  onApplyFilters: (values: VendorApprovalFilterForm) => void
  onResetFilters: () => void
  isLoading?: boolean
  initialFilters?: Partial<VendorApprovalFilterForm>
}

const EMPTY_TYPE = 'all'

const defaultValues: VendorApprovalFilterForm = { name: '', type: EMPTY_TYPE, dateRange: undefined }

const VendorApprovalFilters: React.FC<VendorApprovalFiltersProps> = ({
  onApplyFilters,
  onResetFilters,
  isLoading = false,
  initialFilters,
}) => {
  const { t } = useTranslation('vendors')

  const vendorApprovalFilterConfig: FilterField<VendorApprovalFilterForm>[] = [
    {
      name: 'name',
      label: t('vendorApprovalCard.owner'),
      type: 'text',
      placeholder: t('filters.searchPlaceholder'),
      icon: Search,
      minWidth: '180px',
    },
    {
      name: 'type',
      label: t('vendorApprovalCard.type'),
      type: 'select',
      icon: Tag,
      minWidth: '140px',
      emptyValue: EMPTY_TYPE,
      options: [
        { value: EMPTY_TYPE, label: t('filters.allTypes') },
        { value: 'restaurant', label: t('type.restaurant'), icon: UtensilsCrossed },
        { value: 'store', label: t('type.store'), icon: ShoppingBag },
        { value: 'supplier', label: t('type.supplier'), icon: Package },
      ],
    },
    {
      name: 'dateRange',
      label: t('vendorApprovalCard.submittedDate'),
      type: 'date-range',
      icon: CalendarDays,
      minWidth: '200px',
    },
  ]

  return (
    <CustomFilter<VendorApprovalFilterForm>
      title={t('vendorApproval.filterTitle')}
      filters={vendorApprovalFilterConfig}
      defaultValues={defaultValues}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
        
    />
  )
}

export default VendorApprovalFilters
