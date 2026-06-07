'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { MessageSquare, Send, User, Phone, X } from "lucide-react"
import type { Driver } from "../types/drivers.types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "@/components/shared/inputs/CustomFormField"
import { z } from "zod"
import { CancelButton, SubmitButton } from "@/components/shared/buttons"

interface SendMessageModalProps {
  driver: Driver
  onConfirm: (message: string) => void
  onClose: () => void
  loading: boolean
}

export const SendMessageModal: React.FC<SendMessageModalProps> = ({
  driver,
  onConfirm,
  onClose,
  loading,
}) => {
  const { t } = useTranslation('drivers')

  const sendMessageSchema = z.object({
    message: z.string()
      .min(1, t('sendMessage.validation.messageRequired'))
      .max(500, t('sendMessage.validation.messageTooLong'))
  })
  
  type SendMessageFormValues = z.infer<typeof sendMessageSchema>

  const form = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      message: "",
    },
  })

  const handleSubmit = (data: SendMessageFormValues) => {
    onConfirm(data.message)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <div className="flex items-center gap-3 rtl:text-start">
                <div className="rounded-xl bg-linear-to-br from-primary/20 to-primary/10 p-2.5">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-xl">
                    {t('sendMessage.title')}
                  </DialogTitle>
                  <DialogDescription>
                    {t('sendMessage.description')}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Driver Info Section */}
              <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {t('sendMessage.to')}
                  </p>
                  <p className="font-semibold text-foreground">
                    {driver.name}
                  </p>
                </div>
                {driver.phone && (
                  <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {t('sendMessage.phone')}
                  </p>
                  <p className="font-semibold text-xs text-foreground">
                    {driver.phone}
                  </p>
                </div>
                  </>
                )}
              </div>

              {/* Message Input using CustomFormField */}
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="message"
                label={t('sendMessage.message')}
                placeholder={t('sendMessage.placeholder')}
                disabled={loading}
                required
                rows={5}
                maxLength={500}
                description={t('sendMessage.messageHint')}  
                containerClassName="space-y-2"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <CancelButton
                onClick={onClose}
                disabled={loading}
                text={t('sendMessage.cancel')}
                icon={<X className="h-4 w-4" />}
              />
              <SubmitButton
                isLoading={loading}
                text={t('sendMessage.send')}
                loadingText={t('sendMessage.sending')}
                icon={<Send className="h-4 w-4" />}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}