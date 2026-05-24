import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Customer } from '@/types/payment.types';

interface CustomerInfoCardProps {
  customer: Customer;
}

const ContactRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-b-0">
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
      <span className="text-primary">{icon}</span>
    </div>
    <div>
      <p className="text-[11px] text-text-muted">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  </div>
);

export default function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
  const { t } = useTranslation('payments');
  
  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-background-card rounded-2xl border border-border p-6 shadow-card">
      <p className="text-xs font-medium text-primary uppercase tracking-widest mb-5">
        {t('customerInfo.title')}
      </p>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-medium text-text-on-primary mb-3">
          {initials}
        </div>
        <p className="text-base font-medium text-text-primary">{customer.name}</p>
        <p className="text-xs text-primary mt-0.5">{customer.email}</p>
      </div>

      {/* Stats */}
      {(customer.total_orders !== undefined ||
        customer.lifetime_value !== undefined) && (
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {customer.total_orders !== undefined && (
            <div className="bg-primary/10 rounded-xl p-3 text-center">
              <p className="text-xl font-medium text-primary">
                {customer.total_orders}
              </p>
              <p className="text-[11px] text-primary mt-0.5">{t('customerInfo.totalOrders')}</p>
            </div>
          )}
          {customer.lifetime_value !== undefined && (
            <div className="bg-primary/10 rounded-xl p-3 text-center">
              <p className="text-xl font-medium text-primary">
                ${(customer.lifetime_value / 1000).toFixed(1)}k
              </p>
              <p className="text-[11px] text-primary mt-0.5">{t('customerInfo.lifetimeValue')}</p>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-border pt-4">
        <ContactRow
          icon={<Mail size={14} />}
          label={t('customerInfo.email')}
          value={customer.email}
        />
        {customer.phone && (
          <ContactRow
            icon={<Phone size={14} />}
            label={t('customerInfo.phone')}
            value={customer.phone}
          />
        )}
        {customer.location && (
          <ContactRow
            icon={<MapPin size={14} />}
            label={t('customerInfo.location')}
            value={customer.location}
          />
        )}
        {customer.member_since && (
          <ContactRow
            icon={<Calendar size={14} />}
            label={t('customerInfo.memberSince')}
            value={customer.member_since}
          />
        )}
      </div>
    </div>
  );
}