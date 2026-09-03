import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import type { MaintenanceStatus } from "../types/maintenance.types"

const STATUS_TONES: Record<MaintenanceStatus, string> = {
  draft: "bg-zinc-500/15 text-zinc-400",
  open: "bg-sky-500/15 text-sky-400",
  in_progress: "bg-blue-500/15 text-blue-400",
  waiting_parts: "bg-amber-500/15 text-amber-400",
  ready_for_delivery: "bg-violet-500/15 text-violet-400",
  closed: "bg-green-500/15 text-green-500",
  cancelled: "bg-red-500/15 text-red-500",
}

export const MaintenanceStatusBadge: React.FC<{
  status: MaintenanceStatus
}> = ({ status }) => {
  const { t } = useTranslation("maintenance")
  return (
    <Badge className={STATUS_TONES[status]}>
      {t(`statuses.${status}`)}
    </Badge>
  )
}
