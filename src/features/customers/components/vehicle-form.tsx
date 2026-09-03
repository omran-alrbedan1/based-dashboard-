import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { Factory, Car, Hash, Fingerprint, Gauge } from "lucide-react"
import { Form } from "@/components/ui/form"
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField"
import { SubmitButton } from "@/components/shared/buttons/SubmitButton"
import type { Option } from "@/types/customFormField.types"
import {
  createVehicleFormSchema,
  type VehicleFormValues,
} from "../validation/customer.validation"
import type { FuelType, TransmissionType } from "../types/vehicle.types"

const FUEL_KEYS: Record<FuelType, string> = {
  petrol: "vehicles.fuelTypes.petrol",
  diesel: "vehicles.fuelTypes.diesel",
  hybrid: "vehicles.fuelTypes.hybrid",
  electric: "vehicles.fuelTypes.electric",
  other: "vehicles.fuelTypes.other",
}

const TRANSMISSION_KEYS: Record<TransmissionType, string> = {
  automatic: "vehicles.transmissionTypes.automatic",
  manual: "vehicles.transmissionTypes.manual",
}

interface VehicleFormProps {
  defaultValues?: Partial<VehicleFormValues>
  onSubmit: (values: VehicleFormValues) => void
  isSubmitting?: boolean
  submitLabel?: string
  submitIcon?: React.ReactNode
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  submitIcon,
}) => {
  const { t } = useTranslation("customers")

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(createVehicleFormSchema(t)),
    defaultValues: {
      make: defaultValues?.make ?? "",
      model: defaultValues?.model ?? "",
      plateNumber: defaultValues?.plateNumber ?? "",
      vin: defaultValues?.vin ?? "",
      year: defaultValues?.year ?? "",
      mileage: defaultValues?.mileage ?? "",
      fuelType: defaultValues?.fuelType ?? undefined,
      transmissionType: defaultValues?.transmissionType ?? undefined,
      color: defaultValues?.color ?? "",
      notes: defaultValues?.notes ?? "",
    },
  })

  const fuelOptions = useMemo<Option[]>(
    () =>
      (Object.keys(FUEL_KEYS) as FuelType[]).map((key) => ({
        value: key,
        label: t(FUEL_KEYS[key]),
      })),
    [t],
  )

  const transmissionOptions = useMemo<Option[]>(
    () =>
      (Object.keys(TRANSMISSION_KEYS) as TransmissionType[]).map((key) => ({
        value: key,
        label: t(TRANSMISSION_KEYS[key]),
      })),
    [t],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="make"
            label={t("vehicles.fields.make")}
            placeholder={t("vehicles.fields.make")}
            required
            leftIcon={Factory}
            iconPosition="left"
            dir="rtl"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="model"
            label={t("vehicles.fields.model")}
            placeholder={t("vehicles.fields.model")}
            required
            leftIcon={Car}
            iconPosition="left"
            dir="rtl"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="plateNumber"
            label={t("vehicles.fields.plateNumber")}
            placeholder={t("vehicles.fields.plateNumber")}
            required
            leftIcon={Hash}
            iconPosition="left"
            dir="ltr"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="vin"
            label={t("vehicles.fields.vin")}
            placeholder={t("vehicles.fields.vin")}
            leftIcon={Fingerprint}
            iconPosition="left"
            dir="ltr"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            control={form.control}
            name="year"
            label={t("vehicles.fields.year")}
            placeholder={t("vehicles.fields.year")}
            min={1900}
            max={2100}
            dir="ltr"
          />
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            control={form.control}
            name="mileage"
            label={t("vehicles.fields.mileage")}
            placeholder={t("vehicles.fields.mileage")}
            min={0}
            leftIcon={Gauge}
            iconPosition="left"
            dir="ltr"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="fuelType"
            label={t("vehicles.fields.fuelType")}
            placeholder={t("vehicles.fields.fuelType")}
            options={fuelOptions}
            dir="rtl"
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="transmissionType"
            label={t("vehicles.fields.transmissionType")}
            placeholder={t("vehicles.fields.transmissionType")}
            options={transmissionOptions}
            dir="rtl"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="color"
          label={t("vehicles.fields.color")}
          placeholder={t("vehicles.fields.color")}
          dir="rtl"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="notes"
          label={t("vehicles.fields.notes")}
          placeholder={t("vehicles.fields.notes")}
          rows={3}
          dir="rtl"
        />

        <SubmitButton
          isLoading={isSubmitting}
          text={submitLabel ?? t("vehicles.addVehicle")}
          icon={submitIcon}
        />
      </form>
    </Form>
  )
}
