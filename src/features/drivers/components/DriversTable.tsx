import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  User,
  Phone,
  MapPin,
  ShoppingBag,
  Star,
  CircleDot,
  Calendar,
  Eye,
  ChevronRight,
} from 'lucide-react'
import type { Driver } from '../types/drivers.types'
import DriverStatusBadge from './DriverStatusBadge'

interface DriversTableProps {
  drivers: Driver[]
  loading: boolean
  pagination: { total: number; page: number; lastPage: number }
  onPageChange: (page: number) => void
}

const getPageNumbers = (current: number, last: number) => {
  const pages: (number | 'ellipsis')[] = []
  if (last <= 7) {
    for (let i = 1; i <= last; i++) pages.push(i)
    return pages
  }
  pages.push(1)
  if (current > 3) pages.push('ellipsis')
  const start = Math.max(2, current - 1)
  const end = Math.min(last - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < last - 2) pages.push('ellipsis')
  pages.push(last)
  return pages
}

interface AvatarProps {
  name: string
  avatar?: string
}

function Avatar({ name, avatar }: AvatarProps) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-9 w-9 rounded-full object-cover ring-1 ring-border shrink-0"
      />
    )
  }
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-white shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

function MobileDriverCard({ driver, onViewDetails, t, isAr }: {
  driver: Driver
  onViewDetails: () => void
  t: (key: string, options?: any) => string
  isAr: boolean
}) {
  return (
    <div
      className="bg-card border border-border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Avatar name={driver.name} avatar={driver.avatar} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">{driver.name}</p>
            <p className="text-xs text-muted-foreground truncate">{driver.vehicle_type || t('driverCard.vehicle')}</p>
          </div>
        </div>
        <DriverStatusBadge status={driver.status} variant="pill" size="sm" className="shrink-0 ml-2" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.phone')}</p>
          <p className="text-xs text-foreground">{driver.phone || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.area')}</p>
          <p className="text-xs text-foreground truncate">
            {driver.areas?.map((a) => a.name).join(isAr ? '، ' : ', ') || '—'}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.orders')}</p>
          <p className="text-xs font-semibold text-foreground">{driver.orders_count?.toLocaleString() ?? '0'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('table.rating')}</p>
          <p className="text-xs text-foreground">{driver.rating?.toFixed(1) ?? '—'}</p>
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full gap-2 mt-2" onClick={onViewDetails}>
        <Eye className="h-3.5 w-3.5" />
        {t('table.view')}
        <ChevronRight className="h-3.5 w-3.5 ml-auto" />
      </Button>
    </div>
  )
}

const DriversTable: React.FC<DriversTableProps> = ({ drivers, loading, pagination, onPageChange }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('drivers')
  const isAr = i18n.language === 'ar'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const pageNumbers = useMemo(
    () => getPageNumbers(pagination.page, pagination.lastPage),
    [pagination.page, pagination.lastPage],
  )

  if (loading) {
    return (
      <div className="rounded-md border border-border">
        <div className="min-w-3xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <User className="h-3.5 w-3.5 text-primary" />
                    {t('table.driver')}
                  </span>
                </TableHead>
                <TableHead className="w-28">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    {t('table.phone')}
                  </span>
                </TableHead>
                <TableHead className="w-36">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {t('table.area')}
                  </span>
                </TableHead>
                <TableHead className="w-16">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                    {t('table.orders')}
                  </span>
                </TableHead>
                <TableHead className="w-16">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    {t('table.rating')}
                  </span>
                </TableHead>
                <TableHead className="w-24">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <CircleDot className="h-3.5 w-3.5 text-primary" />
                    {t('table.status')}
                  </span>
                </TableHead>
                <TableHead className="w-32">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {t('table.joinDate')}
                  </span>
                </TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-16 rounded-md" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="space-y-3 bg-background">
        {drivers.map((driver) => (
          <MobileDriverCard
            key={driver.id}
            driver={driver}
            onViewDetails={() => navigate(`/drivers/${driver.id}`)}
            t={t}
            isAr={isAr}
          />
        ))}
        <div className="flex items-center justify-between pt-3">
          <div className="text-sm text-muted-foreground">
            {t('table.total', { count: pagination.total.toLocaleString() })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <div className="min-w-3xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48 px-8">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <User className="h-3.5 w-3.5 text-primary" />
                  {t('table.driver')}
                </span>
              </TableHead>
              <TableHead className="w-28">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  {t('table.phone')}
                </span>
              </TableHead>
              <TableHead className="w-36">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {t('table.area')}
                </span>
              </TableHead>
              <TableHead className="w-16">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                  {t('table.orders')}
                </span>
              </TableHead>
              <TableHead className="w-16">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-primary" />
                  {t('table.rating')}
                </span>
              </TableHead>
              <TableHead className="w-24">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <CircleDot className="h-3.5 w-3.5 text-primary" />
                  {t('table.status')}
                </span>
              </TableHead>
              <TableHead className="w-32">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {t('table.joinDate')}
                </span>
              </TableHead>
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow
                key={driver.id}
                className="group cursor-pointer transition-colors hover:bg-muted/30"
                onClick={() => navigate(`/drivers/${driver.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-2.5 px-4">
                    <Avatar name={driver.name} avatar={driver.avatar} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-tight text-foreground">{driver.name}</p>
                      <p className="truncate text-xs leading-tight text-muted-foreground">{driver.vehicle_type || t('driverCard.vehicle')}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-foreground">{driver.phone || '—'}</TableCell>
                <TableCell className="text-sm text-foreground">
                  {driver.areas?.map((a) => a.name).join(isAr ? '، ' : ', ') || '—'}
                </TableCell>
                <TableCell className="text-sm tabular-nums text-foreground">{driver.orders_count?.toLocaleString() ?? '0'}</TableCell>
                <TableCell className="text-sm tabular-nums text-foreground">{driver.rating?.toFixed(1) ?? '—'}</TableCell>
                <TableCell>
                  <DriverStatusBadge status={driver.status} variant="pill" size="sm" />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(driver.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1.5 px-2.5 text-xs "
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/drivers/${driver.id}`)
                    }}
                  >
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    {t('table.view')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DriversTable
