import { useTranslation } from 'react-i18next'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  CreditCard,
  Activity,
  Edit,
  Globe,
  Shield,
  AlertTriangle,
  Ban,
  Lock,
  CircleDot,
} from 'lucide-react'
import StatusBadge from '@/components/shared/badges/StatusBadge'
import { Button } from '@/components/ui/button'
import { MetricStatusCard } from '@/components/shared/cards/MetricCard'
import type { User } from '../types/users.types'

interface UserOverviewProps {
  user: User
  onUpdate?: () => void
}

export const UserOverview: React.FC<UserOverviewProps> = ({ user, onUpdate }) => {
  const { t, i18n } = useTranslation('users')

  const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 w-full">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-2xl font-bold text-primary">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-text-primary">{user.name}</h1>
            </div>
            <p className="text-sm text-text-secondary mt-0.5">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge status={user.status} variant="pill" size="sm" />
            </div>
          </div>
          {onUpdate && (
            <Button variant="outline" size="sm" onClick={onUpdate} className="gap-2 shrink-0">
              <Edit className="h-4 w-4" />
              {t('details.overview.update')}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricStatusCard title={t('details.overview.totalOrders')} value={user.totalOrders || 0} icon={ShoppingBag} />
        <MetricStatusCard title={t('details.overview.totalSpent')} value={user.totalSpent.toFixed(2)} icon={CreditCard} suffix=" USD" />
        <MetricStatusCard title={t('details.overview.totalReports')} value={user.total_reports} icon={AlertTriangle} />
        <MetricStatusCard title={t('details.overview.totalRefunds')} value={user.total_refunds} icon={Ban} />
      </div>

      <div className="rounded-2xl border border-border bg-background-card overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="md:w-[340px] bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-8 flex flex-col items-center justify-center border-r border-border">
            <div className="h-28 w-28 rounded-full bg-linear-to-br from-primary to-primary/70 p-1">
              <div className="h-full w-full rounded-full bg-background-card flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-text-primary text-center">{user.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge status={user.status} variant="pill" size="sm" />
              {user.is_banned_from_community && (
                <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full">
                  Banned
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <InfoItem icon={<Mail />} label={t('details.overview.email')} value={user.email} />
              <InfoItem icon={<Phone />} label={t('details.overview.phone')} value={user.phone || '-'} />
              <InfoItem icon={<MapPin />} label={t('details.overview.location')} value={`${user.city}, ${user.country}`} />
              <InfoItem icon={<Calendar />} label={t('details.overview.joinedAt')} value={new Date(user.joinedAt).toLocaleDateString(locale)} />
              <InfoItem icon={<Activity />} label={t('details.overview.lastActive')} value={new Date(user.lastActiveAt).toLocaleDateString(locale)} />
              {user.date_of_birth && (
                <InfoItem icon={<Calendar />} label={t('details.overview.dateOfBirth')} value={new Date(user.date_of_birth).toLocaleDateString(locale)} />
              )}
              <InfoItem icon={<Shield />} label={t('details.overview.emailVerified')} value={user.email_verified_at ? new Date(user.email_verified_at).toLocaleDateString(locale) : 'No'} />
              <InfoItem icon={<Lock />} label={t('details.overview.phoneVerified')} value={user.phone_verified_at ? new Date(user.phone_verified_at).toLocaleDateString(locale) : 'No'} />
              {user.last_login_ip && (
                <InfoItem icon={<Globe />} label={t('details.overview.lastLoginIp')} value={user.last_login_ip} />
              )}
              <InfoItem icon={<CircleDot />} label={t('details.overview.communityBanned')} value={user.is_banned_from_community ? 'Yes' : 'No'} />
            </div>
            {user.notes && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium uppercase tracking-wider">Notes</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-1">{user.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-primary/10 p-2.5 text-primary shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-text-primary mt-0.5 truncate">{value}</p>
      </div>
    </div>
  )
}
