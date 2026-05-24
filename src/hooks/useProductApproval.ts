import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import {
    useGetData,
    usePostData,
    ApiError,
    QueryParams,
} from './useDataFetching'
import { ProductApprovalRequest, LocalizedString } from '@/data/productApproval.data'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { createApiClient } from '@/lib/helpers'

export interface ApprovalRequestResponse {
    data: ProductApprovalRequest[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ApprovalRequestsParams extends QueryParams {
    search?: string
    vendor?: string
    category?: string
    status?: string
}

export interface ApproveProductPayload {
    productId: string
}

export interface RejectProductPayload {
    productId: string
    reason: {
        en: string
        ar: string
    }
}

export interface Vendor {
    id: string
    name: LocalizedString
    email: string
    phone: string
    storeName: LocalizedString
    registrationDate?: string
    status?: 'active' | 'inactive' | 'pending'
}

export interface Category {
    id: string
    name: LocalizedString
    slug: string
    description?: LocalizedString
    parentId?: string
}


const api = createApiClient();

const fetchApprovalRequests = (params?: ApprovalRequestsParams) =>
    api.get<ApprovalRequestResponse>(API_ENDPOINTS.APPROVAL_REQUESTS, params);

const fetchApprovalRequestById = (id: string) =>
    api.get<ProductApprovalRequest>(API_ENDPOINTS.APPROVAL_REQUEST_BY_ID(id));

const fetchVendors = () =>
    api.get<Vendor[]>(API_ENDPOINTS.VENDORS_LIST);

const fetchCategories = () =>
    api.get<Category[]>(API_ENDPOINTS.CATEGORIES_LIST);

const approveProduct = (payload: ApproveProductPayload) =>
    api.post<ProductApprovalRequest>(
        API_ENDPOINTS.APPROVE_PRODUCT(payload.productId),
        {
            notes: payload.notes,
        }
    );

const rejectProduct = (payload: RejectProductPayload) =>
    api.post<ProductApprovalRequest>(
        API_ENDPOINTS.REJECT_PRODUCT(payload.productId),
        {
            reason: payload.reason,
        }
    );

export const useProductApproval = () => {

    const useApprovalRequests = (
        params?: ApprovalRequestsParams,
        options?: Omit<UseQueryOptions<ApprovalRequestResponse, ApiError>, 'queryKey' | 'queryFn'>
    ) => {
        return useGetData<ApprovalRequestResponse, ApprovalRequestsParams>(
            'approval-requests',
            fetchApprovalRequests,
            params,
            {
                staleTime: 5 * 60 * 1000,
                gcTime: 10 * 60 * 1000,
                ...options,
            }
        )
    }

    const useApprovalRequestById = (
        id?: string,
        options?: Omit<UseQueryOptions<ProductApprovalRequest, ApiError>, 'queryKey' | 'queryFn'>
    ) => {
        return useGetData<ProductApprovalRequest>(
            ['approval-request', id],
            () => fetchApprovalRequestById(id!),
            undefined,
            {
                enabled: !!id,
                staleTime: 5 * 60 * 1000,
                ...options,
            }
        )
    }

    const useVendors = (
        options?: Omit<UseQueryOptions<Vendor[], ApiError>, 'queryKey' | 'queryFn'>
    ) => {
        return useGetData<Vendor[]>(
            'vendors',
            fetchVendors,
            undefined,
            {
                staleTime: 30 * 60 * 1000,
                gcTime: 60 * 60 * 1000,
                ...options,
            }
        )
    }

    const useCategories = (
        options?: Omit<UseQueryOptions<Category[], ApiError>, 'queryKey' | 'queryFn'>
    ) => {
        return useGetData<Category[]>(
            'categories',
            fetchCategories,
            undefined,
            {
                staleTime: 30 * 60 * 1000,
                gcTime: 60 * 60 * 1000,
                ...options,
            }
        )
    }

    const useApproveProduct = (
        options?: UseMutationOptions<ProductApprovalRequest, ApiError, ApproveProductPayload>
    ) => {
        return usePostData<ProductApprovalRequest, ApproveProductPayload>(
            'approve-product',
            approveProduct,
            ['approval-requests', 'approval-request'],
            options
        )
    }

    const useRejectProduct = (
        options?: UseMutationOptions<ProductApprovalRequest, ApiError, RejectProductPayload>
    ) => {
        return usePostData<ProductApprovalRequest, RejectProductPayload>(
            'reject-product',
            rejectProduct,
            ['approval-requests', 'approval-request'],
            options
        )
    }

    return {
        useApprovalRequests,
        useApprovalRequestById,
        useVendors,
        useCategories,
        useApproveProduct,
        useRejectProduct,
    }
}