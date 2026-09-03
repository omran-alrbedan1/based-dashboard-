import { useQuery } from "@tanstack/react-query"
import { customerService } from "../services/customer.service"

export function useCustomer(customerId: string | undefined) {
  const id = customerId ?? ""

  const customerQuery = useQuery({
    queryKey: ["customer", id],
    queryFn: () => customerService.getById(id),
    enabled: Boolean(id),
  })

  const vehiclesQuery = useQuery({
    queryKey: ["customer", id, "vehicles"],
    queryFn: () => customerService.listVehicles(id),
    enabled: Boolean(id),
  })

  const historyQuery = useQuery({
    queryKey: ["customer", id, "history"],
    queryFn: () => customerService.getHistory(id),
    enabled: Boolean(id),
  })

  return {
    customer: customerQuery.data,
    vehicles: vehiclesQuery.data ?? [],
    history: historyQuery.data,
    isLoading:
      customerQuery.isLoading || vehiclesQuery.isLoading || historyQuery.isLoading,
    isError:
      customerQuery.isError || vehiclesQuery.isError || historyQuery.isError,
    refetch: () => {
      customerQuery.refetch()
      vehiclesQuery.refetch()
      historyQuery.refetch()
    },
  }
}
