import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X, Ban, Store } from 'lucide-react';
import type { Driver } from '../types/drivers.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/shared/inputs/CustomFormField'
import { CancelButton, SubmitButton } from '@/components/shared/buttons'

interface DriverSuspendModalProps {
  driver: Driver | null
  onConfirm: (reason?: string) => void
  onClose: () => void
  loading?: boolean
}

const DriverSuspendModal: React.FC<DriverSuspendModalProps> = ({ driver, onConfirm, onClose, loading }) => {
  const { t } = useTranslation('drivers')

  const suspendSchema = z.object({
    reason: z.string().max(255, t('toggleModal.validation.reasonTooLong')).optional(),
  })

  type SuspendFormValues = z.infer<typeof suspendSchema>

  const form = useForm<SuspendFormValues>({
    resolver: zodResolver(suspendSchema),
    defaultValues: {
      reason: '',
    },
  })

  const handleSubmit = (data: SuspendFormValues) => {
    onConfirm(data.reason)
  }

  if (!driver) return null

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <div className="flex items-center gap-3 rtl:text-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-red-500/10 text-red-500">
                  <AlertTriangle size={20} />
                </div>
                <div className="space-y-1">
                  <DialogTitle className="text-xl">{t('toggleModal.suspendTitle')}</DialogTitle>
                  <DialogDescription>
                    {t('toggleModal.suspendDescription', { driverName: driver.name })}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="py-4">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                placeholder={t('toggleModal.reasonPlaceholder')}
                disabled={loading}
                rows={4}
                maxLength={255}
                containerClassName="space-y-2"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-2 mt-4 w-fit ml-auto">
              <CancelButton onClick={onClose} disabled={loading} text={t('toggleModal.cancel')} icon={<X className="h-4 w-4" />} />
              <SubmitButton isLoading={loading} text={t('toggleModal.suspend')} loadingText={t('toggleModal.processing')} icon={<Ban className="h-4 w-4" />} className="bg-red-600 hover:bg-red-700 focus:ring-red-500" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DriverSuspendModal