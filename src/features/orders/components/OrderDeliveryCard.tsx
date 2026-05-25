import { Truck, User, Clock, ExternalLink, Phone } from 'lucide-react';
import { DeliveryInfo } from '../types/orders.types';
import { formatDateTime, formatETA } from '@/lib/formatter';
import { useTranslation } from 'react-i18next';

interface Props {
  delivery: DeliveryInfo;
}

export default function OrderDeliveryCard({ delivery }: Props) {
  const { t } = useTranslation('orders');

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
      <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">
            {t('deliveryCard.title')}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
        {/* ETA */}
        {delivery.eta && (
          <div className="relative overflow-hidden rounded-xl bg-gradient-forest py-6 sm:py-8 px-3 sm:p-4 text-white">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/5 -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 translate-y-6 -translate-x-6" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-white/60 text-[10px] sm:text-xs font-medium mb-1">
                  {t('deliveryCard.eta')}
                </p>
                <p className="text-xl sm:text-2xl font-bold tracking-tight">
                  {formatETA(delivery.eta)}
                </p>
                <p className="text-white/50 text-[10px] sm:text-xs mt-1">
                  {formatDateTime(delivery.eta)}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Clock size={18} className="text-white sm:text-[22px]" />
              </div>
            </div>
          </div>
        )}

        {/* Driver card */}
        {delivery.driver ? (
          <div className="rounded-xl border border-border p-3 sm:p-4">
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2 sm:mb-3">
              {t('deliveryCard.driver')}
            </p>
            <div className="flex items-center gap-2.5 sm:gap-3">
              {delivery.driver.photo_url ? (
                <img
                  src={delivery.driver.photo_url}
                  alt={delivery.driver.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-primary/50 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-mist flex items-center justify-center shrink-0 ring-2 ring-primary/10">
                  <User size={18} className="text-primary sm:text-[20px]" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-text-primary">
                    {delivery.driver.name}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1.5 text-[11px] sm:text-xs text-text-muted">
                  <div className="flex items-center gap-1">
                    <Phone size={11} />
                    <span>{delivery.driver.phone}</span>
                  </div>
                  <span className="hidden sm:inline text-border">|</span>
                  <span className="font-mono bg-gradient-mist text-text-secondary px-1.5 py-0.5 rounded text-[10px]">
                    {delivery.driver.vehicle_plate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : delivery.api_status !== 'failed' ? (
          <div className="rounded-xl border border-dashed border-border p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-mist flex items-center justify-center shrink-0">
              <User size={14} className="text-text-muted sm:text-[16px]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-text-primary">
                {t('deliveryCard.driverNotAssigned')}
              </p>
              <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">
                {t('deliveryCard.driverAssignmentInfo')}
              </p>
            </div>
          </div>
        ) : null}

        {/* Delivery Company */}
        <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-primary/10">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 shadow-sm">
            <Truck size={14} className="text-primary sm:text-[16px]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wide">
              {t('deliveryCard.carrier')}
            </p>
            <p className="text-sm font-semibold text-text-primary leading-tight">
              {delivery.company.name}
            </p>
            {delivery.company.tracking_number && (
              <p className="text-[10px] sm:text-[11px] text-text-muted font-mono mt-0.5">
                #{delivery.company.tracking_number}
              </p>
            )}
          </div>
          {delivery.company.tracking_url && (
            <a
              href={delivery.company.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary font-semibold bg-gradient-mist hover:bg-primary/20 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-colors shrink-0"
            >
              {t('deliveryCard.track')} <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}