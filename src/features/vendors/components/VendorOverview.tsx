import { useTranslation } from 'react-i18next'
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  FileCheck,
  AlertCircle,
  Package,
  DollarSign,
  Star,
  ShoppingBag,
} from 'lucide-react'
import { MetricStatusCard } from '@/components/shared/cards/MetricCard'
import type { Vendor } from '../types/vendors.types'

interface VendorOverviewProps {
  vendor: Vendor
}

export const VendorOverview: React.FC<VendorOverviewProps> = ({ vendor }) => {
  const { t } = useTranslation('vendors')

  const stats = [
    { title: t('details.stats.orders'), value: vendor.orders_count, icon: ShoppingBag },
    { title: t('details.stats.revenue'), value: `${vendor.revenue.toFixed(2)}`, icon: DollarSign },
    { title: t('details.stats.rating'), value: vendor.rating || '-', icon: Star },
    { title: t('details.stats.products'), value: vendor.products_count, icon: Package },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <MetricStatusCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-background-card p-6">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <Store className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">{t('details.storeInfo')}</h2>
          </div>
          <dl className="space-y-4">
            <InfoItem label={t('table.storeName')} value={vendor.store_name} />
            <InfoItem label={t('table.ownerName')} value={vendor.owner_name} />
            <InfoItem label={t('table.type')} value={t(`type.${vendor.type}`)} />
            <InfoItem label={t('table.area')} value={vendor.area} />
            <InfoItem
              label={t('table.registeredAt')}
              value={new Date(vendor.registered_at).toLocaleDateString()}
            />
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-background-card p-6">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">{t('details.ownerInfo')}</h2>
          </div>
          <dl className="space-y-4">
            <InfoItem label={t('table.ownerName')} value={vendor.owner_name} />
            <ContactItem
              label={t('table.email')}
              value={vendor.email}
              icon={Mail}
              href={`mailto:${vendor.email}`}
            />
            <ContactItem
              label={t('table.phone')}
              value={vendor.phone}
              icon={Phone}
              href={`tel:${vendor.phone}`}
            />
            <InfoItem label={t('table.area')} value={vendor.area} icon={MapPin} />
          </dl>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background-card p-6">
        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <FileCheck className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">{t('details.certificate')}</h2>
        </div>
        {vendor.gluten_certificate_url ? (
          <a
            href={vendor.gluten_certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            <FileCheck className="h-4 w-4" />
            {t('details.viewCertificate')}
          </a>
        ) : (
          <div className="flex items-center gap-2 text-sm text-warning">
            <AlertCircle className="h-4 w-4" />
            {t('details.certificateNotUploaded')}
          </div>
        )}
      </div>
    </div>
  )
}

function InfoItem({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) {
  return (
    <div className="flex items-center justify-between py-1">
      <dt className="flex items-center gap-2 text-sm text-text-secondary">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </dt>
      <dd className="text-sm font-medium text-text-primary text-end">{value || '-'}</dd>
    </div>
  )
}

function ContactItem({ label, value, icon: Icon, href }: { label: string; value: string; icon: React.ElementType; href: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <dt className="flex items-center gap-2 text-sm text-text-secondary">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="text-sm font-medium text-text-primary text-end" dir="ltr">
        <a href={href} className="hover:text-primary transition-colors">
          {value || '-'}
        </a>
      </dd>
    </div>
  )
}
