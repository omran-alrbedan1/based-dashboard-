import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, Sparkles, Star, X } from "lucide-react"
import { images } from "@/constants/images"
import { CancelButton, SubmitButton } from "@/components/shared/buttons"

interface ApproveDialogProps {
  onConfirm: () => void
}

const ApproveDialog: React.FC<ApproveDialogProps> = ({ onConfirm }) => {
  const { t } = useTranslation('productApproval')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      setOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className="group relative w-full justify-start px-2 overflow-hidden"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <CheckCircle className="relative z-10 mr-2 h-4 w-4 text-primary transition-transform group-hover:scale-110" />
        <span className="relative z-10 text-primary font-medium">
          {t("approve")}
        </span>
      </Button>

      <DialogContent className="sm:max-w-md overflow-hidden p-0">
        {/* Image Section */}
        <div className="relative pt-8 pb-4 px-6">
          <div className="relative flex justify-center">
            <div className="relative group">
              <img
                src={images.approve}
                alt="Approval Illustration"
                className="relative w-56 h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-center text-primary">
              {t("approveDialogTitle")}
            </DialogTitle>

            <DialogDescription className="text-center text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("approveDialogMessage")}
            </DialogDescription>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 gap-2 mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {t("benefitVisibleToCustomers")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {t("benefitVendorNotification")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-3 w-3 text-primary" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {t("benefitBoostRanking")}
                </span>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="mt-6 gap-3 flex flex-row">
            <CancelButton
              text={t("cancel")}
              icon={<X className="h-4 w-4" />}
              onClick={handleCancel}
              className="flex-1"
            />
            <SubmitButton
              isLoading={isLoading}
              loadingText={t("confirming")}
              text={t("confirmApproval")}
              icon={<CheckCircle className="h-4 w-4" />}
              className="flex-1"
              onClick={handleConfirm}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveDialog  