"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { XCircle, MessageCircle, Languages } from "lucide-react"
import { CancelButton, SubmitButton } from "../shared/buttons"
import CustomFormField, { FormFieldType } from "@/components/shared/inputs/CustomFormField"
import { cn } from "@/lib/utils"

interface RejectDialogProps {
  onConfirm: (reasonEn: string, reasonAr: string) => void
}

interface RejectFormValues {
  reasonEn: string
  reasonAr: string
}

const RejectDialog: React.FC<RejectDialogProps> = ({ onConfirm }) => {
  const { t } = useTranslation('productApproval')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectFormValues>({
    defaultValues: {
      reasonEn: "",
      reasonAr: "",
    },
  })

  const onSubmit = async (data: RejectFormValues) => {
    if (!data.reasonEn.trim() || !data.reasonAr.trim()) {
      return
    }

    setIsLoading(true)
    try {
      await onConfirm(data.reasonEn.trim(), data.reasonAr.trim())
      reset()
      setOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  
        <Button
          className="w-full justify-start px-2 text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <XCircle className="mr-2 h-4 w-4" />
          {t("reject")}
        </Button>

      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("rejectDialogTitle")}</DialogTitle>
            <DialogDescription>
              {t("rejectDialogSubtitle")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <CustomFormField
              control={control}
              name="reasonEn"
              fieldType={FormFieldType.TEXTAREA}
              label={t("rejectionReasonEn")}
              placeholder={t("rejectionReasonEnPlaceholder")}
              required
              rows={3}
              leftIcon={MessageCircle}
              inputClassName={cn(errors.reasonEn && "border-red-500 focus:ring-red-500")}
            />

            <CustomFormField
              control={control}
              name="reasonAr"
              fieldType={FormFieldType.TEXTAREA}
              label={t("rejectionReasonAr")}
              labelClassName="!mb-3"
              placeholder={t("rejectionReasonArPlaceholder")}
              required
              rows={3}
              leftIcon={Languages}
              dir="rtl"
              inputClassName={cn(
                "rtl",
                errors.reasonAr && "border-red-500 focus:ring-red-500"
              )}
            />
          </div>

          <DialogFooter className="mt-6">
            <CancelButton
              text={t("cancel")}
              onClick={handleCancel}
              type="button"
            />
            <SubmitButton
              isLoading={isLoading}
              loadingText={t("rejecting")}
              text={t("confirmReject")}
              icon={<XCircle className="h-4 w-4" />}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RejectDialog