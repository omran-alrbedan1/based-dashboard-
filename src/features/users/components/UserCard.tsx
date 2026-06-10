import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/shared/badges'
import { images } from '@/constants/images'
import {
  MoreVertical,
  Eye,
  ShieldCheck,
  ShieldOff,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Edit,
} from 'lucide-react'
import type { User } from '../types/users.types'

interface UserCardProps {
  user: User
  onActivate: (id: string) => void
  onSuspend: (id: string) => void
  onEdit: (user: User) => void
}

const UserCard = ({ user, onActivate, onSuspend, onEdit }: UserCardProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation('users')
  const isDeleted = !!user.deleted_at

  return (
    <Card className="bg-card border border-border rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-5 pt-4 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                <img src={images.avatarPlaceholder} alt="" className="h-full w-full rounded-full object-cover" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary leading-snug">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <StatusBadge status={isDeleted ? 'Suspended' : user.status} variant="pill" size="sm" />
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"
                className="h-[26px] w-[26px] border border-border rounded-md">
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate(`/users/${user.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                {t('card.viewDetails')}
              </DropdownMenuItem>
              {!isDeleted && (
                <DropdownMenuItem onClick={() => onEdit(user)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t('card.edit')}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {!isDeleted && user.status !== 'Active' && (
                <DropdownMenuItem onClick={() => onActivate(user.id)}>
                  <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                  {t('card.activate')}
                </DropdownMenuItem>
              )}
              {!isDeleted && user.status !== 'Suspended' && (
                <DropdownMenuItem onClick={() => onSuspend(user.id)}>
                  <ShieldOff className="mr-2 h-4 w-4 text-red-600" />
                  {t('card.suspend')}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="h-px bg-border" />

        <div className="px-5 py-4 space-y-[5px]">
          <MetaRow icon={<Mail />} label={t('card.email')} value={user.email} />
          <MetaRow icon={<Phone />} label={t('card.phone')} value={user.phone} />
          <MetaRow icon={<MapPin />} label={t('card.location')} value={`${user.city}, ${user.country}`} />
          <MetaRow icon={<ShoppingBag />} label={t('card.orders')} value={`${user.totalOrders} orders`} />
        </div>

        <div className="h-px bg-border" />

        <div className="flex gap-1.5 px-5 py-3">
          <Button variant="outline" size="sm" className="flex-1 text-xs"
            onClick={() => navigate(`/users/${user.id}`)}>
            <Eye className="h-3.5 w-3.5 mr-1" />
            {t('card.view')}
          </Button>
          {!isDeleted && (
            <>
              <Button variant="outline" size="sm" className="flex-1 text-xs"
                onClick={() => onEdit(user)}>
                <Edit className="h-3.5 w-3.5 mr-1" />
                {t('card.edit')}
              </Button>
              {user.status !== 'Suspended' ? (
                <Button variant="outline" size="sm" className="flex-1 text-xs"
                  onClick={() => onSuspend(user.id)}>
                  <ShieldOff className="h-3.5 w-3.5 mr-1" />
                  {t('card.suspend')}
                </Button>
              ) : (
                <Button variant="outline" size="sm"
                  className="flex-1 text-xs bg-primary/10 border-primary/30 text-primary-dark"
                  onClick={() => onActivate(user.id)}>
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                  {t('card.activate')}
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface MetaRowProps {
  icon: React.ReactNode
  label: string
  value: string
}

const MetaRow = ({ icon, label, value }: MetaRowProps) => (
  <div className="flex items-center gap-2.5 px-2.5 py-[7px] bg-background rounded-r-md"
    style={{ borderLeft: '2px solid var(--color-primary)' }}>
    <span className="text-primary shrink-0 [&>svg]:h-[13px] [&>svg]:w-[13px]">{icon}</span>
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-text-muted leading-none mb-[1px]">
        {label}
      </p>
      <p className="text-[12px] font-medium text-text-primary leading-snug">{value}</p>
    </div>
  </div>
)

export default UserCard
