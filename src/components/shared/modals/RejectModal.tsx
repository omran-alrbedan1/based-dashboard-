import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { X, Ban } from 'lucide-react'
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

interface RejectModalProps {
  open: boolean
  onConfirm: (reason?: string) => void
  onClose: () => void
  loading?: boolean
  name: string
}

const RejectModal: React.FC<RejectModalProps> = ({
  open,
  onConfirm,
  onClose,
  loading,
  name,
}) => {
  const { t } = useTranslation('common')

  const rejectSchema = z.object({
    reason: z.string().max(255, 'Reason is too long').optional(),
  })

  type RejectFormValues = z.infer<typeof rejectSchema>

  const form = useForm<RejectFormValues>({
    resolver: zodResolver(rejectSchema),
    defaultValues: { reason: '' },
  })

  const handleSubmit = (data: RejectFormValues) => {
    onConfirm(data.reason)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <div className="flex items-center gap-3 rtl:text-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-red-500/20 to-red-500/10">
                  <Ban className="h-5 w-5 text-red-600" />
                </div>
                <div className="space-y-1">
                  <DialogTitle className="text-xl">{t('modals.reject.title')}</DialogTitle>
                  <DialogDescription>
                    {t('modals.reject.description', { name })}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="py-4">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                placeholder={t('modals.reject.reasonPlaceholder')}
                disabled={loading}
                rows={4}
                maxLength={255}
                containerClassName="space-y-2 "
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-2 mt-4 w-fit ml-auto">
              <CancelButton
                onClick={onClose}
                disabled={loading}
                text={t('modals.cancel')}
                icon={<X className="h-4 w-4" />}
              />
              <SubmitButton
                isLoading={loading}
                text={t('modals.reject.confirm')}
                loadingText={t('modals.processing')}
                icon={<Ban className="h-4 w-4" />}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RejectModal
