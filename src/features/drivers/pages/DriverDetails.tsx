import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FilterX,
  FileText,
  TrendingUp, Store,
  Ban,
  Power,
  Activity,
  MapPin,
  Package,
  MessageSquare,
  MoreVertical,
  Loader2,
} from 'lucide-react';
import { useDriver } from '../hooks/useDriver'
import { 
  DriverDocuments,
  DriverAreaSelector,
  DriverOrdersHistory,
  SendMessageModal,
  DriverSuspendModal,
  DriverActivateModal,
} from '../components'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { Button } from '@/components/ui/button'
import { DriverOverview } from '../components/DriverOverview'
import { DriverDetailsSkeleton } from '../components/DriverDetailsSkeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Tab = 'overview' | 'documents' | 'areas' | 'activity'

const DriverDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation('drivers')
  
  const { 
    driver, 
    loading, 
    error, 
    activate, 
    suspend, 
    sendMessage,
    isActivating,
    isSuspending,
    isSendingMessage,
    refetch 
  } = useDriver(id)
  
  const actionLoading = isActivating || isSuspending || isSendingMessage
  const [modalAction, setModalAction] = useState<'activate' | 'suspend' | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const handleSuspend = async (reason?: string) => {
    if (!id) return
    await suspend(reason)
    setModalAction(null)
    refetch()
  }

  const handleActivate = async () => {
    if (!id) return
    await activate()
    setModalAction(null)
    refetch()
  }

  const handleSendMessage = async (message: string) => {
    if (!id) return
    await sendMessage(message)
    setShowMessageModal(false)
  }

  if (loading) {
    return <DriverDetailsSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <EmptyState
          title={t('driverDetailsPage.pageTitle', { driverName: '', driverId: id || '' })}
          description={error}
          icon={Package}
          primaryAction={{
            label: t('details.backToList'),
            onClick: () => navigate('/drivers'),
            icon: FilterX,
          }}
        />
      </div>
    )
  }

  if (!driver) return null

  const isActive = driver.status === 'active'

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: t('tabs.overview'), icon: Activity },
    { id: 'documents', label: t('tabs.documents'), icon: FileText },
    { id: 'areas', label: t('tabs.areas'), icon: MapPin },
    { id: 'activity', label: t('tabs.activity'), icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <PageHeader
          title={t('driverDetailsPage.pageTitle', { driverName: driver.name })}
          description={t('driverDetailsPage.pageDescription', { driverId: driver.id })}
          showBackButton
          backButtonLabel={t('details.backToList')}
          onBackClick={() => navigate('/drivers')}
          rightContent={
            <div className="flex items-center gap-3 relative">
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
                <DropdownMenuContent align="end" className="w-48">
                  {!isActive && (
                    <DropdownMenuItem
                      onClick={() => setModalAction('activate')}
                      className="gap-2 text-green-600 focus:text-green-600"
                    >
                      <Power size={16} />
                      {t('details.activateButton')}
                    </DropdownMenuItem>
                  )}
                  {isActive && (
                    <DropdownMenuItem
                      onClick={() => setModalAction('suspend')}
                      className="gap-2 text-red-600 focus:text-red-600"
                    >
                      <Ban size={16} />
                      {t('details.suspendButton')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => setShowMessageModal(true)}
                    className="gap-2"
                  >
                    <MessageSquare size={16} className='text-primary' />
                    {t('details.sendMessage')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />
      </div>

      {/* Tab Navigation */}
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
        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <DriverOverview driver={driver} />}
          {activeTab === 'documents' && <DriverDocuments driverId={driver.id} />}
          {activeTab === 'areas' && (
            <DriverAreaSelector 
              driverId={driver.id} 
              currentAreas={driver.areas || []} 
              onUpdate={refetch} 
            />
          )}
          {activeTab === 'activity' && <DriverOrdersHistory driverId={driver.id} />}
        </div>
      </div>

      {modalAction === 'suspend' && (
        <DriverSuspendModal
          driver={driver}
          onConfirm={handleSuspend}
          onClose={() => setModalAction(null)}
          loading={actionLoading}
        />
      )}

      {modalAction === 'activate' && (
        <DriverActivateModal
          driver={driver}
          onConfirm={handleActivate}
          onClose={() => setModalAction(null)}
          loading={actionLoading}
        />
      )}

      {showMessageModal && (
        <SendMessageModal
          driver={driver}
          onConfirm={handleSendMessage}
          onClose={() => setShowMessageModal(false)}
          loading={actionLoading}
        />
      )}
    </div>
  )
}

export default DriverDetails