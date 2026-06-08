import { Search, Store, Filter, AlertCircle, UtensilsCrossed, ShoppingBag, Package } from 'lucide-react'
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter'
import { useTranslation } from 'react-i18next'
import type { VendorFilterForm, VendorFiltersProps } from '../types/vendors.types'
import { EMPTY_STATUS, EMPTY_TYPE, VENDOR_FILTERS_DEFAULT } from '../types/vendors.types'

const VendorFilters = ({
  onApplyFilters,
  onResetFilters,
  isLoading,
  initialFilters,
}: VendorFiltersProps) => {
  const { t } = useTranslation('vendors')

  const vendorFilterConfig: FilterField<VendorFilterForm>[] = [
    {
      name: 'search',
      label: t('filters.searchPlaceholder'),
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
        { value: EMPTY_STATUS, label: t('filters.allStatuses'), icon: AlertCircle },
        { value: 'pending', label: t('status.pending') },
        { value: 'approved', label: t('status.approved') },
        { value: 'rejected', label: t('status.rejected') },
      ],
    },
    {
      name: 'type',
      label: t('filters.typeLabel'),
      type: 'select',
      icon: Store,
      minWidth: '150px',
      emptyValue: EMPTY_TYPE,
      options: [
        { value: EMPTY_TYPE, label: t('filters.allTypes'), icon: AlertCircle },
        { value: 'restaurant', label: t('type.restaurant'), icon: UtensilsCrossed },
        { value: 'store', label: t('type.store'), icon: ShoppingBag },
        { value: 'supplier', label: t('type.supplier'), icon: Package },
      ],
    },
  ]

  return (
    <CustomFilter<VendorFilterForm>
      title={t('filters.applyFilters')}
      filters={vendorFilterConfig}
      defaultValues={VENDOR_FILTERS_DEFAULT}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
    />
  )
}

export default VendorFilters
