import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { customerService, type CustomerInput, type VehicleInput } from "../services/customer.service"
import type { CustomerFilterValues } from "../configs/customer-filter.config"

export function useCustomers(filters?: CustomerFilterValues) {
  return useQuery({
    queryKey: ["customers", filters ?? "all"],
    queryFn: () =>
      filters ? customerService.search(filters) : customerService.list(),
  })
}

export function useVehicleCounts() {
  return useQuery({
    queryKey: ["vehicle-counts"],
    queryFn: () => customerService.getVehicleCounts(),
  })
}

export function useCreateCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CustomerInput) => customerService.create(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["customers"] }),
  })
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CustomerInput }) =>
      customerService.update(id, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] })
      queryClient.invalidateQueries({ queryKey: ["customer", variables.id] })
    },
  })
}

export function useAddVehicle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ customerId, input }: { customerId: string; input: VehicleInput }) =>
      customerService.addVehicle(customerId, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] })
      queryClient.invalidateQueries({
        queryKey: ["customer", variables.customerId],
      })
    },
  })
}
