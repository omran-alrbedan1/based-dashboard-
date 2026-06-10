import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CreditCard } from 'lucide-react'
import { PaymentsTable } from '@/features/payments/components/PaymentsTable'
import { EmptyState } from '@/components/shared/states'
import type { OrderPayment } from '@/features/payments/types/payment.types'
import { usersService } from '../services/users.service'

interface UserPaymentsListProps {
  userId: string
}

export const UserPaymentsList: React.FC<UserPaymentsListProps> = ({ userId }) => {
  const { t } = useTranslation('users')
  const [payments, setPayments] = useState<OrderPayment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    usersService.getPayments(userId)
      .then(setPayments)
      .catch(() => setPayments([]))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-card border border-border rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (payments.length === 0) {
    return (
      <EmptyState
        title={t('details.payments.noPayments')}
        icon={CreditCard}
      />
    )
  }

  return <PaymentsTable payments={payments} />
}
