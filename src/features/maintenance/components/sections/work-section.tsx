import { useTranslation } from "react-i18next"
import { useFieldArray, useWatch } from "react-hook-form"
import { Plus, Trash2, Wrench, Calculator, CircleDollarSign, User } from "lucide-react"
import type { Control, FieldValues, Path } from "react-hook-form"
import { Button } from "@/components/ui/button"
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField"
import type { Option } from "@/types/customFormField.types"
import { WORK_STATUSES } from "../../types/work-item.types"
import { formatCurrency } from "@/lib/formatter"

const WORK_STATUS_KEYS: Record<string, string> = {
  pending: "work.statuses.pending",
  in_progress: "work.statuses.in_progress",
  completed: "work.statuses.completed",
  cancelled: "work.statuses.cancelled",
}

interface WorkSectionProps<T extends FieldValues> {
  control: Control<T>
}

export const WorkSection = <T extends FieldValues>({
  control,
}: WorkSectionProps<T>) => {
  const { t } = useTranslation("maintenance")
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workItems" as Path<T>,
  })

  const workItems = useWatch({ control, name: "workItems" as Path<T> }) as
    | Array<{ estimatedCost?: number | ""; quantity?: number | "" }>
    | undefined

  const total = (workItems ?? []).reduce((sum, item) => {
    const cost = Number(item.estimatedCost) || 0
    const qty = Number(item.quantity) || 1
    return sum + cost * qty
  }, 0)

  const statusOptions: Option[] = WORK_STATUSES.map((status) => ({
    value: status,
    label: t(WORK_STATUS_KEYS[status]),
  }))

  const addRow = () =>
    append({
      description: "",
      estimatedCost: "",
      quantity: "",
      progress: 0,
      assignee: "",
      status: "pending",
      isRequired: false,
    } as never)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <Wrench className="h-4 w-4 text-primary" />
          {t("work.title")}
        </h3>
        <Button type="button" variant="outline" size="sm" onClick={addRow} className="gap-1.5">
          <Plus className="h-4 w-4" />
          {t("work.addRow")}
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
          {t("work.noWork")}
        </p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-3 rounded-lg border border-border bg-muted/20 p-3 sm:grid-cols-2 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name={`workItems.${index}.description` as Path<T>}
                  label={t("work.description")}
                  placeholder={t("work.description")}
                  required
                  dir="rtl"
                />
              </div>
              <div className="lg:col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  control={control}
                  name={`workItems.${index}.estimatedCost` as Path<T>}
                  label={t("work.estimate")}
                  min={0}
                  dir="ltr"
                />
              </div>
              <div className="lg:col-span-1">
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  control={control}
                  name={`workItems.${index}.quantity` as Path<T>}
                  label={t("work.quantity")}
                  min={0}
                  dir="ltr"
                />
              </div>
              <div className="lg:col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={control}
                  name={`workItems.${index}.status` as Path<T>}
                  label={t("work.status")}
                  options={statusOptions}
                  dir="rtl"
                />
              </div>
              <div className="lg:col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name={`workItems.${index}.assignee` as Path<T>}
                  label={t("work.assignee")}
                  leftIcon={User}
                  iconPosition="left"
                  dir="rtl"
                />
              </div>
              <div className="flex items-end justify-between gap-2 lg:col-span-2">
                <CustomFormField
                  fieldType={FormFieldType.SWITCH}
                  control={control}
                  name={`workItems.${index}.isRequired` as Path<T>}
                  label={t("work.required")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => remove(index)}
                  aria-label={t("work.addRow")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calculator className="h-4 w-4 text-primary" />
          {t("work.total")}
        </span>
        <span className="flex items-center gap-1.5 text-base font-semibold text-text-primary">
          <CircleDollarSign className="h-4 w-4 text-primary" />
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  )
}
