import { useQuery } from '@tanstack/react-query'
import { driverService } from '../services/driver.service'

export const useDriverDocuments = (id?: string | number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['driver-documents', id],
    queryFn: () => driverService.getDocuments(Number(id)),
    enabled: !!id,
  })

  return {
    documents: data ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  }
}