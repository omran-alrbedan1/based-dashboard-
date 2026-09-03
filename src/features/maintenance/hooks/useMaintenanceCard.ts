import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { maintenanceService } from "../services/maintenance.service"

export function useMaintenanceCard(cardId: string | undefined) {
  const id = cardId ?? ""
  return useQuery({
    queryKey: ["maintenance-card", id],
    queryFn: () => maintenanceService.getById(id),
    enabled: Boolean(id),
  })
}

export function useUpdateMaintenanceCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      patch,
    }: {
      id: string
      patch: Parameters<typeof maintenanceService.update>[1]
    }) => maintenanceService.update(id, patch),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-card", variables.id] })
      queryClient.invalidateQueries({ queryKey: ["maintenance-cards"] })
      queryClient.invalidateQueries({ queryKey: ["history"] })
    },
  })
}
