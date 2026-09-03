import { useTranslation } from "react-i18next"
import { useWatch } from "react-hook-form"
import { ClipboardList, Fuel, Boxes } from "lucide-react"
import type { Control, FieldValues, Path } from "react-hook-form"
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField"
import type { Option } from "@/types/customFormField.types"

const REASON_KEYS = [
  "oil_change",
  "diagnostics",
  "periodic_service",
  "repair",
  "tires",
  "brakes",
  "other",
]

const FUEL_LEVEL_KEYS = [
  "empty",
  "quarter",
  "half",
  "three_quarters",
  "full",
]

interface VisitSectionProps<T extends FieldValues> {
  control: Control<T>
}

export const VisitSection = <T extends FieldValues>({
  control,
}: VisitSectionProps<T>) => {
  const { t } = useTranslation("maintenance")
  const visitReason = useWatch({ control, name: "visitReason" as Path<T> }) as
    | string
    | undefined

  const reasonOptions: Option[] = REASON_KEYS.map((key) => ({
    value: key,
    label: t(`reason.options.${key}`),
  }))

  const fuelLevelOptions: Option[] = FUEL_LEVEL_KEYS.map((key) => ({
    value: key,
    label: t(`condition.fuelLevels.${key}`),
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={control}
          name={"visitReason" as Path<T>}
          label={t("reason.title")}
          required
          options={reasonOptions}
          leftIcon={ClipboardList}
          iconPosition="left"
          dir="rtl"
        />

        {visitReason === "other" && (
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name={"otherReason" as Path<T>}
            label={t("reason.otherReason")}
            placeholder={t("reason.otherReason")}
            required
            dir="rtl"
          />
        )}
      </div>

      <CustomFormField
        fieldType={FormFieldType.TEXTAREA}
        control={control}
        name={"complaint" as Path<T>}
        label={t("reason.complaint")}
        placeholder={t("reason.complaint")}
        rows={3}
        dir="rtl"
      />

      <div className="border-t border-border pt-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
          <Fuel className="h-4 w-4 text-primary" />
          {t("condition.title")}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={control}
            name={"fuelLevel" as Path<T>}
            label={t("condition.fuelLevel")}
            options={fuelLevelOptions}
            dir="rtl"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name={"externalCondition" as Path<T>}
            label={t("condition.externalCondition")}
            dir="rtl"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name={"tires" as Path<T>}
            label={t("condition.tires")}
            dir="rtl"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name={"battery" as Path<T>}
            label={t("condition.battery")}
            dir="rtl"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name={"glass" as Path<T>}
            label={t("condition.glass")}
            dir="rtl"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name={"body" as Path<T>}
            label={t("condition.body")}
            dir="rtl"
          />

          <div className="sm:col-span-2">
            <CustomFormField
              fieldType={FormFieldType.SWITCH}
              control={control}
              name={"warningLights" as Path<T>}
              label={t("condition.warningLights")}
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={control}
            name={"otherNotes" as Path<T>}
            label={t("condition.otherNotes")}
            placeholder={t("condition.otherNotes")}
            rows={2}
            dir="rtl"
          />
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
          <Boxes className="h-4 w-4 text-primary" />
          {t("itemsLeft.title")}
        </h3>
        <CustomFormField
          fieldType={FormFieldType.TAG_INPUT}
          control={control}
          name={"itemsLeft" as Path<T>}
          placeholder={t("itemsLeft.placeholder")}
          dir="rtl"
        />
      </div>
    </div>
  )
}
