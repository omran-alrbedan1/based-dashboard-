import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Store,
  User,
  Building2,
  MapPin,
  Calendar,
  CircleDot,
  Eye,
  ChevronRight,
} from 'lucide-react'
import { DataTable, type Column } from '@/components/shared/custom/DataTable'
import type { VendorsTableProps, Vendor } from '../types/vendors.types'
import { useTranslation } from 'react-i18next'
import { VendorStatusBadge } from '@/components/shared/badges'

function InitialsCircle({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-white shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

function MobileVendorCard({ item, onViewDetails }: {
  item: Vendor
  onViewDetails: () => void
}) {
  const { t } = useTranslation('vendors')
  return (
    <div
      className="bg-card border border-border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <InitialsCircle name={item.store_name} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">{item.store_name}</p>
            <p className="text-xs text-muted-foreground truncate">{t(`type.${item.type}`)}</p>
          </div>
        </div>
        <VendorStatusBadge 
          status={item.status} 
          variant="pill"
          size="sm"
          className="shrink-0 ml-2" 
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.ownerName')}</p>
          <p className="text-xs text-foreground">{item.owner_name || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.area')}</p>
          <p className="text-xs text-foreground truncate">{item.area || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.phone')}</p>
          <p className="text-xs text-foreground">{item.phone || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.email')}</p>
          <p className="text-xs text-foreground truncate">{item.email || '—'}</p>
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full gap-2 mt-2" onClick={onViewDetails}>
        <Eye className="h-3.5 w-3.5" />
        {t('table.viewDetails')}
        <ChevronRight className="h-3.5 w-3.5 ml-auto" />
      </Button>
    </div>
  )
}

const VendorsTable = ({
  vendors,
  loading,
  pagination,
  onPageChange,
}: VendorsTableProps) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('vendors')
  const isAr = i18n.language === 'ar'

  const columns: Column<Vendor>[] = [
    {
      key: 'store_name',
      header: t('table.storeName'),
      headerIcon: Store,
      width: 'w-56',
      className: 'px-8',
      cell: (vendor) => (
        <div className="flex items-center gap-2.5 px-4">
          <InitialsCircle name={vendor.store_name} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium leading-tight text-foreground">
              {vendor.store_name}
            </p>
            <p className="truncate text-xs leading-tight text-muted-foreground">
              {vendor.email || vendor.phone}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'owner_name',
      header: t('table.ownerName'),
      headerIcon: User,
      width: 'w-40',
      cell: (vendor) => vendor.owner_name || '—',
    },
    {
      key: 'type',
      header: t('table.type'),
      headerIcon: Building2,
      width: 'w-28',
      cell: (vendor) => t(`type.${vendor.type}`),
    },
    {
      key: 'area',
      header: t('table.area'),
      headerIcon: MapPin,
      width: 'w-36',
      cell: (vendor) => vendor.area || '—',
    },
    {
      key: 'registered_at',
      header: t('table.registeredAt'),
      headerIcon: Calendar,
      width: 'w-32',
      cell: (vendor) => (
        <span className="text-muted-foreground">
          {new Date(vendor.registered_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'status',
      header: t('table.status'),
      headerIcon: CircleDot,
      width: 'w-24',
      cell: (vendor) => (
        <VendorStatusBadge 
          status={vendor.status} 
          variant="soft"
          size="sm"
          showIcon={true}
        />
      ),
    },
    {
      key: 'actions',
      header: '',
      width: 'w-20',
      cell: (vendor) => (
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 px-2.5 text-xs"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/vendors/${vendor.id}`)
          }}
        >
          <Eye className="h-3.5 w-3.5 text-primary" />
          {t('table.viewDetails')}
        </Button>
      ),
    },
  ]

  return (
    <DataTable
      data={vendors}
      columns={columns}
      loading={loading}
      pagination={{
        total: pagination.total,
        page: pagination.page,
        lastPage: pagination.lastPage,
      }}
      onPageChange={onPageChange}
      onRowClick={(vendor) => navigate(`/vendors/${vendor.id}`)}
      getRowId={(vendor) => vendor.id}
      mobileCardComponent={MobileVendorCard}
      emptyMessage={t('table.noData')}
    />
  )
}

export default VendorsTable