import { useQuery } from "@tanstack/react-query"
import { maintenanceService } from "../services/maintenance.service"

export function useActivityTimeline(cardId: string | undefined) {
  const id = cardId ?? ""
  return useQuery({
    queryKey: ["activity", "timeline", id],
    queryFn: async () => {
      const card = await maintenanceService.getById(id)
      return card?.activityEvents ?? []
    },
    enabled: Boolean(id),
  })
}
