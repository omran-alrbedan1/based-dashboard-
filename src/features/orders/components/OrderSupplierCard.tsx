import { Building2, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { OrderSupplier } from '../types/orders.types';
import { useTranslation } from 'react-i18next';

interface Props {
  supplier: OrderSupplier;
}

export default function OrderSupplierCard({ supplier }: Props) {
  const { t } = useTranslation('orders');
  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden p-4 sm:p-5">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4">
        {t('supplierCard.title')}
      </p>

      {/* Supplier identity */}
      <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5">
        {supplier.logo_url ? (
          <img
            src={supplier.logo_url}
            alt={supplier.name}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/20 flex items-center justify-center shadow-sm">
            <Building2 className="text-primary-dark" size={20} />
          </div>
        )}
        <div>
          <p className="font-bold text-sm sm:text-base leading-tight text-text-primary">
            {supplier.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {t('supplierCard.vendor')}
            </span>
            <span className="text-[10px] sm:text-xs text-text-muted font-mono">
              #{supplier.id}
            </span>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className="space-y-4 sm:space-y-5 mt-6 sm:mt-9">
        <a
          href={`tel:${supplier.phone}`}
          className="flex items-center gap-2.5 sm:gap-3 group"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
            <Phone size={12} className="text-primary sm:text-[13px]" />
          </div>
          <span className="text-xs sm:text-sm text-text-secondary">
            {supplier.phone}
          </span>
          <ArrowUpRight size={12} className="text-border group-hover:text-primary ml-auto transition-colors opacity-0 group-hover:opacity-100" />
        </a>

        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin size={12} className="text-primary sm:text-[13px]" />
          </div>
          <span className="text-xs sm:text-sm text-text-muted">
            {supplier.address}
          </span>
        </div>
      </div>
    </div>
  );
}