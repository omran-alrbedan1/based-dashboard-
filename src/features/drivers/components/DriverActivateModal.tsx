import { useTranslation } from 'react-i18next'
import { AlertTriangle, X, Check } from 'lucide-react'
import type { Driver } from '../types/drivers.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CancelButton, SubmitButton } from '@/components/shared/buttons'

interface DriverActivateModalProps {
  driver: Driver | null
  onConfirm: () => void
  onClose: () => void
  loading?: boolean
}

const DriverActivateModal: React.FC<DriverActivateModalProps> = ({ driver, onConfirm, onClose, loading }) => {
  const { t } = useTranslation('drivers')

  if (!driver) return null

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 text-green-500">
              <AlertTriangle size={20} />
            </div>
            <div>
              <DialogTitle className="text-xl">{t('toggleModal.activateTitle')}</DialogTitle>
              <DialogDescription>
                {t('toggleModal.activateDescription', { driverName: driver.name })}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-2 mt-4 w-fit ltr:ml-auto rtl:mr-auto">
          <CancelButton
            onClick={onClose}
            disabled={loading}
            text={t('toggleModal.cancel')}
            icon={<X className="h-4 w-4" />}
          />
          <SubmitButton
            onClick={onConfirm}
            isLoading={loading}
            text={t('toggleModal.activate')}
            loadingText={t('toggleModal.processing')}
            icon={<Check className="h-4 w-4" />}
            className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DriverActivateModal