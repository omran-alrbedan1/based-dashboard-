import { useMutation, useQueryClient } from "@tanstack/react-query"
import { maintenanceService } from "../services/maintenance.service"
import { useAuth } from "@/features/auth/context/AuthContext"
import type { WorkStatus } from "../types/work-item.types"

export function useUpdateWorkItem() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({
      cardId,
      workItemId,
      updates,
    }: {
      cardId: string
      workItemId: string
      updates: Partial<{
        description: string
        estimatedCost: number
        quantity: number
        progress: number
        assignee: string
        status: WorkStatus
      }>
    }) => {
      return maintenanceService.updateWorkItem(
        cardId,
        workItemId,
        updates,
        user?.name
      )
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["maintenance", "card", data?.id] })
      queryClient.invalidateQueries({ queryKey: ["activity", "timeline", data?.id] })
      queryClient.invalidateQueries({ queryKey: ["maintenance", "list"] })
    },
  })
}
