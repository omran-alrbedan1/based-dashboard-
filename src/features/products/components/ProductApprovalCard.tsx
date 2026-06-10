import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { ProductApprovalRequest } from '@/features/products/data/products.data'
import { Card, CardContent } from '@/components/ui/card'
import {
  DollarSign,
  Tag,
  CalendarDays,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Store,
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
import { useProductApproval } from '../hooks/useProductApproval'
import { formatDate } from '@/lib/formatter'

interface ProductApprovalCardProps {
  request: ProductApprovalRequest
  onUpdate?: () => void
}

const ProductApprovalCard: React.FC<ProductApprovalCardProps> = ({ request, onUpdate }) => {
  const { t } = useTranslation('productApproval')
  const navigate = useNavigate()
  const { updateStatus } = useProductApproval()
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

  const formattedDate = formatDate(request.submittedDate)

  return (
    <>
      <Card className="group relative overflow-hidden bg-card border border-border rounded-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="p-4 sm:p-5 pb-3 border-b border-border/50">
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden bg-background-secondary">
                    <img
                      src={request.mainImage}
                      alt={request.name.en}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-text-header truncate">
                    {request.name.en}
                  </h3>
                  <p className="text-xs text-text-muted truncate mt-0.5">{request.name.ar}</p>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
                    <CalendarDays className="h-3 w-3" />
                    <span>{formattedDate}</span>
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
                    onClick={() => navigate(`/admin/product-approval/${request.id}`)}
                    className="cursor-pointer hover:bg-primary/10 hover:text-primary"
                  >
                    <Eye className="mr-2 h-4 w-4 text-primary" />
                    <span>{t('viewDetails')}</span>
                    <ChevronRight className="ml-auto h-3.5 w-3.5 text-text-muted" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    onClick={() => setApproveOpen(true)}
                    className="cursor-pointer hover:bg-green-50 hover:text-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>{t('approved')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setRejectOpen(true)}
                    className="cursor-pointer hover:bg-red-50 hover:text-red-700"
                  >
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>{t('rejected')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="px-4 sm:px-5 py-2 sm:py-3 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm">
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                <Store className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
              </div>
              <span className="text-text-secondary truncate text-xs sm:text-sm">{request.vendorName.en}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm">
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                <Tag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
              </div>
              <span className="text-text-secondary text-xs sm:text-sm">{request.category}</span>
            </div>
          </div>
          <div className="border-t border-border/50 my-1" />
          <div className="px-4 sm:px-5 py-2 sm:py-3 space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-text-secondary">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                </div>
                <span>{t('productInformation')}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-text-secondary">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                  <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                </div>
                <span>{t('price')}</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-text-header ml-8 sm:ml-0">
                ${request.price.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mx-4 sm:mx-5 my-3 sm:my-4 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                <span className="text-text-secondary text-xs sm:text-sm">{t('glutenStatus')}</span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-primary">{request.glutenStatus}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <ApproveModal
        open={approveOpen}
        onConfirm={handleApprove}
        onClose={() => setApproveOpen(false)}
        loading={processing}
        name={request.name.en}
      />
      <RejectModal
        open={rejectOpen}
        onConfirm={handleReject}
        onClose={() => setRejectOpen(false)}
        loading={processing}
        name={request.name.en}
      />
    </>
  )
}

export default ProductApprovalCard
