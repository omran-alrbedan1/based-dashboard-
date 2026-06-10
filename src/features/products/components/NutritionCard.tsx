import React from "react"
import { useTranslation } from "react-i18next"
import { NutritionRecord } from "@/features/products/data/products.data"
import { Activity } from "lucide-react"

interface NutritionCardProps {
  nutrition: NutritionRecord
}

const NutritionCard: React.FC<NutritionCardProps> = ({ nutrition }) => {
  const { t } = useTranslation('products')

  const nutritionItems = [
    { key: "calories", label: t("calories"), value: nutrition.calories, unit: "kcal" },
    { key: "protein", label: t("protein"), value: nutrition.protein, unit: "g" },
    { key: "fat", label: t("fat"), value: nutrition.fat, unit: "g" },
    { key: "sugar", label: t("sugar"), value: nutrition.sugar, unit: "g" },
    { key: "sodium", label: t("sodium"), value: nutrition.sodium, unit: "mg" },
    { key: "carbohydrates", label: t("carbohydrates"), value: nutrition.carbohydrates, unit: "g" },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-text flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        {t("nutritionFacts")}
      </h2>
      <div className="space-y-1">
        {nutritionItems.map((item) => (
          <div key={item.key} className="flex justify-between items-center border-b border-border py-3 last:border-b-0">
            <span className="text-sm text-text-secondary">{item.label}</span>
            <span className="text-sm font-semibold text-text">
              {item.value} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NutritionCard