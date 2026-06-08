import { useTranslation } from 'react-i18next'
import { X, Check, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CancelButton, SubmitButton } from '@/components/shared/buttons'

interface ApproveModalProps {
  open: boolean
  onConfirm: () => void
  onClose: () => void
  loading?: boolean
  name: string
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  open,
  onConfirm,
  onClose,
  loading,
  name,
}) => {
  const { t } = useTranslation('common')

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Centered Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            
            {/* Title */}
            <DialogTitle className="text-xl">
              {t('modals.approve.title')}
            </DialogTitle>
            
            {/* Description */}
            <DialogDescription>
              {t('modals.approve.description', { name })}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Actions */}
        <DialogFooter className="gap-2 sm:gap-2 mt-6 w-fit mx-auto">
          <CancelButton
            onClick={onClose}
            disabled={loading}
            text={t('modals.cancel')}
            icon={<X className="h-4 w-4" />}
            className="flex-1"
          />
          <SubmitButton
            onClick={onConfirm}
            isLoading={loading}
            text={t('modals.approve.confirm')}
            loadingText={t('modals.processing')}
            icon={<Check className="h-4 w-4" />}
            className="bg-green-600 hover:bg-green-700 focus:ring-green-500 flex-1"
          />
        </DialogFooter>

        {/* Hint - under the footer with icon */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5 text-red-400" />
            <span>{t('modals.approve.hint')}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveModal