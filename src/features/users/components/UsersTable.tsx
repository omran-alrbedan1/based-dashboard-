import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  User,
  Phone,
  MapPin,
  ShoppingBag,
  CircleDot,
  Eye,
  ChevronRight,
  ShieldCheck,
  ShieldOff,
  MoreVertical,
} from 'lucide-react'
import { DataTable, type Column } from '@/components/shared/custom/DataTable'
import type { UsersTableProps, User as UserType } from '../types/users.types'
import { useTranslation } from 'react-i18next'
import StatusBadge from '@/components/shared/badges/StatusBadge'
import { images } from '@/constants/images'

function AvatarCell({ user }: { user: UserType }) {
  return (
    <div className="flex items-center gap-2.5 px-4">
      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
        <img src={images.avatarPlaceholder} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium leading-tight text-foreground">
          {user.name}
        </p>
        <p className="truncate text-xs leading-tight text-muted-foreground">
          {user.email}
        </p>
      </div>
    </div>
  )
}

function MobileUserCard({ item, onViewDetails, onActivate, onSuspend, t }: {
  item: UserType
  onViewDetails: () => void
  onActivate: () => void
  onSuspend: () => void
  t: (key: string, options?: any) => string
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={images.avatarPlaceholder} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground truncate">{item.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('card.phone')}</p>
          <p className="text-xs text-foreground">{item.phone || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('card.location')}</p>
          <p className="text-xs text-foreground truncate">{item.city || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('details.overview.totalOrders')}</p>
          <p className="text-xs text-foreground">{item.totalOrders}</p>
        </div>
      </div>

      <div className="flex gap-1.5 mt-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={onViewDetails}>
          <Eye className="h-3.5 w-3.5 mr-1" />
          {t('card.view')}
        </Button>
        {item.status !== 'Suspended' ? (
          <Button variant="outline" size="sm" className="flex-1 text-xs text-red-600" onClick={onSuspend}>
            <ShieldOff className="h-3.5 w-3.5 mr-1" />
            {t('card.suspend')}
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="flex-1 text-xs text-green-600" onClick={onActivate}>
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            {t('card.activate')}
          </Button>
        )}
      </div>
    </div>
  )
}

const UsersTable = ({
  users,
  loading,
  pagination,
  onPageChange,
  onActivate,
  onSuspend,
}: UsersTableProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation('users')

  const columns: Column<UserType>[] = [
    {
      key: 'name',
      header: t('table.name'),
      headerIcon: User,
      width: 'w-56',
      className: 'px-8',
      cell: (user) => <AvatarCell user={user} />,
    },
    {
      key: 'phone',
      header: t('table.phone'),
      headerIcon: Phone,
      width: 'w-36',
      cell: (user) => user.phone || '—',
    },
    {
      key: 'city',
      header: t('table.location'),
      headerIcon: MapPin,
      width: 'w-36',
      cell: (user) => `${user.city}, ${user.country}`,
    },
    {
      key: 'totalOrders',
      header: t('table.orders'),
      headerIcon: ShoppingBag,
      width: 'w-20',
      cell: (user) => user.totalOrders,
    },
    {
      key: 'status',
      header: t('table.status'),
      headerIcon: CircleDot,
      width: 'w-24',
      cell: (user) => {
        const isDeleted = !!user.deleted_at
        return (
          <StatusBadge
            status={isDeleted ? 'Suspended' : user.status}
            variant="soft"
            size="sm"
            showIcon={true}
          />
        )
      },
    },
    {
      key: 'actions',
      header: '',
      width: 'w-20',
      cell: (user) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline" size="sm"
                className="h-7 w-7 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/users/${user.id}`) }}>
                <Eye className="mr-2 h-4 w-4" />
                {t('card.viewDetails')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user.status !== 'Active' && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onActivate(user.id) }}>
                  <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                  {t('card.activate')}
                </DropdownMenuItem>
              )}
              {user.status !== 'Suspended' && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onSuspend(user.id) }}>
                  <ShieldOff className="mr-2 h-4 w-4 text-red-600" />
                  {t('card.suspend')}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <DataTable
      data={users}
      columns={columns}
      loading={loading}
      pagination={{
        total: pagination.total,
        page: pagination.page,
        lastPage: pagination.lastPage,
      }}
      onPageChange={onPageChange}
      onRowClick={(user) => navigate(`/users/${user.id}`)}
      getRowId={(user) => user.id}
      mobileCardComponent={(props) => (
        <MobileUserCard
          item={props.item}
          onViewDetails={() => navigate(`/users/${props.item.id}`)}
          onActivate={() => onActivate(props.item.id)}
          onSuspend={() => onSuspend(props.item.id)}
          t={t}
        />
      )}
      emptyMessage={t('table.noData')}
    />
  )
}

export default UsersTable
