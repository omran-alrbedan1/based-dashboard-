import { Search, Tag, CalendarDays } from 'lucide-react'
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter'
import { useTranslation } from 'react-i18next'
import type { DateRange } from 'react-day-picker'

interface ProductApprovalFilterForm {
  name: string
  category: string
  dateRange: DateRange | undefined
}

interface ProductApprovalFiltersProps {
  onApplyFilters: (values: ProductApprovalFilterForm) => void
  onResetFilters: () => void
  isLoading?: boolean
  initialFilters?: Partial<ProductApprovalFilterForm>
}

const EMPTY_CATEGORY = 'all'

const defaultValues: ProductApprovalFilterForm = { name: '', category: EMPTY_CATEGORY, dateRange: undefined }

const ProductApprovalFilters: React.FC<ProductApprovalFiltersProps> = ({
  onApplyFilters,
  onResetFilters,
  isLoading = false,
  initialFilters,
}) => {
  const { t } = useTranslation('productApproval')

  const filterConfig: FilterField<ProductApprovalFilterForm>[] = [
    {
      name: 'name',
      label: t('productName'),
      type: 'text',
      placeholder: t('searchPlaceholder'),
      icon: Search,
      minWidth: '180px',
    },
    {
      name: 'category',
      label: t('category'),
      type: 'select',
      icon: Tag,
      minWidth: '140px',
      emptyValue: EMPTY_CATEGORY,
      options: [
        { value: EMPTY_CATEGORY, label: t('allCategories') },
        { value: 'Meals', label: 'Meals' },
        { value: 'Bakery', label: 'Bakery' },
        { value: 'Snacks', label: 'Snacks' },
        { value: 'Drinks', label: 'Drinks' },
      ],
    },
    {
      name: 'dateRange',
      label: t('submittedDate'),
      type: 'date-range',
      icon: CalendarDays,
      minWidth: '200px',
    },
  ]

  return (
    <CustomFilter<ProductApprovalFilterForm>
      title={t('filters')}
      filters={filterConfig}
      defaultValues={defaultValues}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
    />
  )
}

export default ProductApprovalFilters
