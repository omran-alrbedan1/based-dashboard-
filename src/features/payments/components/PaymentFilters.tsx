import type { DateRange } from 'react-day-picker';
import { Search, CreditCard, AlertCircle, Calendar, Wallet, Landmark, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PaymentMethodBadge, PaymentStatusBadge } from '@/components/shared/badges';
import { CustomFilter, FilterField } from '@/components/shared/custom/CustomFilter';

export interface IFilterForm {
  search: string;
  method: string;
  status: string;
  dateRange?: DateRange;
}

interface PaymentFiltersProps {
  onApplyFilters: (filters: IFilterForm) => void;
  onResetFilters: () => void;
  isLoading?: boolean;
  initialFilters?: Partial<IFilterForm>;
}

const EMPTY_METHOD = 'all';
const EMPTY_STATUS = 'all';

export const PAYMENT_FILTERS_DEFAULT: IFilterForm = {
  search: '',
  method: EMPTY_METHOD,
  status: EMPTY_STATUS,
  dateRange: undefined,
};

export function PaymentFilters({
  onApplyFilters,
  onResetFilters,
  isLoading,
  initialFilters,
}: PaymentFiltersProps) {
  const { t } = useTranslation('payments');

  const paymentFiltersConfig: FilterField<IFilterForm>[] = [
    {
      name: 'search',
      label: t('filters.search'),
      type: 'text',
      placeholder: t('filters.searchPlaceholder'),
      icon: Search,
      minWidth: '160px',
      getDisplayValue: (value) =>
        typeof value === 'string' && value.length > 20
          ? `${value.slice(0, 20)}…`
          : (value as string),
    },
    {
      name: 'method',
      label: t('filters.paymentMethod'),
      type: 'select',
      icon: CreditCard,
      minWidth: '130px',
      emptyValue: EMPTY_METHOD,
      options: [
        { value: EMPTY_METHOD, label: t('filters.allMethods'), icon: CreditCard },
        { value: 'cash', label: t('filters.cash'), icon: Wallet },
        { value: 'online', label: t('filters.online'), icon: Landmark },
      ],
      renderBadge: (value, clear) => {
        if (!value || value === EMPTY_METHOD) return null;
        return <PaymentMethodBadge method={value as 'cash' | 'online'} onRemove={clear} />;
      },
    },
    {
      name: 'status',
      label: t('filters.paymentStatus'),
      type: 'select',
      icon: AlertCircle,
      minWidth: '130px',
      emptyValue: EMPTY_STATUS,
      options: [
        { value: EMPTY_STATUS, label: t('filters.allStatuses'), icon: AlertCircle },
        { value: 'pending', label: t('filters.pending'), icon: Clock },
        { value: 'paid', label: t('filters.paid'), icon: CheckCircle },
        { value: 'failed', label: t('filters.failed'), icon: XCircle },
        { value: 'refunded', label: t('filters.refunded'), icon: RefreshCw },
      ],
      renderBadge: (value, clear) => {
        if (!value || value === EMPTY_STATUS) return null;
        return (
          <PaymentStatusBadge
            status={value as 'pending' | 'paid' | 'failed' | 'refunded'}
            onRemove={clear}
            variant="soft"
          />
        );
      },
    },
    {
      name: 'dateRange',
      label: t('filters.dateRange'),
      type: 'date-range',
      icon: Calendar,
      minWidth: '180px',
    },
  ];

  return (
    <CustomFilter<IFilterForm>
      title={t('filters.title')}
      filters={paymentFiltersConfig}
      defaultValues={PAYMENT_FILTERS_DEFAULT}
      onApplyFilters={onApplyFilters}
      onResetFilters={onResetFilters}
      isLoading={isLoading}
      initialFilters={initialFilters}
    />
  );
}