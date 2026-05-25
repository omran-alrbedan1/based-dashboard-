import React from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';
import { Order } from '../types/orders.types';
import { useTranslation } from 'react-i18next';

interface CustomerInfoCardProps {
  order: Order;
}

export const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ order }) => {
  const { t } = useTranslation('orders');
  return (
    <div className="bg-card rounded-2xl border border-border/50 p-4 sm:p-5">
      <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-2 sm:mb-3">
        {t('customerCard.title')}
      </p>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-mist flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20 shadow-sm">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-base sm:text-lg font-bold text-text-primary">
              {order.customer.name}
            </p>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
              {t('customerCard.idPrefix')}{order.customer.id}
            </p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 pt-1">
          <div className="flex items-center gap-2.5 sm:gap-3 text-text-secondary">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-mist flex items-center justify-center flex-shrink-0">
              <Phone size={14} className="text-primary sm:text-[16px]" />
            </div>
            <span className="text-xs sm:text-sm">{order.customer.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-text-secondary">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-mist flex items-center justify-center flex-shrink-0">
              <Mail size={14} className="text-primary sm:text-[16px]" />
            </div>
            <span className="truncate text-xs sm:text-sm">{order.customer.email}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-mist flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={14} className="text-primary sm:text-[16px]" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] sm:text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                {t('customerCard.deliveryAddress')}
              </p>
              <p className="text-sm sm:text-base text-text-primary leading-relaxed">
                {order.customer.delivery_address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};