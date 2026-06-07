import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { driverService } from '../services/driver.service'
import type { Driver } from '../types/drivers.types'

interface UseDriverOptions {
  ordersPage?: number
  ordersPerPage?: number
}

export const useDriver = (id?: string | number, options?: UseDriverOptions) => {
  const queryClient = useQueryClient()
  const ordersPage = options?.ordersPage || 1
  const ordersPerPage = options?.ordersPerPage || 6

  // Get driver data
  const { 
    data: driver, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['driver', id],
    queryFn: () => driverService.getById(Number(id)),
    enabled: !!id,
  })

  // Get driver's orders with pagination
  const { 
    data: ordersData,
    isLoading: ordersLoading,
    refetch: refetchOrders
  } = useQuery({
    queryKey: ['driver-orders', id, ordersPage, ordersPerPage],
    queryFn: () => driverService.getOrders(Number(id), { 
      page: ordersPage, 
      per_page: ordersPerPage 
    }),
    enabled: !!id,
  })

  // Get driver's areas
  const { 
    data: driverAreas 
  } = useQuery({
    queryKey: ['driver-areas', id],
    queryFn: () => driverService.getAreas(Number(id)),
    enabled: !!id,
  })

  // Get all available areas
  const { 
    data: allAreas 
  } = useQuery({
    queryKey: ['all-areas'],
    queryFn: () => driverService.getAllAreas(),
  })

  // Get driver's documents
  const { 
    data: documents,
    isLoading: documentsLoading,
    refetch: refetchDocuments
  } = useQuery({
    queryKey: ['driver-documents', id],
    queryFn: () => driverService.getDocuments(Number(id)),
    enabled: !!id,
  })

  // Get driver's statistics
  const { 
    data: stats,
    isLoading: statsLoading
  } = useQuery({
    queryKey: ['driver-stats', id],
    queryFn: () => driverService.getStats(Number(id)),
    enabled: !!id,
  })

  // Activate mutation
  const activateMutation = useMutation({
    mutationFn: () => driverService.activate(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', id] })
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    },
  })

  // Suspend mutation
  const suspendMutation = useMutation({
    mutationFn: (reason?: string) => driverService.suspend(Number(id), reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', id] })
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    },
  })

  // Update areas mutation
  const updateAreasMutation = useMutation({
    mutationFn: (areaIds: number[]) => driverService.updateAreas(Number(id), areaIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', id] })
      queryClient.invalidateQueries({ queryKey: ['driver-areas', id] })
    },
  })

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => driverService.sendMessage(Number(id), message),
  })

  // Update driver mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Driver>) => driverService.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', id] })
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    },
  })

  return {
    // Data
    driver: driver ?? null,
    driverAreas: driverAreas ?? [],
    allAreas: allAreas ?? [],
    documents: documents ?? [],
    stats: stats ?? null,
    orders: ordersData?.data ?? [],
    ordersPagination: ordersData?.meta ?? { 
      current_page: 1, 
      last_page: 1, 
      per_page: ordersPerPage, 
      total: 0 
    },
    
    // Loading states
    loading: isLoading,
    ordersLoading: ordersLoading,
    documentsLoading: documentsLoading,
    statsLoading: statsLoading,
    
    // Mutation loading states
    isActivating: activateMutation.isPending,
    isSuspending: suspendMutation.isPending,
    isUpdatingAreas: updateAreasMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending,
    isUpdating: updateMutation.isPending,
    
    // Errors
    error: error ? (error as Error).message : null,
    
    // Actions
    activate: activateMutation.mutateAsync,
    suspend: suspendMutation.mutateAsync,
    updateAreas: updateAreasMutation.mutateAsync,
    sendMessage: sendMessageMutation.mutateAsync,
    updateDriver: updateMutation.mutateAsync,
    
    // Refetch
    refetch,
    refetchOrders,
    refetchDocuments,
  }
}