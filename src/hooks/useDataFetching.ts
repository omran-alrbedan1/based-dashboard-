import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
    errors?: any[]
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface QueryParams {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    [key: string]: any
}

export type ApiError = AxiosError<{ message?: string; errors?: any[] }>

export function useGetData<TData = any, TParams = QueryParams>(
    queryKey: string | string[],
    fetchFn: (params?: TParams) => Promise<TData>,
    params?: TParams,
    options?: Omit<UseQueryOptions<TData, ApiError>, 'queryKey' | 'queryFn'>
) {
    return useQuery<TData, ApiError>({
        queryKey: Array.isArray(queryKey) ? [...queryKey, params] : [queryKey, params],
        queryFn: () => fetchFn(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        ...options,
    })
}

export function usePostData<TData = any, TVariables = any>(
    mutationKey: string | string[],
    postFn: (variables: TVariables) => Promise<TData>,
    invalidateQueries?: string | string[],
    options?: UseMutationOptions<TData, ApiError, TVariables>
) {
    const queryClient = useQueryClient()

    return useMutation<TData, ApiError, TVariables>({
        mutationFn: postFn,
        onSuccess: (data, variables, context) => {
            if (invalidateQueries) {
                const queries = Array.isArray(invalidateQueries) ? invalidateQueries : [invalidateQueries]
                queries.forEach(query => {
                    queryClient.invalidateQueries({ queryKey: [query] })
                })
            }
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context)
            }
        },
        onError: (error, variables, context) => {
            console.error(`Error in mutation ${mutationKey}:`, error)
            if (options?.onError) {
                options.onError(error, variables, context)
            }
        },
        ...options,
    })
}

export function useUpdateData<TData = any, TVariables = any>(
    mutationKey: string | string[],
    updateFn: (variables: TVariables) => Promise<TData>,
    invalidateQueries?: string | string[],
    options?: UseMutationOptions<TData, ApiError, TVariables>
) {
    const queryClient = useQueryClient()

    return useMutation<TData, ApiError, TVariables>({
        mutationFn: updateFn,
        onSuccess: (data, variables, context) => {
            if (invalidateQueries) {
                const queries = Array.isArray(invalidateQueries) ? invalidateQueries : [invalidateQueries]
                queries.forEach(query => {
                    queryClient.invalidateQueries({ queryKey: [query] })
                })
            }
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context)
            }
        },
        onError: (error, variables, context) => {
            console.error(`Error in mutation ${mutationKey}:`, error)
            if (options?.onError) {
                options.onError(error, variables, context)
            }
        },
        ...options,
    })
}

export function useDeleteData<TData = void, TVariables = string>(
    mutationKey: string | string[],
    deleteFn: (id: TVariables) => Promise<TData>,
    invalidateQueries?: string | string[],
    options?: UseMutationOptions<TData, ApiError, TVariables>
) {
    const queryClient = useQueryClient()

    return useMutation<TData, ApiError, TVariables>({
        mutationFn: deleteFn,
        onSuccess: (data, variables, context) => {
            if (invalidateQueries) {
                const queries = Array.isArray(invalidateQueries) ? invalidateQueries : [invalidateQueries]
                queries.forEach(query => {
                    queryClient.invalidateQueries({ queryKey: [query] })
                })
            }
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context)
            }
        },
        onError: (error, variables, context) => {
            console.error(`Error in mutation ${mutationKey}:`, error)
            if (options?.onError) {
                options.onError(error, variables, context)
            }
        },
        ...options,
    })
}
