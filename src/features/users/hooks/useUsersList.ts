import { useState } from 'react'
import { useFilters } from '@/hooks/useFilter'
import { userFilterConfig } from '../configs/users.config'
import { useUsers } from './useUsers'
import type { UserFilterForm } from '../types/users.types'
import { usersService } from '../services/users.service'

export const useUsersList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    per_page: 15,
    search: '',
    status: 'all',
    date_from: '',
    date_to: '',
  })

  const { users, stats, pagination, loading, refetch } = useUsers(filters)

  const { filteredData, filtersForForm, hasActiveFilters, resetFilters, applyFilters } =
    useFilters({
      data: users,
      config: userFilterConfig,
      syncWithURL: true,
    })

  const [activateId, setActivateId] = useState<string | null>(null)
  const [suspendId, setSuspendId] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleActivate = async () => {
    if (!activateId) return
    setProcessing(true)
    try {
      await usersService.updateStatus(activateId, 'Active')
      setActivateId(null)
      refetch()
    } finally {
      setProcessing(false)
    }
  }

  const handleSuspend = async () => {
    if (!suspendId) return
    setProcessing(true)
    try {
      await usersService.updateStatus(suspendId, 'Suspended')
      setSuspendId(null)
      refetch()
    } finally {
      setProcessing(false)
    }
  }

  const handleFormFilterChange = (formValues: UserFilterForm) => {
    setFilters({
      ...filters,
      search: formValues.search,
      status: formValues.status,
      date_from: formValues.date_from,
      date_to: formValues.date_to,
      page: 1,
    })
    applyFilters(formValues as Record<string, any>)
  }

  const handleResetFilters = () => {
    setFilters({
      page: 1, per_page: 15, search: '', status: 'all',
      date_from: '', date_to: '',
    })
    resetFilters()
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return {
    users: filteredData,
    stats,
    pagination,
    loading,
    filtersForForm,
    hasActiveFilters,
    activateId,
    suspendId,
    processing,
    setActivateId,
    setSuspendId,
    handleActivate,
    handleSuspend,
    handleFormFilterChange,
    handleResetFilters,
    handlePageChange,
  }
}
