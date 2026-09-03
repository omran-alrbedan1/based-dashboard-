import { useQuery } from "@tanstack/react-query"
import { maintenanceService } from "../services/maintenance.service"

export function useSelectorData() {
  return useQuery({
    queryKey: ["maintenance-selector"],
    queryFn: () => maintenanceService.getSelectorData(),
  })
}
