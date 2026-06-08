// src/pages/orders/OrdersListPage.tsx
import { useState } from 'react';
import { ListOrdered, Clock, CheckCircle, XCircle, FilterX } from 'lucide-react';
import { Order, IOrderFilterForm } from '../types/orders.types';
import { MOCK_ORDERS } from '../data/orders.data';
import PageHeader from '@/components/shared/headers/PageHeader';
import StatCard from '@/components/shared/cards/StatCard';
import { useTranslation } from 'react-i18next';
import { images } from '@/constants/images';
import { useFilters } from '@/hooks/useFilter';
import { EmptyState } from '@/components/shared/states';
import { OrdersTable } from '../components/OrdersTable';
import { ordersFilterConfig } from '../configs/orders.config';
import OrderFilters from '../components/OrdersFilters';

export default function OrdersListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('orders');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: MOCK_ORDERS.length,
    per_page: 10,
  });

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } = useFilters({
    data: orders,
    config: ordersFilterConfig,
    syncWithURL: true,
  });

  const handleFormFilterChange = (formValues: IOrderFilterForm) => {
    applyFilters(formValues as Record<string, any>);
  };

  const filteredOrders = filteredData as Order[];

  // Stats from orders data
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader
        title={t('ordersListPage.pageTitle')}
        description={t('ordersListPage.pageDescription')}
        image={{ src: images.orders, alt: t('ordersListPage.pageTitle') }}
      />

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4 sm:my-6 lg:my-8">
        <StatCard
          label={t('stats.totalOrders')}
          value={totalOrders}
          sub={t('stats.totalOrdersSub')}
          icon={<ListOrdered className="h-5 w-5" />}
        />
        <StatCard
          label={t('stats.pendingOrders')}
          value={pendingOrders}
          sub={t('stats.pendingOrdersSub')}
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          label={t('stats.deliveredOrders')}
          value={deliveredOrders}
          sub={t('stats.deliveredOrdersSub')}
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <StatCard
          label={t('stats.cancelledOrders')}
          value={cancelledOrders}
          sub={t('stats.cancelledOrdersSub')}
          icon={<XCircle className="h-5 w-5" />}
        />
      </div>

      {/* Filters */}
      <OrderFilters
        onApplyFilters={handleFormFilterChange}
        onResetFilters={resetFilters}
        isLoading={isLoading}
        initialFilters={filtersForForm as Partial<IOrderFilterForm>}
      />

      {/* Orders Table */}
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {isLoading ? (
          <OrdersTable
            orders={[]}
            loading={true}
            pagination={{
              total: 0,
              page: 1,
              lastPage: 1,
            }}
            onPageChange={() => {}}
          />
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('table.noOrders')}
                description={t('ordersListPage.pageDescription')}
                imageUrl={images.emptyOrders}
                primaryAction={{
                  label: t('filters.resetFilters'),
                  onClick: resetFilters,
                  icon: FilterX,
                }}
              />
            ) : (
              <EmptyState
                title={t('table.noOrders')}
                description={t('ordersListPage.pageDescription')}
                imageUrl={images.emptyOrders}
              />
            )}
          </div>
        ) : (
          <OrdersTable
            orders={filteredOrders}
            loading={false}
            pagination={{
              total: paginationMeta.total,
              page: paginationMeta.current_page,
              lastPage: paginationMeta.last_page,
            }}
            onPageChange={(page) => {
              setPaginationMeta(prev => ({ ...prev, current_page: page }));
            }}
          />
        )}
      </div>
    </div>
  );
}