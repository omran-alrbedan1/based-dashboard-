import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Clock, LogIn, ShoppingBag, AlertTriangle, Shield, KeyRound, UserPlus } from 'lucide-react'
import { EmptyState } from '@/components/shared/states'

interface ActivityEvent {
  id: string
  type: 'login' | 'order' | 'status_change' | 'report' | 'password_reset' | 'account_created'
  label: string
  timestamp: string
}

const MOCK_ACTIVITY: Record<string, ActivityEvent[]> = {
  'u-001': [
    { id: 'a0', type: 'account_created', label: 'Account created', timestamp: '2025-01-15T10:00:00Z' },
    { id: 'a1', type: 'login', label: 'Logged in from Riyadh', timestamp: '2026-06-09T08:30:00Z' },
    { id: 'a2', type: 'order', label: 'Placed order BG-2025-00140', timestamp: '2026-06-09T07:15:00Z' },
    { id: 'a3', type: 'login', label: 'Logged in from mobile app', timestamp: '2026-06-08T14:30:00Z' },
    { id: 'a4', type: 'order', label: 'Order BG-2025-00134 delivered', timestamp: '2026-06-03T11:00:00Z' },
    { id: 'a5', type: 'password_reset', label: 'Password reset requested', timestamp: '2026-05-15T10:00:00Z' },
  ],
  'u-002': [
    { id: 'b0', type: 'account_created', label: 'Account created', timestamp: '2025-03-20T08:00:00Z' },
    { id: 'b1', type: 'login', label: 'Logged in from Cairo', timestamp: '2026-06-08T09:00:00Z' },
    { id: 'b2', type: 'order', label: 'Order BG-2025-00141 delivered', timestamp: '2026-05-27T10:00:00Z' },
  ],
  'u-003': [
    { id: 'c0', type: 'account_created', label: 'Account created', timestamp: '2025-07-01T12:00:00Z' },
    { id: 'c1', type: 'status_change', label: 'Account suspended by admin', timestamp: '2025-11-20T17:00:00Z' },
    { id: 'c2', type: 'order', label: 'Order BG-2025-00142 cancelled', timestamp: '2025-11-15T14:00:00Z' },
    { id: 'c3', type: 'report', label: 'Reported for policy violation', timestamp: '2025-11-10T09:00:00Z' },
  ],
  'u-004': [
    { id: 'd0', type: 'account_created', label: 'Account created', timestamp: '2026-06-09T07:00:00Z' },
  ],
  'u-005': [
    { id: 'e0', type: 'account_created', label: 'Account created', timestamp: '2024-11-01T09:00:00Z' },
    { id: 'e1', type: 'login', label: 'Logged in from Alexandria', timestamp: '2026-06-10T11:00:00Z' },
    { id: 'e2', type: 'order', label: 'Placed order BG-2025-00151', timestamp: '2026-06-10T10:00:00Z' },
    { id: 'e3', type: 'order', label: 'Order BG-2025-00150 delivered', timestamp: '2026-06-08T09:00:00Z' },
    { id: 'e4', type: 'login', label: 'Logged in from mobile app', timestamp: '2026-06-07T20:00:00Z' },
    { id: 'e5', type: 'report', label: 'Reported an issue with delivery', timestamp: '2026-06-05T15:30:00Z' },
  ],
}

const activityIcons: Record<string, React.ElementType> = {
  login: LogIn,
  order: ShoppingBag,
  status_change: Shield,
  report: AlertTriangle,
  password_reset: KeyRound,
  account_created: UserPlus,
}

const activityColors: Record<string, string> = {
  login: 'bg-blue-100 text-blue-600',
  order: 'bg-green-100 text-green-600',
  status_change: 'bg-yellow-100 text-yellow-600',
  report: 'bg-red-100 text-red-600',
  password_reset: 'bg-purple-100 text-purple-600',
  account_created: 'bg-teal-100 text-teal-600',
}

interface UserActivityProps {
  userId: string
}

export const UserActivity: React.FC<UserActivityProps> = ({ userId }) => {
  const { t, i18n } = useTranslation('users')
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setEvents(MOCK_ACTIVITY[userId] || [])
      setLoading(false)
    }, 300)
  }, [userId])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-card border border-border rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <EmptyState
        title={t('activity.noActivity')}
        icon={Clock}
      />
    )
  }

  const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US'

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border" />
        <div className="space-y-0">
          {events.map((event) => {
            const Icon = activityIcons[event.type] || Clock
            const color = activityColors[event.type] || 'bg-gray-100 text-gray-600'
            return (
              <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
                <div className={`relative z-10 mt-0.5 h-10 w-10 rounded-full ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0 pt-1.5">
                  <p className="text-sm font-medium text-text-primary">{event.label}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {new Date(event.timestamp).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
