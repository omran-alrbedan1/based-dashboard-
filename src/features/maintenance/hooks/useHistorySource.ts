import { useQuery } from "@tanstack/react-query"
import { maintenanceService } from "../services/maintenance.service"

export function useHistorySource(customerId: string | undefined) {
  const id = customerId ?? ""
  return useQuery({
    queryKey: ["history", "cards", id],
    queryFn: () => maintenanceService.getCardsByCustomer(id),
    enabled: Boolean(id),
  })
}
