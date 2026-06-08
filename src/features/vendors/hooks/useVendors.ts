import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Vendor, VendorFilterForm } from '../types/vendors.types'
import { EMPTY_STATUS, EMPTY_TYPE } from '../types/vendors.types'
import { vendorsService } from '../services/vendors.service'

interface UseVendorsFilters {
  search?: string
  status?: string
  type?: string
  page?: number
  per_page?: number
}

export const useVendors = (externalFilters?: UseVendorsFilters) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchVendors = useCallback(async (filters?: UseVendorsFilters) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await vendorsService.getVendors({
        search: filters?.search || undefined,
        status: filters?.status && filters.status !== 'all' ? filters.status : undefined,
        type: filters?.type && filters.type !== 'all' ? filters.type : undefined,
      })
      setVendors(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vendors')
      console.error('Error fetching vendors:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVendors(externalFilters)
  }, [fetchVendors, externalFilters])

  const currentPage = externalFilters?.page || 1
  const perPage = externalFilters?.per_page || 15

  const pagination = useMemo(() => ({
    total: vendors.length,
    page: currentPage,
    lastPage: Math.max(1, Math.ceil(vendors.length / perPage)),
  }), [vendors.length, currentPage, perPage])

  const updateVendorStatus = useCallback(async (vendorId: number, status: Vendor['status']) => {
    setLoading(true)
    try {
      const updatedVendor = await vendorsService.updateVendorStatus(vendorId, status)
      setVendors(prevVendors =>
        prevVendors.map(vendor =>
          vendor.id === vendorId ? updatedVendor : vendor
        )
      )
      return updatedVendor
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vendor status')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    vendors,
    loading,
    error,
    pagination,
    updateVendorStatus,
    refetch: () => fetchVendors(externalFilters),
  }
}