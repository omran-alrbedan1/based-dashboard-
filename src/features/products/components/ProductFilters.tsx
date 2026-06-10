import { Search, Store, Tag, CheckCircle2 } from 'lucide-react'
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter'
import { useTranslation } from 'react-i18next'
import type { DateRange } from 'react-day-picker'

interface ProductFilterForm {
  search: string
  vendor: string
  category: string
  status: string
  dateRange: DateRange | undefined
}

interface ProductFiltersProps {
  onApplyFilters: (values: ProductFilterForm) => void
  onResetFilters: () => void
  isLoading?: boolean
  initialFilters?: Partial<ProductFilterForm>
}

const EMPTY_VENDOR = 'all'
const EMPTY_CATEGORY = 'all'
const EMPTY_STATUS = 'all'

const defaultValues: ProductFilterForm = {
  search: '',
  vendor: EMPTY_VENDOR,
  category: EMPTY_CATEGORY,
  status: EMPTY_STATUS,
  dateRange: undefined,
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onApplyFilters,
  onResetFilters,
  isLoading = false,
  initialFilters,
}) => {
  const { t } = useTranslation('productApproval')

  const filterConfig: FilterField<ProductFilterForm>[] = [
    {
      name: 'search',
      label: t('search'),
      type: 'text',
      placeholder: t('searchPlaceholder'),
      icon: Search,
      minWidth: '180px',
    },
    {
      name: 'vendor',
      label: t('vendor'),
      type: 'select',
      icon: Store,
      minWidth: '140px',
      emptyValue: EMPTY_VENDOR,
      options: [
        { value: EMPTY_VENDOR, label: t('allVendors') },
      ],
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
      name: 'status',
      label: t('status'),
      type: 'select',
      icon: CheckCircle2,
      minWidth: '140px',
      emptyValue: EMPTY_STATUS,
      options: [
        { value: EMPTY_STATUS, label: t('allStatuses') },
        { value: 'Pending', label: t('pending') },
        { value: 'Approved', label: t('approved') },
        { value: 'Rejected', label: t('rejected') },
      ],
    },
    {
      name: 'dateRange',
      label: t('submittedDate'),
      type: 'date-range',
      icon: Search,
      minWidth: '200px',
    },
  ]

  return (
    <CustomFilter<ProductFilterForm>
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

export default ProductFilters
