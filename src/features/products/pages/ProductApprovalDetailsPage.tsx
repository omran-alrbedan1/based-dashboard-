import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ShoppingBag,
  Store,
  DollarSign,
  Tag,
  CalendarDays,
  MoreVertical,
  Check,
  X,
  Hash,
  FileText,
  AlertTriangle,
  Eye,
  Download,
  ClipboardList,
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
import { ApproveModal, RejectModal } from '@/components/shared/modals'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import { useProductApprovalRequest } from '../hooks/useProductApprovalRequest'
import { ProductApprovalDetailsSkeleton } from '../components'
import { formatDate } from '@/lib/formatter'
import { DetailItem, SectionCard } from '@/components/shared/cards/SectionCard'

const ProductApprovalDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation('productApproval')

  const { request, loading, error, updateStatus, refetch } = useProductApprovalRequest(id)

  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [processing, setProcessing] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <PageHeader
          title={t('title')}
          description={t('description')}
          showBackButton
          backButtonLabel={t('backToList')}
          onBackClick={() => navigate('/admin/product-approval')}
        />
        <div className="mt-6">
          <ProductApprovalDetailsSkeleton />
        </div>
      </div>
    )
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <PageHeader
          title={t('title')}
          description={t('description')}
          showBackButton
          backButtonLabel={t('backToList')}
          onBackClick={() => navigate('/admin/product-approval')}
        />
        <div className="mt-4">
          <EmptyState
            title={t('notFoundTitle')}
            description={error || t('notFoundDescription')}
            icon={ShoppingBag}
          />
        </div>
      </div>
    )
  }

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
      await updateStatus('Rejected', reason || undefined)
      setRejectOpen(false)
      refetch()
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <PageHeader
          title={request.name.en}
          description={t('reviewTitle')}
          showBackButton
          backButtonLabel={t('backToList')}
          onBackClick={() => navigate('/admin/product-approval')}
          rightContent={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setApproveOpen(true)}>
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  {t('approved')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setRejectOpen(true)}>
                  <X className="mr-2 h-4 w-4 text-red-600" />
                  {t('rejected')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-8 space-y-6">
        <Card className="overflow-hidden border border-border/60 rounded-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="h-24 w-24 rounded-xl overflow-hidden bg-background-secondary shrink-0">
                <img
                  src={request.mainImage}
                  alt={request.name.en}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h2 className="text-2xl font-bold text-text">{request.name.en}</h2>
                </div>
                <p className="text-sm text-text-secondary mt-1">{request.name.ar}</p>
                <p className="text-sm text-text-muted mt-0.5">{request.id}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-sm text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <Store className="h-3.5 w-3.5" />
                    {request.vendorName.en}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    ${request.price.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    {request.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {t('submittedDate')}: {formatDate(request.submittedDate)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <SectionCard icon={ShoppingBag} title={t('productInformation')}>
          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              icon={<ShoppingBag className="h-4 w-4" />}
              label={t('productName')}
              value={request.name.en}
            />
            <DetailItem
              icon={<ShoppingBag className="h-4 w-4" />}
              label={t('arabicName')}
              value={request.name.ar}
            />
            <DetailItem
              icon={<DollarSign className="h-4 w-4" />}
              label={t('price')}
              value={`$${request.price.toFixed(2)}`}
            />
            <DetailItem
              icon={<Tag className="h-4 w-4" />}
              label={t('category')}
              value={request.category}
            />
            <div className="sm:col-span-2">
              <DetailItem
                icon={<FileText className="h-4 w-4" />}
                label={t('description')}
                value={request.deion.en}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={ClipboardList} title={t('ingredients')}>
          <div className="flex flex-wrap gap-2">
            {request.ingredients.map((ing, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {ing.en}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={AlertTriangle} title={t('nutritionFacts')}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('calories')}
              value={`${request.nutrition.calories} kcal`}
            />
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('protein')}
              value={`${request.nutrition.protein}g`}
            />
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('carbohydrates')}
              value={`${request.nutrition.carbohydrates}g`}
            />
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('fat')}
              value={`${request.nutrition.fat}g`}
            />
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('sugar')}
              value={`${request.nutrition.sugar}g`}
            />
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('sodium')}
              value={`${request.nutrition.sodium}mg`}
            />
          </div>
        </SectionCard>

        <SectionCard icon={Store} title={t('vendorInformation')}>
          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              icon={<Store className="h-4 w-4" />}
              label={t('storeName')}
              value={request.vendorName.en}
            />
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('currentStatus')}
              value={request.status}
            />
            <DetailItem
              icon={<AlertTriangle className="h-4 w-4" />}
              label={t('glutenStatus')}
              value={request.glutenStatus}
            />
            {request.rejectionReason && (
              <div className="sm:col-span-2">
                <DetailItem
                  icon={<X className="h-4 w-4" />}
                  label={t('rejectionReason')}
                  value={request.rejectionReason.en}
                />
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard icon={FileText} title={t('certificate')}>
          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              icon={<FileText className="h-4 w-4" />}
              label={t('certificate')}
              value={request.certificate.label.en}
            />
            <DetailItem
              icon={<CalendarDays className="h-4 w-4" />}
              label={t('expiryDate')}
              value={request.certificate.expiryDate}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(request.certificate.url, '_blank')}
            >
              <Eye className="mr-1.5 h-4 w-4" />
              {request.certificate.type === 'pdf' ? t('viewPdf') : t('preview')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(request.certificate.url, '_blank')}
            >
              <Download className="mr-1.5 h-4 w-4" />
              {t('downloadPdf')}
            </Button>
          </div>
        </SectionCard>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={() => setRejectOpen(true)}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="mr-1.5 h-4 w-4" />
            {t('rejected')}
          </Button>
          <Button
            onClick={() => setApproveOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Check className="mr-1.5 h-4 w-4" />
            {t('approved')}
          </Button>
        </div>
      </div>

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
    </div>
  )
}

export default ProductApprovalDetailsPage
