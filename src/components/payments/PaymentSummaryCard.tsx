import React from 'react';
import { useTranslation } from 'react-i18next';
import { OrderPayment, PaymentStatus } from '@/types/payment.types';
import { formatCurrency, formatDateTime } from '@/lib/formatter';
import { PaymentMethodBadge } from '../shared/badges';
import { Hash, Wallet, Calendar } from 'lucide-react';

interface PaymentSummaryCardProps {
  payment: OrderPayment;
}

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-border last:border-b-0">
    <span className="flex items-center gap-2 text-sm text-text-muted">
      <span className="text-primary">{icon}</span>
      {label}
    </span>
    <span className="text-sm font-medium text-text-primary">{value}</span>
  </div>
);

export default function PaymentSummaryCard({
  payment,
}: PaymentSummaryCardProps) {
  const { t } = useTranslation('payments');
  const isPaid = payment.payment_status === PaymentStatus.Paid;

  const getStatusText = () => {
    const statusMap: Record<PaymentStatus, string> = {
      [PaymentStatus.Pending]: t('status.pending'),
      [PaymentStatus.Paid]: t('status.paid'),
      [PaymentStatus.Failed]: t('status.failed'),
      [PaymentStatus.Refunded]: t('status.refunded'),
    };
    return statusMap[payment.payment_status] || payment.payment_status;
  };

  return (
    <div className="bg-background-card rounded-2xl border border-border p-6 shadow-card">
      <p className="text-xs font-medium text-primary uppercase tracking-widest mb-5">
        {t('paymentSummary.title')}
      </p>

      {/* Amount hero */}
      <div className="bg-gradient-primary rounded-xl p-5 mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-white font-medium mb-1">
            {t('paymentSummary.totalAmount')}
          </p>
          <p className="text-4xl font-medium text-text-on-primary leading-none">
            {formatCurrency(payment.total, payment.currency)}
          </p>
          <p className="text-sm text-white mt-2">
            {payment.currency} · {formatDateTime(payment.created_at)}
          </p>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2 text-right">
          <p className="text-[11px] text-white">{t('paymentSummary.orderRef')}</p>
          <p className="text-sm font-medium text-gray-200">
            {payment.order_number}
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full ${
            isPaid
              ? 'bg-primary/20 text-primary-dark'
              : 'bg-secondary/20 text-secondary-dark'
          }`}
        >
          {isPaid ? '✓' : '⏳'} {getStatusText()}
        </span>
      </div>

      {/* Info rows */}
      <InfoRow
        icon={<Hash size={14} />}
        label={t('paymentSummary.orderNumber')}
        value={payment.order_number}
      />
      <InfoRow
        icon={<Wallet size={14} />}
        label={t('paymentSummary.paymentMethod')}
        value={<PaymentMethodBadge method={payment.payment_method} />}
      />
      <InfoRow
        icon={<Calendar size={14} />}
        label={t('paymentSummary.date')}
        value={formatDateTime(payment.created_at)}
      />
    </div>
  );
}