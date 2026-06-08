import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FilterX,
  Package,
  Ban,
  Power,
  MessageSquare,
  MoreVertical,
  Eye,
  Check,
  X,
} from 'lucide-react'
import { useVendor } from '../hooks/useVendor'
import {
  VendorOverview,
  VendorProducts,
  VendorDetailsSkeleton,
} from '../components'
import {
  ActivateModal,
  ApproveModal,
  RejectModal,
  SuspendModal,
  SendMessageModal,
} from '@/components/shared/modals'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { Button } from '@/components/ui/button'
import { VendorStatusBadge } from '@/components/shared/badges'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'

type ModalAction = 'approve' | 'reject' | 'activate' | 'suspend' | null

const VendorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation('vendors')

  const {
    vendor,
    loading,
    error,
    activate,
    suspend,
    sendMessage,
    isActivating,
    isSuspending,
    isSendingMessage,
    refetch,
  } = useVendor(id)

  const actionLoading = isActivating || isSuspending || isSendingMessage
  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)

  const handleApprove = async () => {
    setModalAction(null)
    refetch()
  }

  const handleReject = async (reason?: string) => {
    setModalAction(null)
    refetch()
  }

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
    return <VendorDetailsSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <EmptyState
          title={t('vendorDetailsPage.pageTitle')}
          description={error}
          icon={Package}
          primaryAction={{
            label: t('details.backToList'),
            onClick: () => navigate('/vendors'),
            icon: FilterX,
          }}
        />
      </div>
    )
  }

  if (!vendor) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <PageHeader
          title={t('vendorDetailsPage.pageTitle', { vendorName: vendor.store_name })}
          description={t('vendorDetailsPage.pageDescription', { vendorId: vendor.id })}
          showBackButton
          backButtonLabel={t('details.backToList')}
          onBackClick={() => navigate('/vendors')}
          rightContent={
            <div className="flex items-center gap-3 relative">
              <VendorStatusBadge status={vendor.status} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={actionLoading}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                      <MoreVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {vendor.status === 'pending' && (
                    <>
                      <DropdownMenuItem
                        onClick={() => setModalAction('approve')}
                        className="gap-2 "
                      >
                        <Check size={16} className="text-green-600" />
                        {t('details.approve')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setModalAction('reject')}
                        className="gap-2 "
                      >
                        <X size={16} className="text-red-400" />
                        {t('details.reject')}
                      </DropdownMenuItem>
                    </>
                  )}
                  {vendor.status === 'approved' && (
                    <DropdownMenuItem
                      onClick={() => setModalAction('suspend')}
                      className="gap-2 "
                    >
                      <Ban size={16} className='text-red-400' />
                      {t('details.suspend')}
                    </DropdownMenuItem>
                  )}
                  {(vendor.status === 'rejected' || vendor.status === 'pending') && (
                    <DropdownMenuItem
                      onClick={() => setModalAction('activate')}
                      >
                      <Power size={16}
                      
                      className="gap-2 text-green-600 "
                      />
                      {t('details.activate')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => setShowMessageModal(true)}
                    className="gap-2"
                  >
                    <MessageSquare size={16} className="text-primary" />
                    {t('details.sendMessage')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <Tabs defaultValue="overview">
          <TabsList className="w-fit h-auto p-1">
            <TabsTrigger value="overview" className="flex-1 gap-2 py-2.5">
              <Eye className="h-4 w-4 text-primary" />
              {t('tabs.overview')}
            </TabsTrigger>
            <TabsTrigger value="products" className="flex-1 gap-2 py-2.5">
              <Package className="h-4 w-4 text-primary" />
              {t('tabs.products')}
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {vendor.products_count}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <VendorOverview vendor={vendor} />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <VendorProducts vendor={vendor} />
          </TabsContent>
        </Tabs>
      </div>

      <ApproveModal
        open={modalAction === 'approve'}
        onConfirm={handleApprove}
        onClose={() => setModalAction(null)}
        loading={actionLoading}
        name={vendor.store_name}
      />

      <RejectModal
        open={modalAction === 'reject'}
        onConfirm={handleReject}
        onClose={() => setModalAction(null)}
        loading={actionLoading}
        name={vendor.store_name}
      />

      <SuspendModal
        open={modalAction === 'suspend'}
        onConfirm={handleSuspend}
        onClose={() => setModalAction(null)}
        loading={actionLoading}
        name={vendor.store_name}
      />

      <ActivateModal
        open={modalAction === 'activate'}
        onConfirm={handleActivate}
        onClose={() => setModalAction(null)}
        loading={actionLoading}
        name={vendor.store_name}
      />

      <SendMessageModal
        open={showMessageModal}
        onConfirm={handleSendMessage}
        onClose={() => setShowMessageModal(false)}
        loading={actionLoading}
        name={vendor.store_name}
        phone={vendor.phone}
      />
    </div>
  )
}

export default VendorDetails