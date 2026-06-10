import { useState, useEffect, useCallback } from 'react'
import type { DriverApprovalRequest, DriverApprovalStatus } from '../data/driverApproval.data'
import { driverApprovalService } from '../services/driverApproval.service'

export const useDriverApprovalRequest = (id: string | undefined) => {
  const [request, setRequest] = useState<DriverApprovalRequest | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequest = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await driverApprovalService.getDriverApprovalRequestById(id)
      setRequest(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch driver approval request')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRequest()
  }, [fetchRequest])

  const updateStatus = useCallback(
    async (status: DriverApprovalStatus, rejectionReason?: string) => {
      if (!id) return
      setLoading(true)
      try {
        const updated = await driverApprovalService.updateDriverApprovalStatus(id, status, rejectionReason)
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
