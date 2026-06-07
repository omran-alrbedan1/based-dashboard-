import { useTranslation } from 'react-i18next'
import { Package, Star, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import type { DriverStats } from '../types/drivers.types'

interface DriverStatsCardsProps {
  stats: DriverStats | null
  loading?: boolean
}

const DriverStatsCards: React.FC<DriverStatsCardsProps> = ({ stats, loading }) => {
  const { t, i18n } = useTranslation('drivers')
  const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US'

  const STATS_CONFIG = [
    {
      key: 'total_orders',
      labelKey: 'stats.totalOrders',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      format: (value?: number) => value?.toLocaleString(locale) ?? '—',
    },
    {
      key: 'completed_orders',
      labelKey: 'stats.completedOrders',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      format: (value?: number) => value?.toLocaleString(locale) ?? '—',
    },
    {
      key: 'cancelled_orders',
      labelKey: 'stats.cancelledOrders',
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-100',
      format: (value?: number) => value?.toLocaleString(locale) ?? '—',
    },
    {
      key: 'avg_rating',
      labelKey: 'stats.avgRating',
      icon: Star,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      format: (value?: number) => (value ? `${value.toFixed(1)} / 5` : '—'),
    },
    {
      key: 'delivery_rate',
      labelKey: 'stats.deliveryRate',
      icon: TrendingUp,
      color: 'text-primary',
      bg: 'bg-primary/10',
      format: (value?: number) => (value ? `${value.toFixed(1)}%` : '—'),
    },
    {
      key: 'avg_delivery_time',
      labelKey: 'stats.avgDeliveryTime',
      icon: Clock,
      color: 'text-amber-800',
      bg: 'bg-amber-100',
      format: (value?: number) => (value ? `${value} ${i18n.language === 'ar' ? 'دقيقة' : 'min'}` : '—'),
    },
  ]

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-28 rounded-3xl bg-background" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {STATS_CONFIG.map(({ key, labelKey, icon: Icon, color, bg, format }) => (
        <div key={key} className="rounded-3xl border border-border bg-background-card p-5 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-text-secondary">{t(labelKey)}</p>
              <p className="mt-3 text-2xl font-semibold text-text-primary">{format((stats as any)?.[key])}</p>
            </div>
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${color}`}>
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DriverStatsCards
