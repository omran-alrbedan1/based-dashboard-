import { useQuery, useMutation, useQueryClient, QueryKey, UseMutationOptions } from '@tanstack/react-query'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { useState, useEffect } from 'react'

const apiClient = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
})

interface ApiError {
  message: string
  status?: number
  data?: any
}

/**
 * Custom hook for fetching data (GET requests) with loading state
 */
export const useGetData = <TData>(
  queryKey: QueryKey,
  url: string,
  params?: object,
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchOnWindowFocus?: boolean
    refetchInterval?: number
    onSuccess?: (data: TData) => void
    onError?: (error: AxiosError<ApiError>) => void
  }
) => {
  const query = useQuery<TData, AxiosError<ApiError>>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<TData>(url, { params })
      return response.data
    },
    ...options,
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    refresh: () => query.refetch(),
  }
}

/**
 * Custom hook for creating data (POST requests) with loading state
 */
export const usePostData = <TData, TVariables = TData>(
  url: string,
  config?: AxiosRequestConfig,
  options?: UseMutationOptions<TData, AxiosError<ApiError>, TVariables> & {
    showLoading?: boolean
    loadingMessage?: string
  }
) => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation<TData, AxiosError<ApiError>, TVariables, unknown>({
    mutationFn: async (data) => {
      setIsLoading(true)
      try {
        const response = await apiClient.post<TData>(url, data, config)
        return response.data
      } finally {
        setIsLoading(false)
      }
    },
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries()
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      setIsLoading(false)
      options?.onError?.(error, variables, context)
    },
  })

  return {
    ...mutation,
    isLoading: mutation.isPending || isLoading,
    isSending: mutation.isPending,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
  }
}

/**
 * Custom hook for updating data (PUT/PATCH requests) with loading state
 */
export const usePatchData = <TData, TVariables extends { id: any }>(
  url: (id: any) => string,
  config?: AxiosRequestConfig,
  options?: UseMutationOptions<TData, AxiosError<ApiError>, TVariables, unknown> & {
    showLoading?: boolean
    invalidateQueries?: QueryKey[]
  }
) => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation<TData, AxiosError<ApiError>, TVariables, unknown>({
    mutationFn: async (data) => {
      setIsLoading(true)
      try {
        const { id, ...payload } = data
        const response = await apiClient.patch<TData>(url(id), payload, config)
        return response.data
      } finally {
        setIsLoading(false)
      }
    },
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
      } else {
        queryClient.invalidateQueries()
      }
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      setIsLoading(false)
      options?.onError?.(error, variables, context)
    },
  })

  return {
    ...mutation,
    isLoading: mutation.isPending || isLoading,
    isUpdating: mutation.isPending,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
  }
} 

/**
 * Custom hook for deleting data (DELETE requests) with loading state
 */
export const useDeleteData = <TData, TVariables = any>(
  url: (id: TVariables) => string,
  config?: AxiosRequestConfig,
  options?: UseMutationOptions<TData, AxiosError<ApiError>, TVariables> & {
    showLoading?: boolean
    invalidateQueries?: QueryKey[]
    onSuccessRefetch?: QueryKey[]
  }
) => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation<TData, AxiosError<ApiError>, TVariables>({
    mutationFn: async (id) => {
      setIsLoading(true)
      try {
        const response = await apiClient.delete<TData>(url(id), config)
        return response.data
      } finally {
        setIsLoading(false)
      }
    },
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate specific queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
      } else {
        queryClient.invalidateQueries()
      }

      // Refetch specific queries if needed
      if (options?.onSuccessRefetch) {
        options.onSuccessRefetch.forEach(queryKey => {
          queryClient.refetchQueries({ queryKey })
        })
      }

      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      setIsLoading(false)
      options?.onError?.(error, variables, context)
    },
  })

  return {
    ...mutation,
    isLoading: mutation.isPending || isLoading,
    isDeleting: mutation.isPending,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
  }
}

