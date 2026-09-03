import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { maintenanceService, type MaintenanceCardInput } from "../services/maintenance.service"

export function useMaintenanceCards() {
  return useQuery({
    queryKey: ["maintenance-cards"],
    queryFn: () => maintenanceService.list(),
  })
}

export function useCreateMaintenanceCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: MaintenanceCardInput) =>
      maintenanceService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-cards"] })
      queryClient.invalidateQueries({ queryKey: ["history"] })
    },
  })
}
