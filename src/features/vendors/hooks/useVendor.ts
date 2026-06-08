import { useCallback } from 'react'
import { mockVendors } from '../data/data.vendors'
import type { Vendor } from '../types/vendors.types'

export const useVendor = (id?: string) => {
  const vendor: Vendor | null = id ? (mockVendors.find((v) => v.id === Number(id)) ?? null) : null
  const loading = false
  const error: string | null = vendor ? null : id ? 'Vendor not found' : null

  const approve = useCallback(async () => {}, [id])
  const reject = useCallback(async () => {}, [id])
  const suspend = useCallback(async (reason?: string) => {}, [id])
  const activate = useCallback(async () => {}, [id])
  const sendMessage = useCallback(async (message: string) => {}, [id])
  const refetch = useCallback(() => {}, [])

  return {
    vendor,
    loading,
    error,
    approve,
    reject,
    suspend,
    activate,
    sendMessage,
    refetch,
    isApproving: false,
    isRejecting: false,
    isSuspending: false,
    isActivating: false,
    isSendingMessage: false,
  }
}
