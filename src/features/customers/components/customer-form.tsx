import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { User, Phone, Mail, MapPin, StickyNote } from "lucide-react"
import { Form } from "@/components/ui/form"
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField"
import { SubmitButton } from "@/components/shared/buttons/SubmitButton"
import {
  createCustomerFormSchema,
  type CustomerFormValues,
} from "../validation/customer.validation"

interface CustomerFormProps {
  defaultValues?: Partial<CustomerFormValues>
  onSubmit: (values: CustomerFormValues) => void
  isSubmitting?: boolean
  submitLabel?: string
  submitIcon?: React.ReactNode
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  submitIcon,
}) => {
  const { t } = useTranslation("customers")

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(createCustomerFormSchema(t)),
    defaultValues: {
      name: defaultValues?.name ?? "",
      phone: defaultValues?.phone ?? "",
      email: defaultValues?.email ?? "",
      address: defaultValues?.address ?? "",
      notes: defaultValues?.notes ?? "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={t("fields.name")}
          placeholder={t("fields.name")}
          required
          leftIcon={User}
          iconPosition="left"
          dir="rtl"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE}
          control={form.control}
          name="phone"
          label={t("fields.phone")}
          placeholder={t("fields.phone")}
          required
          leftIcon={Phone}
          iconPosition="left"
          dir="ltr"
        />

        <CustomFormField
          fieldType={FormFieldType.EMAIL}
          control={form.control}
          name="email"
          label={t("fields.email")}
          placeholder={t("fields.email")}
          leftIcon={Mail}
          iconPosition="left"
          dir="ltr"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label={t("fields.address")}
          placeholder={t("fields.address")}
          leftIcon={MapPin}
          iconPosition="left"
          dir="rtl"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="notes"
          label={t("fields.notes")}
          placeholder={t("fields.notes")}
          rows={3}
          dir="rtl"
        />

        <SubmitButton
          isLoading={isSubmitting}
          text={submitLabel ?? t("addCustomer")}
          icon={submitIcon}
        />
      </form>
    </Form>
  )
}
