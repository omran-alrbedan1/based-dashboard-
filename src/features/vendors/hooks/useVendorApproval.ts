import { useState, useEffect, useCallback } from 'react'
import type { VendorApprovalRequest, VendorApprovalStatus } from '../data/vendorApproval.data'
import { vendorApprovalService } from '../services/vendorApproval.service'

export const useVendorApproval = () => {
  const [requests, setRequests] = useState<VendorApprovalRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await vendorApprovalService.getPendingVendors()
      setRequests(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vendor approval requests')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  const updateStatus = useCallback(
    async (id: string, status: VendorApprovalStatus, rejectionReason?: { en: string; ar: string }) => {
      setLoading(true)
      try {
        const updated = await vendorApprovalService.updateVendorApprovalStatus(id, status, rejectionReason)
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)))
        return updated
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
    refetch: fetchRequests,
  }
}
