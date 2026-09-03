import { useTranslation } from "react-i18next"
import { User, CircleDollarSign, BadgeCheck } from "lucide-react"
import type { Control, FieldValues, Path } from "react-hook-form"
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField"

interface DeliverySectionProps<T extends FieldValues> {
  control: Control<T>
}

export const DeliverySection = <T extends FieldValues>({
  control,
}: DeliverySectionProps<T>) => {
  const { t } = useTranslation("maintenance")

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <BadgeCheck className="h-4 w-4 text-primary" />
        {t("approval.title")}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <CustomFormField
            fieldType={FormFieldType.SWITCH}
            control={control}
            name={"approved" as Path<T>}
            label={t("approval.approved")}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={"approvalAmount" as Path<T>}
          label={t("approval.amount")}
          min={0}
          leftIcon={CircleDollarSign}
          iconPosition="left"
          dir="ltr"
        />

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={control}
          name={"deliveryDate" as Path<T>}
          label={t("approval.deliveryDate")}
          dateOptions={{ placeholder: t("approval.deliveryDate") }}
          dir="rtl"
        />

        <CustomFormField
          fieldType={FormFieldType.TIME_PICKER}
          control={control}
          name={"deliveryTime" as Path<T>}
          label={t("approval.deliveryTime")}
          timeOptions={{ placeholder: t("approval.deliveryTime") }}
          dir="rtl"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name={"receiverName" as Path<T>}
          label={t("approval.receiver")}
          placeholder={t("approval.receiver")}
          leftIcon={User}
          iconPosition="left"
          dir="rtl"
        />
      </div>
    </div>
  )
}
