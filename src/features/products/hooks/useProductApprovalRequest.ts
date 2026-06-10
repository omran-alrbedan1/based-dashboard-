import { useState, useEffect, useCallback } from 'react'
import type { ProductApprovalRequest, ProductApprovalStatus } from '../data/products.data'
import { productApprovalService } from '../services/productApproval.service'

export const useProductApprovalRequest = (id: string | undefined) => {
  const [request, setRequest] = useState<ProductApprovalRequest | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequest = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await productApprovalService.getProductApprovalRequestById(id)
      setRequest(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product approval request')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRequest()
  }, [fetchRequest])

  const updateStatus = useCallback(
    async (status: ProductApprovalStatus, rejectionReason?: string) => {
      if (!id) return
      setLoading(true)
      try {
        const updated = await productApprovalService.updateProductApprovalStatus(id, status, rejectionReason)
        setRequest(updated)
        return updated
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update status')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [id]
  )

  return {
    request,
    loading,
    error,
    updateStatus,
    refetch: fetchRequest,
  }
}
