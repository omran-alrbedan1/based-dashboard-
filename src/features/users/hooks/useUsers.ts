import { useState, useEffect, useCallback, useMemo } from 'react'
import type { User, UserStatus } from '../types/users.types'
import { usersService } from '../services/users.service'

interface UseUsersFilters {
  search?: string
  status?: string
  verification?: string
  date_from?: string
  date_to?: string
  deleted?: string
  page?: number
  per_page?: number
}

export const useUsers = (externalFilters?: UseUsersFilters) => {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, suspended: 0, pending: 0, banned: 0, deleted: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async (filters?: UseUsersFilters) => {
    setLoading(true)
    setError(null)

    try {
      const [data, statsData] = await Promise.all([
        usersService.getAll({
          search: filters?.search || undefined,
          status: filters?.status && filters.status !== 'all' ? filters.status : undefined,

          verification: filters?.verification && filters.verification !== 'all' ? filters.verification : undefined,
          date_from: filters?.date_from || undefined,
          date_to: filters?.date_to || undefined,
          deleted: filters?.deleted || 'active',
          page: filters?.page,
          per_page: filters?.per_page,
        }),
        usersService.getStats(),
      ])
      setUsers(data.data)
      setStats(statsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers(externalFilters)
  }, [fetchUsers, externalFilters])

  const currentPage = externalFilters?.page || 1
  const perPage = externalFilters?.per_page || 15

  const pagination = useMemo(() => ({
    total: users.length,
    page: currentPage,
    lastPage: Math.max(1, Math.ceil(users.length / perPage)),
  }), [users.length, currentPage, perPage])

  const updateUserStatus = useCallback(async (userId: string, status: UserStatus) => {
    setLoading(true)
    try {
      const updatedUser = await usersService.updateStatus(userId, status)
      setUsers(prev =>
        prev.map(u => (u.id === userId ? updatedUser : u))
      )
      return updatedUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user status')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    users,
    stats,
    loading,
    error,
    pagination,
    updateUserStatus,
    refetch: () => fetchUsers(externalFilters),
  }
}
