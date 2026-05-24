import { useTranslation } from 'react-i18next';
import { paymentsData } from '@/data/payments.data';
import { PaymentFilters, IFilterForm } from '@/components/payments/PaymentFilters';
import { PaymentsTable } from '@/components/payments/PaymentsTable';
import { DollarSign, ListOrdered, XCircle, CreditCard, FilterX } from 'lucide-react';
import PageHeader from '@/components/shared/headers/PageHeader';
import StatCard from '@/components/shared/cards/StatCard';
import { images } from '@/constants/images';
import { useFilters } from '@/hooks/useFilter';
import { OrderPayment } from '@/types/payment.types';
import { EmptyState } from '@/components/shared/states';

export default function PaymentsMonitoringPage() {
  const { t } = useTranslation('payments');
  
  const filterConfig = [
    {
      key: 'search',
      label: t('filters.search'),
      type: 'search' as const,
      getValue: (payment: OrderPayment) => [
        payment.order_number,
        payment.customer.name,
        payment.customer.email,
      ],
    },
    {
      key: 'method',
      label: t('filters.paymentMethod'),
      type: 'select' as const,
      getValue: (payment: OrderPayment) => payment.payment_method,
    },
    {
      key: 'status',
      label: t('filters.paymentStatus'),
      type: 'select' as const,
      getValue: (payment: OrderPayment) => payment.payment_status,
    },
    {
      key: 'dateRange',
      label: t('filters.dateRange'),
      type: 'range' as const,
      getValue: (payment: OrderPayment) => new Date(payment.created_at).getTime(),
    },
  ];

  const {
    filtersForForm,
    filteredData,
    applyFilters,
    resetFilters,
    hasActiveFilters,
  } = useFilters({
    data: paymentsData,
    config: filterConfig,
    syncWithURL: true,
  });

  const filteredPayments = filteredData as OrderPayment[];

  const totalOrders = paymentsData.length;
  const paidOrders = paymentsData.filter(p => p.payment_status === 'paid').length;
  const failedPayments = paymentsData.filter(p => p.payment_status === 'failed').length;
  const cashOrders = paymentsData.filter(p => p.payment_method === 'cash').length;

  const handleFormFilterChange = (formValues: IFilterForm) => {
    applyFilters(formValues as Record<string, any>);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen">
      <PageHeader
        title={t('title')}
        description={t('description')}
        image={{ src: images.payments, alt: t('title') }}
      />
      
      {/* Stats Grid - Responsive */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4 sm:my-6 md:my-8">
        <StatCard label={t('stats.totalOrders')} value={totalOrders} icon={<ListOrdered />} sub="sub" />
        <StatCard label={t('stats.paidOrders')} value={paidOrders} icon={<DollarSign />} sub="paid" />
        <StatCard label={t('stats.failedPayments')} value={failedPayments} icon={<XCircle />} sub="failed" />
        <StatCard label={t('stats.cashOrders')} value={cashOrders} icon={<CreditCard />} sub="cash" />
      </div>

      <PaymentFilters
        onApplyFilters={handleFormFilterChange}
        onResetFilters={resetFilters}
        initialFilters={filtersForForm as Partial<IFilterForm>}
      />

      <div className="bg-card mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg shadow overflow-x-auto">
        {filteredPayments.length > 0 ? (
          <PaymentsTable payments={filteredPayments} />
        ) : hasActiveFilters ? (
          <EmptyState
            title={t('emptyStates.noResults')}
            description={t('emptyStates.noResultsDescription')}
            imageUrl={images.emptyPayments}
            primaryAction={{
              label: t('filters.clearAll'),
              onClick: resetFilters,
              icon: FilterX,
            }}
          />
        ) : (
          <EmptyState
            title={t('emptyStates.noPayments')}
            description={t('emptyStates.noPaymentsDescription')}
            imageUrl={images.emptyPayments}
          />
        )}
      </div>
    </div>
  );
}