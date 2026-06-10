import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Activity,
  ShoppingBag,
  CreditCard,
  Clock,
  Ban,
  Power,
  Loader2,
  MoreVertical,
  Edit,
  KeyRound,
  CheckCircle2,
} from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { ErrorState } from '@/components/shared/states'
import { Button } from '@/components/ui/button'
import { ActivateModal, SuspendModal } from '@/components/shared/modals'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserOverview } from '../components/UserOverview'
import { UserOrdersList } from '../components/UserOrdersList'
import { UserPaymentsList } from '../components/UserPaymentsList'
import { UserActivity } from '../components/UserActivity'
import { UserEditModal } from '../components/UserEditModal'
import { usersService } from '../services/users.service'
import type { User } from '../types/users.types'

type Tab = 'overview' | 'orders' | 'payments' | 'activity'

const UserDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation('users')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [activateOpen, setActivateOpen] = useState(false)
  const [suspendOpen, setSuspendOpen] = useState(false)
  const [editUser, setEditUser] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [passwordResetSent, setPasswordResetSent] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(false)
    usersService.getById(id)
      .then(setUser)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  const handleActivate = async () => {
    if (!id) return
    setProcessing(true)
    try {
      const updated = await usersService.updateStatus(id, 'Active')
      setUser(updated)
      setActivateOpen(false)
    } finally {
      setProcessing(false)
    }
  }

  const handleSuspend = async () => {
    if (!id) return
    setProcessing(true)
    try {
      const updated = await usersService.updateStatus(id, 'Suspended')
      setUser(updated)
      setSuspendOpen(false)
    } finally {
      setProcessing(false)
    }
  }

  const handleEditSave = async (data: Partial<User>) => {
    if (!id) return
    const updated = await usersService.update(id, data)
    setUser(updated)
    setEditUser(false)
  }

  const handleResetPassword = async () => {
    if (!id) return
    setProcessing(true)
    try {
      await usersService.resetPassword(id)
      setPasswordResetSent(true)
      setTimeout(() => setPasswordResetSent(false), 3000)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-card border border-border rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <ErrorState retry={() => window.location.reload()} />
      </div>
    )
  }

  if (!user) return null

  const isActive = user.status !== 'Suspended'
  const isDeleted = !!user.deleted_at
  const actionLoading = processing

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: t('details.tabs.overview'), icon: Activity },
    { id: 'orders', label: t('details.tabs.orders'), icon: ShoppingBag },
    { id: 'payments', label: t('details.tabs.payments'), icon: CreditCard },
    { id: 'activity', label: t('details.tabs.activity'), icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <PageHeader
          title={user.name}
          description={user.email}
          showBackButton
          backButtonLabel={t('details.back')}
          onBackClick={() => navigate('/users')}
          rightContent={
            <div className="flex items-center gap-3 relative">
              {passwordResetSent && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {t('details.passwordResetSent')}
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={actionLoading}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    {actionLoading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <MoreVertical size={14} />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {!isDeleted && !isActive && (
                    <DropdownMenuItem onClick={() => setActivateOpen(true)} className="gap-2 text-green-600 focus:text-green-600">
                      <Power size={16} />
                      {t('details.activate')}
                    </DropdownMenuItem>
                  )}
                  {!isDeleted && isActive && (
                    <DropdownMenuItem onClick={() => setSuspendOpen(true)} className="gap-2 text-red-600 focus:text-red-600">
                      <Ban size={16} />
                      {t('details.suspend')}
                    </DropdownMenuItem>
                  )}
                  {!isDeleted && (
                    <DropdownMenuItem onClick={() => setEditUser(true)} className="gap-2">
                      <Edit size={16} />
                      {t('details.edit')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleResetPassword} className="gap-2">
                    <KeyRound size={16} className="text-primary" />
                    {t('details.resetPassword')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 border-b border-border">
        <div className="flex gap-1 overflow-x-auto pb-px -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActiveTab = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActiveTab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <UserOverview
              user={user}
              onUpdate={() => setEditUser(true)}
            />
          )}
          {activeTab === 'orders' && id && <UserOrdersList userId={id} />}
          {activeTab === 'payments' && id && <UserPaymentsList userId={id} />}
          {activeTab === 'activity' && id && <UserActivity userId={id} />}
        </div>
      </div>

      <ActivateModal
        open={activateOpen}
        onConfirm={handleActivate}
        onClose={() => setActivateOpen(false)}
        loading={processing}
        name={user.name}
      />
      <SuspendModal
        open={suspendOpen}
        onConfirm={handleSuspend}
        onClose={() => setSuspendOpen(false)}
        loading={processing}
        name={user.name}
      />
      <UserEditModal
        user={editUser ? user : null}
        onSave={handleEditSave}
        onClose={() => setEditUser(false)}
      />
    </div>
  )
}

export default UserDetails
