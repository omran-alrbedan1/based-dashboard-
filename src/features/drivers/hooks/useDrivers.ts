import { useQuery } from '@tanstack/react-query'
import { driversService } from '../services/drivers.service'
import type { DriversFilterParams } from '../types/drivers.types'

export const useDrivers = (filters: DriversFilterParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['drivers', filters],
    queryFn: () => driversService.getAll(filters),
  })

  return {
    drivers: data?.data ?? [],
    pagination: data?.meta ?? { current_page: 1, last_page: 1, per_page: 15, total: 0 },
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  }
}