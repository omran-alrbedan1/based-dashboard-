import React from "react"
import { useTranslation } from "react-i18next"
import { VendorRecord } from "@/data/productApproval.data"
import { Store, Mail, Phone, Calendar } from "lucide-react"

interface VendorInfoCardProps {
  vendor: VendorRecord
}

const VendorInfoCard: React.FC<VendorInfoCardProps> = ({ vendor }) => {
  const { t } = useTranslation('productApproval')

  const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
    <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-3 transition-all hover:bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
      <div className="flex-1">
        <p className="text-xs font-medium text-text-secondary">{label}</p>
        <p className="text-sm font-medium text-text">{value}</p>
      </div>
    </div>
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-text flex items-center gap-2">
        <Store className="h-5 w-5 text-primary" />
        {t("vendorInformation")}
      </h2>

      <div className="space-y-3">
        <InfoRow
          icon={Store}
          label={t("storeName")}
          value={`${vendor.storeName.en} / ${vendor.storeName.ar}`}
        />
        <InfoRow icon={Mail} label={t("vendorEmail")} value={vendor.email} />
        <InfoRow icon={Phone} label={t("phoneNumber")} value={vendor.phone} />
        <InfoRow icon={Calendar} label={t("registrationDate")} value={vendor.registrationDate} />
      </div>
    </div>
  )
}

export default VendorInfoCard