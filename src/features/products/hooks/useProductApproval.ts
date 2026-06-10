import { useState, useEffect, useCallback } from 'react'
import type { ProductApprovalRequest, ProductApprovalStatus } from '../data/products.data'
import { productApprovalService } from '../services/productApproval.service'

export const useProductApproval = () => {
  const [requests, setRequests] = useState<ProductApprovalRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPendingRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productApprovalService.getPendingProducts()
      setRequests(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product approval requests')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPendingRequests()
  }, [fetchPendingRequests])

  const updateStatus = useCallback(
    async (id: string, status: ProductApprovalStatus, rejectionReason?: string) => {
      setLoading(true)
      try {
        await productApprovalService.updateProductApprovalStatus(id, status, rejectionReason)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update status')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    requests,
    loading,
    error,
    updateStatus,
    refetch: fetchPendingRequests,
  }
}
