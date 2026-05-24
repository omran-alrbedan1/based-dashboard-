import React from "react"
import { useTranslation } from "react-i18next"
import { ProductApprovalStatus, GlutenStatus, LocalizedString } from "@/data/productApproval.data"
import StatusBadge from "../shared/badges/StatusBadge"
import { AlertTriangle, Shield } from "lucide-react"

interface ProductStatusCardProps {
  status: ProductApprovalStatus
  glutenStatus: GlutenStatus
  rejectionReason?: LocalizedString
}

const ProductStatusCard: React.FC<ProductStatusCardProps> = ({ status, glutenStatus, rejectionReason }) => {
  const { t } = useTranslation('productApproval')

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-text flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        {t("productStatus")}
      </h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4">
          <span className="text-sm text-text-secondary">{t("currentStatus")}</span>
          <StatusBadge status={status} size="md" />
        </div>
        
        <div className="rounded-xl bg-primary/5 p-4">
          <p className="mb-1 text-sm font-medium text-text flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            {t("glutenStatus")}
          </p>
          <p className="text-sm text-text-secondary">{glutenStatus}</p>
        </div>
        
        {status === "Rejected" && rejectionReason && (
          <div className="rounded-xl border-l-4 border-l-red-500 bg-red-50 p-4">
            <p className="mb-2 text-sm font-semibold text-red-800">{t("rejectionReason")}</p>
            <p className="text-sm text-red-700"><strong>EN:</strong> {rejectionReason.en}</p>
            <p className="mt-1 text-sm text-red-700"><strong>AR:</strong> {rejectionReason.ar}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductStatusCard