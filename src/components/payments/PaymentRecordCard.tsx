import { useTranslation } from 'react-i18next';
import { formatDateTime, formatAddress } from '@/lib/formatter';
import { PaymentRecord, Shipping } from '@/types/payment.types';

interface PaymentRecordCardProps {
  record?: PaymentRecord;
  shipping: Shipping;
}

export default function PaymentRecordCard({
  record,
  shipping,
}: PaymentRecordCardProps) {
  const { t } = useTranslation('payments');
  const events = record?.events || [];

  // Map event labels to translation keys
  const getEventTranslationKey = (label: string): string => {
    const mapping: Record<string, string> = {
      'Payment initiated': 'paymentRecord.events.initiated',
      'Processing': 'paymentRecord.events.processing',
      'Payment successful': 'paymentRecord.events.successful',
      'Payment failed': 'paymentRecord.events.failed',
      'Refund processed': 'paymentRecord.events.refunded',
    };
    return mapping[label] || label;
  };

  return (
    <div className="bg-background-card rounded-2xl border border-border p-6 shadow-card">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xs font-medium text-primary uppercase tracking-widest">
          {t('paymentRecord.title')}
        </p>
      </div>

      <div className="relative pl-6 mb-6">
        {/* Vertical connector line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-primary/20" />

        {events.length > 0 ? (
          events.map((event, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              {/* Dot */}
              <div
                className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                  event.completed
                    ? 'bg-primary border-primary'
                    : 'bg-background-card border-primary'
                }`}
              />
              <p className="text-xs text-text-muted mb-0.5">
                {t(getEventTranslationKey(event.label))}
              </p>
              <p className="text-sm font-medium text-text-primary">
                {formatDateTime(event.timestamp)}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-text-muted text-sm">
              {t('paymentRecord.noTimeline')}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-5">
        <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
          {t('paymentRecord.shippingAddress')}
        </p>
        <p className="text-sm text-text-primary font-medium">
          {formatAddress(shipping)}
        </p>
      </div>
    </div>
  );
}