import { useState, useEffect, useCallback } from 'react'
import type { DriverApprovalRequest, DriverApprovalStatus } from '../data/driverApproval.data'
import { driverApprovalService } from '../services/driverApproval.service'

export const useDriverApproval = () => {
  const [requests, setRequests] = useState<DriverApprovalRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPendingRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await driverApprovalService.getPendingDrivers()
      setRequests(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch driver approval requests')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPendingRequests()
  }, [fetchPendingRequests])

  const updateStatus = useCallback(
    async (id: string, status: DriverApprovalStatus, rejectionReason?: string) => {
      setLoading(true)
      try {
        await driverApprovalService.updateDriverApprovalStatus(id, status, rejectionReason)
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
