import { Search, Package, Filter, AlertCircle, Clock, CheckCircle, XCircle, MapPin, Truck, Calendar } from 'lucide-react';
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter';
import { useTranslation } from 'react-i18next';
import type { IOrderFilterForm } from '../types/orders.types';
import { EMPTY_STATUS, ORDER_FILTERS_DEFAULT } from '../types/orders.types';

interface OrderFiltersProps {
  onApplyFilters: (filters: IOrderFilterForm) => void;
  onResetFilters: () => void;
  isLoading?: boolean;
  initialFilters?: Partial<IOrderFilterForm>;
}

const OrderFilters = ({
  onApplyFilters,
  onResetFilters,
  isLoading,
  initialFilters,
}: OrderFiltersProps) => {
  const { t } = useTranslation('orders');

  const orderFiltersConfig: FilterField<IOrderFilterForm>[] = [
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
        { value: 'pending', label: t('status.pending'), icon: Clock },
        { value: 'accepted', label: t('status.accepted'), icon: CheckCircle },
        { value: 'preparing', label: t('status.preparing'), icon: Package },
        { value: 'on_delivery', label: t('status.on_delivery'), icon: Truck },
        { value: 'delivered', label: t('status.delivered'), icon: MapPin },
        { value: 'cancelled', label: t('status.cancelled'), icon: XCircle },
      ],
    },
    {
      name: 'dateRange',
      label: t('filters.dateRangeLabel'),
      type: 'date-range',
      icon: Calendar,
      minWidth: '180px',
    },
  ];

  return (
    <CustomFilter<IOrderFilterForm>
      title={t('filters.applyFilters')}
      filters={orderFiltersConfig}
      defaultValues={ORDER_FILTERS_DEFAULT}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
    />
  );
};

export default OrderFilters;