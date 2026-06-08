import { useTranslation } from 'react-i18next'
import { Phone, Mail, Store } from 'lucide-react'
import type { Driver } from '../types/drivers.types'
import DriverStatusBadge from './DriverStatusBadge'

interface DriverCardProps {
  driver: Driver
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  const { t, i18n } = useTranslation('drivers')
  const isAr = i18n.language === 'ar'

  return (
    <div className="rounded-3xl border border-border bg-background-card p-6 shadow-card">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-background text-3xl font-semibold text-text-primary">
            {driver.avatar ? (
              <img src={driver.avatar} alt={driver.name} className="h-20 w-20 rounded-[28px] object-cover" />
            ) : (
              <span>{driver.name?.charAt(0) ?? 'D'}</span>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-lg font-semibold text-text-primary">{driver.name}</div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
              <span>{driver.vehicle_type || t('driverCard.vehicle')}</span>
              <span>·</span>
              <span>{driver.areas?.map((area) => area.name).join(isAr ? '، ' : ', ') || t('driverCard.noAreas')}</span>
            </div>
          </div>
          <DriverStatusBadge status={driver.status} variant="pill" size="md" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 rounded-3xl bg-background p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">{t('driverCard.phone')}</div>
            <div className="text-sm text-text-primary">{driver.phone || '—'}</div>
          </div>
          <div className="space-y-2 rounded-3xl bg-background p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">{t('driverCard.email')}</div>
            <div className="text-sm text-text-primary">{driver.email || '—'}</div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow icon={Phone} label={t('driverCard.phone')} value={driver.phone || '—'} />
          <InfoRow icon={Mail} label={t('driverCard.email')} value={driver.email || '—'} />
        </div>
      </div>
    </div>
  )
}

interface InfoRowProps {
  icon: React.ComponentType<{ size?: number }>
  label: string
  value: string
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value }) => (
  <div className="rounded-3xl bg-background p-4">
    <div className="flex items-center gap-2 text-sm text-text-muted">
      <Icon size={16} />
      <span>{label}</span>
    </div>
    <div className="mt-2 text-sm text-text-primary">{value}</div>
  </div>
)

export default DriverCard
