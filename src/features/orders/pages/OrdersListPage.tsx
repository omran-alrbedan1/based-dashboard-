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
import { OrderFilters } from '../components/OrdersFilters';

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

  const { filteredData, applyFilters, filtersForForm, hasActiveFilters, resetFilters } = useFilters({
    data: orders,
    config: ordersFilterConfig,
    syncWithURL: true,
  });

  const handleFormFilterChange = (formValues: IOrderFilterForm) => {
    applyFilters(formValues as Record<string, any>);
  };

  const filteredOrders = filteredData as Order[];

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader
        title={t('ordersListPage.pageTitle')}
        description={t('ordersListPage.pageDescription', { 
          filteredCount: filteredOrders.length, 
          totalCount: paginationMeta.total 
        })}
        image={{ src: images.orders, alt: 'Orders', className: 'h-6 sm:h-8' }}
      />

      {/* Stats Grid - Responsive */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4 sm:my-6 lg:my-8">
        <StatCard
          label={t('ordersListPage.statCards.totalOrders.label')}
          value={paginationMeta.total}
          sub={t('ordersListPage.statCards.totalOrders.sub')}
          icon={<ListOrdered size={18} className="sm:text-[20px]" />}
        />
        <StatCard
          label={t('ordersListPage.statCards.pending.label')}
          value={pendingOrders}
          sub={t('ordersListPage.statCards.pending.sub')}
          icon={<Clock size={18} className="sm:text-[20px]" />}
        />
        <StatCard
          label={t('ordersListPage.statCards.delivered.label')}
          value={deliveredOrders}
          sub={t('ordersListPage.statCards.delivered.sub')}
          icon={<CheckCircle size={18} className="sm:text-[20px]" />}
        />
        <StatCard
          label={t('ordersListPage.statCards.cancelled.label')}
          value={cancelledOrders}
          sub={t('ordersListPage.statCards.cancelled.sub')}
          icon={<XCircle size={18} className="sm:text-[20px]" />}
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
          <div className="p-8 sm:p-12 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('ordersListPage.emptyState.noOrdersFoundTitle')}
                description={t('ordersListPage.emptyState.noOrdersFoundDescription')}
                imageUrl={images.emptyOrders}
                primaryAction={{
                  label: t('ordersListPage.emptyState.clearFilters'),
                  onClick: resetFilters,
                  icon: FilterX,
                }}
              />
            ) : (
              <EmptyState
                title={t('ordersListPage.emptyState.noOrdersToShowTitle')}
                description={t('ordersListPage.emptyState.noOrdersToShowDescription')}
                imageUrl={images.emptyOrders}
              />
            )}
          </div>
        ) : (
          <OrdersTable orders={filteredOrders} />
        )}
      </div>
    </div>
  );
}