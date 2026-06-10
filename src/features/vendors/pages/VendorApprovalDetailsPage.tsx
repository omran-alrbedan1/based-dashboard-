import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  CalendarDays,
  MoreVertical,
  Check,
  X,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/badges'
import { ApproveModal, RejectModal } from '@/components/shared/modals'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { useVendorApprovalRequest } from '../hooks/useVendorApprovalRequest'
import { VendorApprovalLoadingSkeleton } from '../components'

const typeIcons: Record<string, React.ElementType> = {
  restaurant: Store,
  store: Store,
  supplier: Store,
}

const VendorApprovalDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('vendors')

  const { request, loading, error, updateStatus, refetch } = useVendorApprovalRequest(id)

  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [processing, setProcessing] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <PageHeader
          title=""
          description=""
          showBackButton
          backButtonLabel={t('vendorApprovalCard.viewDetails')}
          onBackClick={() => navigate('/admin/vendor-approval')}
        />
        <div className="mt-6">
          <VendorApprovalLoadingSkeleton count={1} />
        </div>
      </div>
    )
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <EmptyState
          title={t('vendorApproval.title')}
          description={error || t('table.noData')}
          icon={Store}
          primaryAction={{
            label: t('vendorApprovalCard.viewDetails'),
            onClick: () => navigate('/admin/vendor-approval'),
            icon: X,
          }}
        />
      </div>
    )
  }

  const storeName =
    request.storeName[i18n.language as keyof typeof request.storeName] || request.storeName.en
  const TypeIcon = typeIcons[request.type] || Store

  const handleApprove = async () => {
    setProcessing(true)
    try {
      await updateStatus('Approved')
      setApproveOpen(false)
      refetch()
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async (reason: string) => {
    setProcessing(true)
    try {
      await updateStatus('Rejected', { en: reason || '', ar: '' })
      setRejectOpen(false)
      refetch()
    } finally {
      setProcessing(false)
    }
  }

  const headerRightContent = (
    <div className="flex items-center gap-3">
      <StatusBadge status={request.status === 'Approved' ? 'approved' : request.status === 'Rejected' ? 'rejected' : 'pending'} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setApproveOpen(true)}>
            <Check className="mr-2 h-4 w-4 text-green-600" />
            {t('status.approved')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setRejectOpen(true)}>
            <X className="mr-2 h-4 w-4 text-red-600" />
            {t('status.rejected')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <PageHeader
          title={storeName}
          description={t('vendorApproval.title')}
          showBackButton
          backButtonLabel={t('vendorApprovalCard.viewDetails')}
          onBackClick={() => navigate('/admin/vendor-approval')}
          rightContent={headerRightContent}
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-6 pb-8">
        <Card className="overflow-hidden border border-border/60 rounded-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <TypeIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text">{storeName}</h2>
                <p className="text-sm text-text-secondary">{request.id}</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <DetailRow
                icon={<User className="w-4 h-4" />}
                label={t('vendorApprovalCard.owner')}
                value={request.ownerName}
              />
              <DetailRow
                icon={<Mail className="w-4 h-4" />}
                label={t('vendorApprovalCard.email')}
                value={request.email}
              />
              <DetailRow
                icon={<Phone className="w-4 h-4" />}
                label={t('vendorApprovalCard.phone')}
                value={request.phone}
              />
              <DetailRow
                icon={<MapPin className="w-4 h-4" />}
                label={t('vendorApprovalCard.area')}
                value={request.area}
              />
              <DetailRow
                icon={<Tag className="w-4 h-4" />}
                label={t('vendorApprovalCard.type')}
                value={t(`type.${request.type}`)}
              />
              <DetailRow
                icon={<CalendarDays className="w-4 h-4" />}
                label={t('vendorApprovalCard.submittedDate')}
                value={request.submittedDate}
              />
            </div>

            {request.status === 'Rejected' && request.rejectionReason && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-semibold text-red-800 mb-1">
                  {t('details.reject')}
                </p>
                <p className="text-sm text-red-700">
                  {request.rejectionReason.en || request.rejectionReason.ar}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ApproveModal
        open={approveOpen}
        onConfirm={handleApprove}
        onClose={() => setApproveOpen(false)}
        loading={processing}
        name={storeName}
      />

      <RejectModal
        open={rejectOpen}
        onConfirm={handleReject}
        onClose={() => setRejectOpen(false)}
        loading={processing}
        name={storeName}
      />
    </div>
  )
}

interface DetailRowProps {
  icon: React.ReactNode
  label: string
  value: string
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 text-primary shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">{label}</p>
      <p className="text-sm text-text font-semibold mt-0.5 break-words">{value}</p>
    </div>
  </div>
)

export default VendorApprovalDetailsPage
