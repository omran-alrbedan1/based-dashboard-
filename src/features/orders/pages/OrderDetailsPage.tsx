import { RefreshCw, Package, FilterX } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Order } from '../types/orders.types';
import { MOCK_ORDERS } from '../data/orders.data';
import { CustomerInfoCard, OrderDeliveryCard, OrderItemsList, OrderLiveMap, OrderSupplierCard, OrderTimeline } from '../components';
import { formatDateTime } from '@/lib/formatter';
import { useTranslation } from 'react-i18next';
import { OrderStatusBadge } from '@/components/shared/badges';
import PageHeader from '@/components/shared/headers/PageHeader';
import { EmptyState } from '@/components/shared/states';
import { useState } from 'react';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('orders');

  const [order, setOrder] = useState<Order | undefined>(
    MOCK_ORDERS.find((o) => o.id === Number(id))
  );

  if (!order) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-background overflow-x-clip min-h-screen">
        <PageHeader
          title={t('orderDetailsPage.notFound.title')}
          description={t('orderDetailsPage.notFound.description')}
          showBackButton
          backButtonLabel={t('orderDetailsPage.emptyState.backToOrders')}
          onBackClick={() => navigate('/orders')}
        />
        <EmptyState
          title={t('orderDetailsPage.emptyState.title')}
          description={t('orderDetailsPage.emptyState.description')}
          icon={Package}
          primaryAction={{
            label: t('orderDetailsPage.emptyState.backToOrders'),
            onClick: () => navigate('/orders'),
            icon: FilterX
          }}
        />
      </div>
    );
  }

  return (
    // Fixed: Removed all padding on mobile, added only on sm and above
    <div className="bg-background min-h-screen">
      <div className="px-0 sm:px-4 md:px-6 lg:px-8">
        <PageHeader
          title={t('orderDetailsPage.pageTitle', { orderNumber: order.order_number })}
          description={t('orderDetailsPage.pageDescription', {
            customerName: order.customer.name,
            createdAt: formatDateTime(order.created_at)
          })}
          showBackButton
          backButtonLabel={t('orderDetailsPage.emptyState.backToOrders')}
          onBackClick={() => navigate('/orders')}
          rightContent={
            <div className="flex items-center gap-2">
              <OrderStatusBadge status={order.status} variant="soft" size="md" />
              <button
                onClick={() => {/* refetch logic */}}
                className="p-2 rounded-lg border border-primary/20 hover:bg-primary/10 text-primary transition-colors"
                title={t('orderDetailsPage.refreshButton')}
              >
                <RefreshCw size={15} />
              </button>
            </div>
          }
        />

        {/* Main Grid - Responsive */}
        <div className="grid gap-4 lg:grid-cols-3 mt-4">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4">
            <OrderTimeline events={order.timeline} />
            <OrderItemsList order={order} />
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <OrderSupplierCard supplier={order.supplier} />
            <OrderDeliveryCard delivery={order.delivery} />
            <CustomerInfoCard order={order} />
          </div>
        </div>

        {/* Live Map - Only shows when on delivery */}
        {order.status === 'on_delivery' && (
          <div className="mt-4">
            <OrderLiveMap
              orderId={order.id}
              isOnDelivery={true}
              liveLocation={order.delivery.live_location ?? undefined}
              apiStatus={order.delivery.api_status}
              customerLocation={{
                lat: 24.7136,
                lng: 46.6753,
                address: order.customer.delivery_address
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}