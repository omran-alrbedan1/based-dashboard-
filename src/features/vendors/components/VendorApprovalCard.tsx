import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { VendorApprovalRequest } from '@/features/vendors/data/vendorApproval.data'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  CalendarDays,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ApproveModal, RejectModal } from '@/components/shared/modals'
import { StatusBadge } from '@/components/shared/badges'
import { useVendorApproval } from '../hooks/useVendorApproval'

interface VendorApprovalCardProps {
  request: VendorApprovalRequest
  onUpdate?: () => void
}

const VendorApprovalCard: React.FC<VendorApprovalCardProps> = ({ request, onUpdate }) => {
  const { t, i18n } = useTranslation('vendors')
  const { updateStatus } = useVendorApproval()
  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [processing, setProcessing] = useState(false)

  const storeName =
    request.storeName[i18n.language as keyof typeof request.storeName] || request.storeName.en

  const handleApprove = async () => {
    setProcessing(true)
    try {
      await updateStatus(request.id, 'Approved')
      setApproveOpen(false)
      onUpdate?.()
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async (reason?: string) => {
    setProcessing(true)
    try {
      await updateStatus(request.id, 'Rejected', { en: reason || '', ar: '' })
      setRejectOpen(false)
      onUpdate?.()
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      <Card className="group overflow-hidden border border-border/60 hover:border-border hover:shadow-md transition-all duration-300 bg-card rounded-xl">
        <CardContent className="p-4 sm:p-5 space-y-3 sm:space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text leading-snug truncate">
                  {storeName}
                </h3>
              </div>
            </div>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-not-allowed opacity-50" disabled>
                  <Eye className="mr-2 h-4 w-4" />
                  {t('vendorApprovalCard.viewDetails')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setApproveOpen(true)}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  {t('status.approved')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRejectOpen(true)}>
                  <XCircle className="mr-2 h-4 w-4 text-red-600" />
                  {t('status.rejected')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="h-px bg-border/50" />

          {/* Details */}
          <div className="space-y-2">
            <MetaRow
              icon={<User className="w-3.5 h-3.5" />}
              label={t('vendorApprovalCard.owner')}
              value={request.ownerName}
            />
            <MetaRow
              icon={<Mail className="w-3.5 h-3.5" />}
              label={t('vendorApprovalCard.email')}
              value={request.email}
            />
            <MetaRow
              icon={<Phone className="w-3.5 h-3.5" />}
              label={t('vendorApprovalCard.phone')}
              value={request.phone}
            />
            <MetaRow
              icon={<MapPin className="w-3.5 h-3.5" />}
              label={t('vendorApprovalCard.area')}
              value={request.area}
            />
            <MetaRow
              icon={<Tag className="w-3.5 h-3.5" />}
              label={t('vendorApprovalCard.type')}
              value={t(`type.${request.type}`)}
            />
            <MetaRow
              icon={<CalendarDays className="w-3.5 h-3.5" />}
              label={t('vendorApprovalCard.submittedDate')}
              value={request.submittedDate}
            />
          </div>
        </CardContent>
      </Card>

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
    </>
  )
}

interface MetaRowProps {
  icon: React.ReactNode
  label: string
  value: string
  valueClass?: string
}

const MetaRow: React.FC<MetaRowProps> = ({
  icon,
  label,
  value,
  valueClass = 'text-text',
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-3 text-sm">
    <span className="flex items-center gap-2 text-text-secondary min-w-0">
      <span className="shrink-0 text-primary">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
    <span className={`font-medium sm:text-right ${valueClass}`}>{value}</span>
  </div>
)

export default VendorApprovalCard
