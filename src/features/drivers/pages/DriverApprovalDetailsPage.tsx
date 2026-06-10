import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Truck,
  User,
  Mail,
  Phone,
  CalendarDays,
  MoreVertical,
  Check,
  X,
  Car,
  Palette,
  Hash,
  IdCard,
  Briefcase,
  Navigation,
  Building2,
  CreditCard,
  PhoneCall,
  ShieldCheck,
  Eye,
  Download,
  Home,
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
import { images } from '@/constants/images'
import { useDriverApprovalRequest } from '../hooks/useDriverApprovalRequest'
import { DriverApprovalDetailsSkeleton } from '../components'
import { calculateAge, downloadDocument } from '@/lib/helpers'
import { DOCUMENT_META } from '../configs/driverApproval.config'
import { DetailItem, SectionCard } from '@/components/shared/cards/SectionCard'

const DriverApprovalDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()
  const { t } = useTranslation('drivers')

  const { request, loading, error, updateStatus, refetch } = useDriverApprovalRequest(id)

  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [processing, setProcessing] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <PageHeader
          title={t('driverApproval.title')}
          description={t('driverApproval.description')}
          showBackButton
          backButtonLabel={t('driverApprovalCard.viewDetails')}
          onBackClick={() => navigate('/admin/driver-approval')}
        />
        <div className="mt-6">
          <DriverApprovalDetailsSkeleton />
        </div>
      </div>
    )
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <PageHeader
          title={t('driverApproval.title')}
          description={t('driverApproval.description')}
          showBackButton
          backButtonLabel={t('driverApprovalCard.viewDetails')}
          onBackClick={() => navigate('/admin/driver-approval')}
        />
        <div className='mt-4'>

          <EmptyState
            title={t('driverApproval.title')}
            description={error || t('table.noDrivers')}
            icon={Truck}
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


  const age = calculateAge(request.dateOfBirth)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <PageHeader
          title={request.driverName}
          description={t('driverApproval.title')}
          showBackButton
          backButtonLabel={t('driverApprovalCard.viewDetails')}
          onBackClick={() => navigate('/admin/driver-approval')}
          rightContent={<DropdownMenu>
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
          </DropdownMenu>}
        />
      </div>

      <div className="mx-auto  px-4 sm:px-6 lg:px-8 mt-6 pb-8 space-y-6">
        <Card className="overflow-hidden border border-border/60 rounded-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                {request.avatar ? (
                  <img src={request.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <img src={images.avatarPlaceholder} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h2 className="text-2xl font-bold text-text">{request.driverName}</h2>
                </div>
                <p className="text-sm text-text-secondary mt-1">{request.id}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-sm text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {request.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {request.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {t('driverApprovalCard.submittedDate')}: {new Date(request.submittedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== Personal Information ===== */}
        <SectionCard icon={User} title={t('approvalDetails.sectionPersonal')}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              icon={<User className="h-4 w-4" />}
              label={t('driverApprovalCard.driverName')}
              value={request.driverName}
            />
            <DetailItem
              icon={<Mail className="h-4 w-4" />}
              label={t('driverApprovalCard.email')}
              value={request.email}
            />
            <DetailItem
              icon={<Phone className="h-4 w-4" />}
              label={t('driverApprovalCard.phone')}
              value={request.phone}
            />
            <DetailItem
              icon={<User className="h-4 w-4" />}
              label={t('approvalDetails.gender')}
              value={t(`approvalDetails.${request.gender}`)}
            />
            <DetailItem
              icon={<CalendarDays className="h-4 w-4" />}
              label={t('approvalDetails.dateOfBirth')}
              value={`${new Date(request.dateOfBirth).toLocaleDateString()} (${age} years)`}
            />
            <DetailItem
              icon={<IdCard className="h-4 w-4" />}
              label={t('approvalDetails.nationalId')}
              value={request.nationalId}
            />
            <div className="sm:col-span-2 lg:col-span-3">
              <DetailItem
                icon={<Home className="h-4 w-4" />}
                label={t('driverApprovalCard.address')}
                value={request.address}
              />
            </div>
          </div>
        </SectionCard>

        {/* ===== Vehicle Information ===== */}
        <SectionCard icon={Truck} title={t('approvalDetails.sectionVehicle')}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              icon={<Car className="h-4 w-4" />}
              label={t('driverApprovalCard.vehicleType')}
              value={request.vehicleType}
            />
            <DetailItem
              icon={<Briefcase className="h-4 w-4" />}
              label={t('approvalDetails.vehicleModel')}
              value={request.vehicleModel}
            />
            <DetailItem
              icon={<Palette className="h-4 w-4" />}
              label={t('approvalDetails.vehicleColor')}
              value={request.vehicleColor}
            />
            <DetailItem
              icon={<Hash className="h-4 w-4" />}
              label={t('approvalDetails.vehiclePlate')}
              value={request.vehiclePlate}
            />
            <div className="sm:col-span-2">
              <DetailItem
                icon={<IdCard className="h-4 w-4" />}
                label={t('approvalDetails.licenseNumber')}
                value={request.licenseNumber}
              />
            </div>
          </div>
        </SectionCard>

        {/* ===== Documents ===== */}
        <SectionCard icon={ShieldCheck} title={t('approvalDetails.sectionDocuments')}>
          <div className="grid gap-4 sm:grid-cols-2">
            {['national_id', 'driving_license', 'vehicle_license', 'insurance'].map((type) => {
              const doc = request.documents.find((d) => d.type === type)
              const meta = DOCUMENT_META[type]

              return (
                <div
                  key={type}
                  className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border/60 bg-background-secondary/50 p-3 sm:p-4"
                >
                  <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center p-2 sm:p-2.5 shrink-0">
                    <img src={meta.icon} alt="" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text text-sm">{meta.label}</p>
                    {doc?.uploaded_at && (
                      <p className="text-xs text-text-secondary mt-0.5">
                        {t('documents.uploaded')}: {new Date(doc.uploaded_at).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <button
                        type="button"
                        //@ts-ignore
                        onClick={() => window.open(doc.url, '_blank')}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <Eye className="h-3 w-3" />
                        {t('approvalDetails.documentPreview')}
                      </button>
                      <button
                        type="button"
                        //@ts-ignore
                        onClick={() => downloadDocument(doc.url, `${type}.pdf`)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        {t('approvalDetails.documentDownload')}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>

        {/* ===== Additional Information ===== */}
        <SectionCard icon={Briefcase} title={t('approvalDetails.sectionAdditional')}>
          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              icon={<Briefcase className="h-4 w-4" />}
              label={t('approvalDetails.experience')}
              value={t('approvalDetails.experienceYears', { count: request.experience })}
            />
            <DetailItem
              icon={<Navigation className="h-4 w-4" />}
              label={t('approvalDetails.preferredAreas')}
              value={request.preferredAreas.join(', ')}
            />
            <DetailItem
              icon={<Building2 className="h-4 w-4" />}
              label={t('approvalDetails.bankName')}
              value={request.bankName}
            />
            <DetailItem
              icon={<CreditCard className="h-4 w-4" />}
              label={t('approvalDetails.iban')}
              value={request.iban}
            />
            <hr className="sm:col-span-2 border-border/50 my-1" />
            <p className="sm:col-span-2 text-sm font-semibold text-text flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-primary" />
              {t('approvalDetails.emergencyContact')}
            </p>
            <DetailItem
              icon={<User className="h-4 w-4" />}
              label={t('approvalDetails.emergencyContactName')}
              value={request.emergencyContactName}
            />
            <DetailItem
              icon={<Phone className="h-4 w-4" />}
              label={t('approvalDetails.emergencyContactPhone')}
              value={request.emergencyContactPhone}
            />
          </div>
        </SectionCard>


        {/* ===== Bottom Actions ===== */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={() => setRejectOpen(true)}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="mr-1.5 h-4 w-4" />
            {t('status.rejected')}
          </Button>
          <Button
            onClick={() => setApproveOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Check className="mr-1.5 h-4 w-4" />
            {t('status.approved')}
          </Button>
        </div>
      </div>

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
    </div>
  )
}


export default DriverApprovalDetailsPage
