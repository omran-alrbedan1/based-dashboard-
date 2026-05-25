import { Search, Package, Clock, CheckCircle, XCircle, MapPin, Truck, AlertCircle, Calendar } from 'lucide-react';
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter';
import { OrderStatusBadge } from '@/components/shared/badges';
import { EMPTY_STATUS, IOrderFilterForm, ORDER_FILTERS_DEFAULT, OrderStatus } from '../types/orders.types';
import { useTranslation } from 'react-i18next';

interface OrderFiltersProps {
  onApplyFilters: (filters: IOrderFilterForm) => void;
  onResetFilters: () => void;
  isLoading?: boolean;
  initialFilters?: Partial<IOrderFilterForm>;
}

export function OrderFilters({
  onApplyFilters,
  onResetFilters,
  isLoading,
  initialFilters,
}: OrderFiltersProps) {
  const { t } = useTranslation('orders'); 

  const orderFiltersConfig: FilterField<IOrderFilterForm>[] = [
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
      icon: Package,
      minWidth: '150px',
      emptyValue: EMPTY_STATUS,
      options: [
        { value: EMPTY_STATUS, label: t('filters.status.options.all'), icon: AlertCircle }, 
        { value: 'pending', label: t('filters.status.options.pending'), icon: Clock }, 
        { value: 'accepted', label: t('filters.status.options.accepted'), icon: CheckCircle }, 
        { value: 'preparing', label: t('filters.status.options.preparing'), icon: Package }, 
        { value: 'on_delivery', label: t('filters.status.options.on_delivery'), icon: Truck }, 
        { value: 'delivered', label: t('filters.status.options.delivered'), icon: MapPin }, 
        { value: 'cancelled', label: t('filters.status.options.cancelled'), icon: XCircle }, 
      ],
      renderBadge: (value, clear) => {
        if (!value || value === EMPTY_STATUS) return null;
        return (
          <OrderStatusBadge 
            status={value as OrderStatus}
            onRemove={clear}
            size="sm"
          />
        );
      },
    },
    {
      name: 'dateRange',
      label: t('filters.dateRange.label'),
      type: 'date-range',
      icon: Calendar,
      minWidth: '180px',
    },
  ];

  return (
    <CustomFilter<IOrderFilterForm> 
      title={t('filters.title')} 
      filters={orderFiltersConfig}
      defaultValues={ORDER_FILTERS_DEFAULT}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
    />
  );
}