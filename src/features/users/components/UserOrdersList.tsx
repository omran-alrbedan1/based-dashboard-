import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Package } from 'lucide-react'
import { OrdersTable } from '@/features/orders/components/OrdersTable'
import { EmptyState } from '@/components/shared/states'
import type { Order } from '@/features/orders/types/orders.types'
import { usersService } from '../services/users.service'

interface UserOrdersListProps {
  userId: string
}

export const UserOrdersList: React.FC<UserOrdersListProps> = ({ userId }) => {
  const { t } = useTranslation('users')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    usersService.getOrders(userId)
      .then(setOrders)
      .catch(() => setOrders([]))
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

  if (orders.length === 0) {
    return (
      <EmptyState
        title={t('details.orders.noOrders')}
        icon={Package}
      />
    )
  }

  return <OrdersTable orders={orders} loading={loading} />
}
