import React from "react"
import { useTranslation } from "react-i18next"
import { LocalizedString } from "@/features/products/data/products.data"
import { CheckCircle2 } from "lucide-react"

interface IngredientsCardProps {
  ingredients: LocalizedString[]
}

const IngredientsCard: React.FC<IngredientsCardProps> = ({ ingredients }) => {
  const { t } = useTranslation('products')

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-text flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        {t("ingredients")}
      </h2>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="group flex items-center gap-3 rounded-xl border border-border p-3 transition-all hover:border-primary/20 hover:shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <div className="flex-1 flex justify-between items-center">
              <span className="text-sm font-medium text-text">{ingredient.en}</span>
              <span className="text-sm text-text-secondary">{ingredient.ar}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IngredientsCard