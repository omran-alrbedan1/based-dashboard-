//@ts-nocheck
import { useState } from 'react'
import { 
  CheckCircle,
  AlertCircle,
  Eye,
  Upload,
  XCircle,
  Calendar,
  Clock,
  Download,
  RefreshCw,
  X,
  File,
  Store
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDriverDocuments } from '../hooks/useDriverDocument'
import { icons } from '@/constants/images'
import { driverService } from '../services/driver.service'
import { useQueryClient } from '@tanstack/react-query'
import { CancelButton, SubmitButton } from '@/components/shared/buttons'
import { Skeleton } from '@/components/ui/skeleton'

const DOCUMENT_TYPES: Record<string, { label: string; icon: string; title: string }> = {
  national_id: {
    label: 'documents.types.national_id',
    icon: icons.nationalId,
    title: 'National ID'
  },
  driving_license: {
    label: 'documents.types.driving_license',
    icon: icons.drivingLicense,
    title: 'Driving License'
  },
  vehicle_license: {
    label: 'documents.types.vehicle_license',
    icon: icons.vehicleLicense,
    title: 'Vehicle License'
  },
  insurance: {
    label: 'documents.types.insurance',
    icon: icons.insuranceDocument,
    title: 'Insurance'
  },
}

const DOCUMENT_ORDER = ['national_id', 'driving_license', 'vehicle_license', 'insurance']

interface DriverDocumentsProps {
  driverId: string | number
}

// Helper functions
const isDocExpired = (expiresAt: string | null | undefined): boolean => {
  if (!expiresAt) return false
  const expiryDate = new Date(expiresAt)
  const today = new Date()
  return expiryDate < today
}

const getDocumentStatus = (doc?: any): 'verified' | 'pending' | 'expired' | 'missing' => {
  if (!doc) return 'missing'
  
  if (isDocExpired(doc.expires_at)) {
    return 'expired'
  }
  
  if (doc.verified) {
    return 'verified'
  }
  
  return 'pending'
}

const DriverDocuments: React.FC<DriverDocumentsProps> = ({ driverId }) => {
  const { t, i18n } = useTranslation('drivers')
  const queryClient = useQueryClient()
  const { documents, loading, refetch } = useDriverDocuments(driverId)
  
  const [uploadingFor, setUploadingFor] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [expiryDate, setExpiryDate] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US'

  const handlePreview = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank')
    } else {
      console.error('Preview unavailable: Invalid document URL')
      setError(t('documents.errors.previewUnavailable'))
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleDownload = async (doc: any) => {
    if (!doc?.url || doc.url === '#') {
      console.error('Download failed: No document URL available')
      setError(t('documents.errors.downloadUnavailable'))
      setTimeout(() => setError(null), 3000)
      return
    }

    try {
      const response = await fetch(doc.url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${doc.type}_${driverId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      setError(t('documents.errors.downloadFailed'))
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleUploadClick = (documentType: string) => {
    setSelectedDocumentType(documentType)
    setShowUploadModal(true)
    setError(null)
    setSelectedFile(null)
    setExpiryDate('')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (file.size > maxSize) {
        setError(t('documents.errors.fileTooLarge'))
        setTimeout(() => setError(null), 3000)
        return
      }
      
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleUploadSubmit = async () => {
    if (!selectedFile || !selectedDocumentType) {
      setError(t('documents.errors.noFileSelected'))
      setTimeout(() => setError(null), 3000)
      return
    }

    setUploadingFor(selectedDocumentType)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('document', selectedFile)
      formData.append('type', selectedDocumentType)
      if (expiryDate) {
        formData.append('expiry_date', expiryDate)
      }
      
      await driverService.uploadDocument(driverId, formData)
      
      // Invalidate and refetch documents query
      await queryClient.invalidateQueries({ queryKey: ['driver-documents', driverId] })
      await refetch()
      
      // Reset modal state
      setShowUploadModal(false)
      setSelectedFile(null)
      setExpiryDate('')
      setSelectedDocumentType(null)
      setError(null)
    } catch (error) {
      console.error('Upload failed:', error)
      setError(t('documents.errors.uploadFailed'))
    } finally {
      setUploadingFor(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} className="text-green-600" />
      case 'pending':
        return <AlertCircle size={16} className="text-amber-600" />
      case 'expired':
        return <XCircle size={16} className="text-red-600" />
      case 'missing':
        return <Upload size={16} className="text-text-muted" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return t('documents.verified')
      case 'pending':
        return t('documents.pendingReview')
      case 'expired':
        return t('documents.expired')
      case 'missing':
        return t('documents.notUploaded')
      default:
        return t('documents.notAvailable')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'expired':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200'
    }
  }

  const getDaysRemaining = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="rounded-xl border border-border bg-background-secondary p-6">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="mt-4 pt-3 border-t border-border/50">
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-4">
        <img src={icons.vehicleLicense} alt="No documents" className="h-12 w-12 opacity-50" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{t('documents.noDocuments')}</h3>
      <p className="mb-6 text-sm text-text-secondary">{t('documents.noDocumentsDesc')}</p>
      <SubmitButton
        onClick={() => handleUploadClick(DOCUMENT_ORDER[0])}
        text={t('documents.uploadFirst')}
        icon={<Upload size={16} />}
        className="w-auto"
      />
    </div>
  )

  const renderDocumentCard = (type: string) => {
    const doc = documents.find((item) => item.type === type)
    const status = getDocumentStatus(doc)
    const isExpired = isDocExpired(doc?.expires_at)
    const daysRemaining = doc?.expires_at && !isExpired ? getDaysRemaining(doc.expires_at) : null
    const statusStyle = getStatusColor(status)
    const StatusIcon = getStatusIcon(status)
    const statusText = getStatusText(status)
    const isUploading = uploadingFor === type
    const DocumentIcon = DOCUMENT_TYPES[type].icon

    return (
      <div 
        key={type} 
        className="group relative overflow-hidden rounded-xl border border-border bg-background-secondary transition-all duration-300 hover:shadow-md hover:border-primary/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative p-5">
          {/* Document Icon with Primary/10 background */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
              <img 
                src={DocumentIcon} 
                alt={DOCUMENT_TYPES[type].title}
                className="h-full w-full object-contain"
              />
            </div>
            
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle} shrink-0`}>
              {StatusIcon}
              {statusText}
            </span>
          </div>
          
          {/* Document Info */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-text-primary mb-2">
              {t(DOCUMENT_TYPES[type].label)}
            </h3>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
              {doc?.expires_at && !isExpired && (
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>
                    {t('documents.expires')}: {new Date(doc.expires_at).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  {daysRemaining && daysRemaining <= 30 && (
                    <span className="ml-1 text-amber-600">
                      ({daysRemaining} {t('documents.daysLeft')})
                    </span>
                  )}
                </div>
              )}
              
              {doc?.expires_at && isExpired && (
                <div className="flex items-center gap-1 text-red-600">
                  <Clock size={12} />
                  <span>{t('documents.expiredOn')}: {new Date(doc.expires_at).toLocaleDateString(locale)}</span>
                </div>
              )}
              
              {doc?.uploaded_at && (
                <div className="flex items-center gap-1">
                  <Upload size={12} />
                  <span>{t('documents.uploaded')}: {new Date(doc.uploaded_at).toLocaleDateString(locale)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
            {doc && doc.url && doc.url !== '#' ? (
              <>
                <button
                  type="button"
                  onClick={() => handlePreview(doc.url)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-card px-3 py-1.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary flex-1 justify-center"
                >
                  <Eye size={14} />
                  {t('documents.preview')}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-card px-3 py-1.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary flex-1 justify-center"
                >
                  <Download size={14} />
                  {t('documents.download')}
                </button>
              </>
            ) : (
              <SubmitButton
                onClick={() => handleUploadClick(type)}
                isLoading={isUploading}
                loadingText={t('documents.uploading')}
                text={t('documents.upload')}
                icon={<Upload size={14} />}
                className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-dashed border-primary/50"
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-background-card overflow-hidden shadow-card">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-transparent px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-2.5">
                <File className="text-primary" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">{t('documents.title')}</h2>
                <p className="text-sm text-text-secondary mt-1">{t('documents.description')}</p>
              </div>
            </div>
            {documents.length > 0 && (
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-card px-3 py-2 text-sm text-text-secondary transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-sm"
              >
                <RefreshCw size={14} />
                {t('documents.refresh')}
              </button>
            )}
          </div>
        </div>

        {/* Error Toast */}
        {error && (
          <div className="mx-6 mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Content - Grid Layout with 2 columns */}
        <div className="p-6">
          {loading ? (
            renderSkeleton()
          ) : documents.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {DOCUMENT_ORDER.map(renderDocumentCard)}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedDocumentType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <img 
                    src={DOCUMENT_TYPES[selectedDocumentType].icon} 
                    alt={DOCUMENT_TYPES[selectedDocumentType].title}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {t('documents.uploadDocument')} {t(DOCUMENT_TYPES[selectedDocumentType].label)}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false)
                  setError(null)
                  setSelectedFile(null)
                  setExpiryDate('')
                }}
                className="rounded-lg p-1 text-text-secondary hover:bg-background hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  {t('documents.selectFile')}
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full rounded-lg border border-border bg-background p-2 text-text-primary file:mr-2 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20"
                />
                <p className="mt-1 text-xs text-text-muted">
                  {t('documents.allowedFormats')}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  {t('documents.expiryDate')} ({t('documents.optional')})
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background p-2 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border p-4">
              <CancelButton
                onClick={() => {
                  setShowUploadModal(false)
                  setError(null)
                  setSelectedFile(null)
                  setExpiryDate('')
                }}
                text={t('common.cancel')}
              />
              <SubmitButton
                onClick={handleUploadSubmit}
                disabled={!selectedFile}
                text={t('documents.upload')}
                icon={<Upload size={16} />}
                className="bg-primary hover:bg-primary-dark"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DriverDocuments