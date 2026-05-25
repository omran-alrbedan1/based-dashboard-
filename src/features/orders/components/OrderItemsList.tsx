import React from 'react';
import { Package, Receipt, Truck, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/formatter';
import { Order } from '../types/orders.types';
import { useTranslation } from 'react-i18next';

interface OrderItemsListProps {
  order: Order;
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({ order }) => {
  const { t } = useTranslation('orders');
  return (
    <div className="bg-card rounded-2xl border border-border/50 p-4 sm:p-6">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4 sm:mb-5">
        {t('itemsList.title')}
      </p>
      <div className="space-y-3 sm:space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 sm:gap-3.5">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover shrink-0"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-mist flex items-center justify-center shrink-0">
                <Package size={22} className="text-primary sm:text-[25px]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-text-primary truncate">
                {item.product_name}
              </p>
              <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">
                {item.quantity} × {formatCurrency(item.unit_price, order.currency)}
              </p>
            </div>
            <p className="text-sm font-semibold text-text-primary shrink-0">
              {formatCurrency(item.total, order.currency)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-border mt-4 sm:mt-5 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
        <div className="flex justify-between items-center text-xs sm:text-sm text-text-secondary">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Receipt size={14} className="text-primary sm:text-[16px]" />
            <span>{t('itemsList.subtotal')}</span>
          </div>
          <span>{formatCurrency(order.subtotal, order.currency)}</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm text-text-secondary">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Truck size={14} className="text-primary sm:text-[16px]" />
            <span>{t('itemsList.deliveryFee')}</span>
          </div>
          <span>{formatCurrency(order.delivery_fee, order.currency)}</span>
        </div>
        <div className="flex justify-between items-center text-sm sm:text-base font-bold text-text-primary pt-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CreditCard size={16} className="text-primary sm:text-[18px]" />
            <span>{t('itemsList.total')}</span>
          </div>
          <span>{formatCurrency(order.total, order.currency)}</span>
        </div>
      </div>
    </div>
  );
};