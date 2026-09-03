import type { LucideIcon } from "lucide-react"
import { ListFilter, CalendarDays } from "lucide-react"
import type { DateRange } from "react-day-picker"
import type { FilterField } from "@/components/shared/custom/CustomFilter"
import { MAINTENANCE_STATUSES } from "../types/maintenance.types"
import type { MaintenanceStatus } from "../types/maintenance.types"

export interface MaintenanceFilterValues {
  status: string
  createdAt: DateRange | undefined
}

export const maintenanceFilterDefaultValues: MaintenanceFilterValues = {
  status: "",
  createdAt: undefined,
}

export const maintenanceFilterFields = (
  t: (key: string) => string,
): FilterField<MaintenanceFilterValues>[] => [
  {
    name: "status",
    label: t("filter.status"),
    type: "select",
    icon: ListFilter,
    placeholder: t("filter.status"),
    options: MAINTENANCE_STATUSES.map((status) => ({
      value: status,
      label: t(`statuses.${status}`),
    })),
  },
  {
    name: "createdAt",
    label: t("filter.createdAt"),
    type: "date-range",
    icon: CalendarDays,
  },
]

export type { MaintenanceStatus }
