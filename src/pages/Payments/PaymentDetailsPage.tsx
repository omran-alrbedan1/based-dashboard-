import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { paymentsData } from '@/data/payments.data';
import PaymentSummaryCard from '@/components/payments/PaymentSummaryCard';
import CustomerInfoCard from '@/components/payments/CustomerInfoCard';
import PaymentRecordCard from '@/components/payments/PaymentRecordCard';
import { ErrorState } from '@/components/shared/states';
import PageHeader from '@/components/shared/headers/PageHeader';
import { images } from '@/constants/images';

export default function PaymentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('payments');
  
  const payment = paymentsData.find((p) => p.id.toString() === id);

  if (!payment) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <ErrorState
          variant="404"
          title={t('paymentNotFound')}
          description={t('paymentNotFoundDescription', { id })}
          goHome={() => navigate('/payments')}
          showDefaultActions={true}
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 bg-background min-h-screen">
      <PageHeader
        title={`${t('paymentDetails')} #${payment.order_number}`}
        description={t('viewPaymentDetails')}
        image={{
          src: images.payments,
          alt: t('paymentDetails'),
        }}
        showBackButton={true}
        backButtonLabel={t('backToList')}
        onBackClick={() => navigate("/payments")}
      />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <PaymentSummaryCard payment={payment} />
          {payment.payment_record && (
            <PaymentRecordCard 
              record={payment.payment_record} 
              shipping={payment.shipping}
            />
          )}
        </div>
        <div className="lg:col-span-1">
          <CustomerInfoCard customer={payment.customer} />
        </div>
      </div>
    </div>
  );
}