import type { LucideIcon } from "lucide-react"
import { Search, Phone, Hash, Fingerprint, Factory, Car } from "lucide-react"
import type { FilterField } from "@/components/shared/custom/CustomFilter"

export interface CustomerFilterValues {
  name: string
  phone: string
  plateNumber: string
  vin: string
  make: string
  model: string
}

export const customerFilterDefaultValues: CustomerFilterValues = {
  name: "",
  phone: "",
  plateNumber: "",
  vin: "",
  make: "",
  model: "",
}

export const customerFilterFields = (
  t: (key: string) => string,
): FilterField<CustomerFilterValues>[] => [
  {
    name: "name",
    label: t("filter.name"),
    type: "text",
    icon: Search,
    placeholder: t("filter.name"),
  },
  {
    name: "phone",
    label: t("filter.phone"),
    type: "text",
    icon: Phone,
    placeholder: t("filter.phone"),
  },
  {
    name: "plateNumber",
    label: t("filter.plateNumber"),
    type: "text",
    icon: Hash,
    placeholder: t("filter.plateNumber"),
  },
  {
    name: "vin",
    label: t("filter.vin"),
    type: "text",
    icon: Fingerprint,
    placeholder: t("filter.vin"),
  },
  {
    name: "make",
    label: t("filter.make"),
    type: "text",
    icon: Factory,
    placeholder: t("filter.make"),
  },
  {
    name: "model",
    label: t("filter.model"),
    type: "text",
    icon: Car,
    placeholder: t("filter.model"),
  },
]
