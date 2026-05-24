import React from "react"
import { useTranslation } from "react-i18next"
import { ProductApprovalRequest } from "@/data/productApproval.data"
import { Package, Tag, Calendar, AlertCircle } from "lucide-react"

interface ProductInfoCardProps {
  product: ProductApprovalRequest
}

const ProductInfoCard: React.FC<ProductInfoCardProps> = ({ product }) => {
  const { t } = useTranslation('productApproval')

  const FieldItem = ({ icon: Icon, label, value }: { icon?: React.ElementType; label: string; value: string | React.ReactNode }) => (
    <div className="flex items-start gap-3 rounded-xl bg-primary/5 p-3 transition-all ">
      {Icon && <Icon className="mt-0.5 h-4 w-4 text-primary" />}
      <div className="flex-1">
        <p className="text-xs font-medium text-text-secondary">{label}</p>
        <p className="text-sm font-medium text-text">{value}</p>
      </div>
    </div>
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-text flex items-center gap-2">
        <Package className="h-5 w-5 text-primary" />
        {t("productInformation")}
      </h2>
      
      <div className="grid gap-3 sm:grid-cols-2">
        <FieldItem icon={Tag} label={t("productName")} value={product.name.en} />
        <FieldItem icon={Tag} label={t("arabicName")} value={product.name.ar} />
        <FieldItem icon={Tag} label={t("price")} value={`${product.price} SAR`} />
        <FieldItem icon={Tag} label={t("category")} value={product.category} />
        <FieldItem icon={AlertCircle} label={t("glutenStatus")} value={product.glutenStatus} />
        <FieldItem icon={Calendar} label={t("submittedDate")} value={product.submittedDate} />
      </div>
      
      <div className="mt-4 rounded-xl p-4 bg-primary/5">
        <p className="mb-2 text-sm font-medium text-text">{t("description")}</p>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium text-primary">EN:</span> {product.deion.en}</p>
          <p><span className="font-medium text-primary">AR:</span> {product.deion.ar}</p>
        </div>
      </div>
      
      {product.customization && product.customization.length > 0 && (
        <div className="mt-4 rounded-xl bg-primary/5 to-transparent p-4">
          <p className="mb-2 text-sm font-medium text-text">{t("customization")}</p>
          <ul className="space-y-1">
            {product.customization.map((item, index) => (
              <li key={index} className="text-sm text-text-secondary">
                • {item.name.en} / {item.name.ar}: +{item.price} SAR
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProductInfoCard