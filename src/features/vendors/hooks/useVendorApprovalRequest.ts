import { useState, useEffect, useCallback } from 'react'
import type { VendorApprovalRequest, VendorApprovalStatus } from '../data/vendorApproval.data'
import { vendorApprovalService } from '../services/vendorApproval.service'

export const useVendorApprovalRequest = (id: string | undefined) => {
  const [request, setRequest] = useState<VendorApprovalRequest | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequest = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await vendorApprovalService.getVendorApprovalRequestById(id)
      setRequest(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vendor approval request')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRequest()
  }, [fetchRequest])

  const updateStatus = useCallback(
    async (status: VendorApprovalStatus, rejectionReason?: { en: string; ar: string }) => {
      if (!id) return
      setLoading(true)
      try {
        const updated = await vendorApprovalService.updateVendorApprovalStatus(id, status, rejectionReason)
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
