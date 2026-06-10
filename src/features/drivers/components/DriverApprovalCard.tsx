import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { DriverApprovalRequest } from '@/features/drivers/data/driverApproval.data'
import { Card, CardContent } from '@/components/ui/card'
import { images } from '@/constants/images'
import {
  Mail,
  Phone,
  CalendarDays,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Car,
  Hash,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ApproveModal, RejectModal } from '@/components/shared/modals'
import { useDriverApproval } from '../hooks/useDriverApproval'
import { formatDate } from '@/lib/formatter'

interface DriverApprovalCardProps {
  request: DriverApprovalRequest
  onUpdate?: () => void
}

const DriverApprovalCard: React.FC<DriverApprovalCardProps> = ({ request, onUpdate }) => {
  const { t } = useTranslation('drivers')
  const navigate = useNavigate()
  const { updateStatus } = useDriverApproval()
  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [processing, setProcessing] = useState(false)

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

  const handleReject = async (reason: string) => {
    setProcessing(true)
    try {
      await updateStatus(request.id, 'Rejected', reason || undefined)
      setRejectOpen(false)
      onUpdate?.()
    } finally {
      setProcessing(false)
    }
  }

  const docCount = request.documents.length
  const formattedDate = formatDate(request.submittedDate)

  return (
    <>
      <Card className="group relative overflow-hidden bg-card border border-border rounded-xl transition-all duration-300 ">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="p-4 sm:p-5 pb-3 border-b border-border/50">
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl p-[2px]">
                    <div className="h-full w-full rounded-[10px] bg-card overflow-hidden">
                      {request.avatar ? (
                        <img 
                          src={request.avatar} 
                          alt={request.driverName}
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                          <img 
                            src={images.avatarPlaceholder } 
                            alt={request.driverName}
                            className="h-full w-full object-cover" 
                          />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-text-header truncate">
                      {request.driverName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                      <CalendarDays className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                    </div>
                    <span className="text-xs truncate">{formattedDate}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg hover:bg-primary/10 hover:text-primary shrink-0"
                  >
                    <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-text-secondary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                  <DropdownMenuItem 
                    onClick={() => navigate(`/admin/driver-approval/${request.id}`)}
                    className="cursor-pointer hover:bg-primary/10 hover:text-primary"
                  >
                    <Eye className="mr-2 h-4 w-4 text-primary" />
                    <span>{t('driverApprovalCard.viewDetails')}</span>
                    <ChevronRight className="ml-auto h-3.5 w-3.5 text-text-muted" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem 
                    onClick={() => setApproveOpen(true)}
                    className="cursor-pointer hover:bg-green-50 hover:text-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>{t('status.approved')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setRejectOpen(true)}
                    className="cursor-pointer hover:bg-red-50 hover:text-red-700"
                  >
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>{t('status.rejected')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-4 sm:px-5 py-2 sm:py-3 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm">
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
              </div>
              <span className="text-text-secondary truncate text-xs sm:text-sm">{request.email}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm">
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
              </div>
              <span className="text-text-secondary text-xs sm:text-sm break-all">{request.phone}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 my-1" />

          {/* Vehicle Details */}
          <div className="px-4 sm:px-5 py-2 sm:py-3 space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-text-secondary">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                  <Car className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                </div>
                <span>{t('driverApprovalCard.vehicleType')}</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-text-header ml-8 sm:ml-0">
                {request.vehicleType}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-text-secondary">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                  <Hash className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                </div>
                <span>{t('driverApprovalCard.vehicleModel')}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-text-primary ml-8 sm:ml-0 break-words">
                {request.vehicleModel}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-text-secondary">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                </div>
                <span>{t('driverApprovalCard.vehiclePlate')}</span>
              </div>
              <span className="text-xs sm:text-sm font-mono font-semibold text-text-header ml-8 sm:ml-0">
                {request.vehiclePlate}
              </span>
            </div>
          </div>

          {/* Documents */}
          <div className="mx-4 sm:mx-5 my-3 sm:my-4 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                <span className="text-text-secondary text-xs sm:text-sm">{t('approvalDetails.sectionDocuments')}</span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-primary">
                {docCount} {t('documents.title')}
              </span>
            </div>
          </div>

        </CardContent>
      </Card>

      <ApproveModal
        open={approveOpen}
        onConfirm={handleApprove}
        onClose={() => setApproveOpen(false)}
        loading={processing}
        name={request.driverName}
      />

      <RejectModal
        open={rejectOpen}
        onConfirm={handleReject}
        onClose={() => setRejectOpen(false)}
        loading={processing}
        name={request.driverName}
      />
    </>
  )
}

export default DriverApprovalCard