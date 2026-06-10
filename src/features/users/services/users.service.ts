import type { User, UserStatus } from '../types/users.types'
import { MOCK_USERS } from '../data/users.data'
import { USER_MOCK_ORDERS, USER_MOCK_PAYMENTS } from '../data/user-orders.data'

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const usersService = {
  getAll: async (params: {
    search?: string
    status?: string
    verification?: string
    date_from?: string
    date_to?: string
    deleted?: string
    page?: number
    per_page?: number
  }) => {
    await delay()

    let filtered = [...MOCK_USERS]

    if (params.deleted === 'active') {
      filtered = filtered.filter((u) => !u.deleted_at)
    } else if (params.deleted === 'deleted') {
      filtered = filtered.filter((u) => u.deleted_at)
    }

    if (params.search) {
      const s = params.search.toLowerCase()
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.phone.toLowerCase().includes(s)
      )
    }

    if (params.status && params.status !== 'all' && params.status !== '') {
      filtered = filtered.filter((u) => u.status === params.status)
    }

    if (params.verification && params.verification !== 'all' && params.verification !== '') {
      if (params.verification === 'email_verified') {
        filtered = filtered.filter((u) => !!u.email_verified_at)
      } else if (params.verification === 'phone_verified') {
        filtered = filtered.filter((u) => !!u.phone_verified_at)
      } else if (params.verification === 'unverified') {
        filtered = filtered.filter((u) => !u.email_verified_at || !u.phone_verified_at)
      }
    }

    if (params.date_from) {
      const from = new Date(params.date_from).getTime()
      filtered = filtered.filter((u) => new Date(u.joinedAt).getTime() >= from)
    }

    if (params.date_to) {
      const to = new Date(params.date_to).getTime()
      filtered = filtered.filter((u) => new Date(u.joinedAt).getTime() <= to)
    }

    const page = params.page || 1
    const perPage = params.per_page || 15
    const total = filtered.length
    const lastPage = Math.max(1, Math.ceil(total / perPage))
    const start = (page - 1) * perPage
    const paged = filtered.slice(start, start + perPage)

    return {
      data: paged,
      pagination: { total, page, lastPage },
    }
  },

  getStats: async (): Promise<{
    total: number
    active: number
    suspended: number
    pending: number
    banned: number
    deleted: number
  }> => {
    await delay(200)
    const active = MOCK_USERS.filter((u) => u.status === 'Active' && !u.deleted_at)
    return {
      total: MOCK_USERS.filter((u) => !u.deleted_at).length,
      active: active.length,
      suspended: MOCK_USERS.filter((u) => u.status === 'Suspended' && !u.deleted_at).length,
      pending: MOCK_USERS.filter((u) => u.status === 'Pending' && !u.deleted_at).length,
      banned: MOCK_USERS.filter((u) => u.is_banned_from_community && !u.deleted_at).length,
      deleted: MOCK_USERS.filter((u) => u.deleted_at).length,
    }
  },

  getById: async (id: string): Promise<User> => {
    await delay(300)
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) throw new Error('User not found')
    return user
  },

  getOrders: async (userId: string) => {
    await delay(300)
    if (!MOCK_USERS.find((u) => u.id === userId)) throw new Error('User not found')
    return USER_MOCK_ORDERS[userId] || []
  },

  getPayments: async (userId: string) => {
    await delay(300)
    if (!MOCK_USERS.find((u) => u.id === userId)) throw new Error('User not found')
    return USER_MOCK_PAYMENTS[userId] || []
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    await delay(400)
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) throw new Error('User not found')
    Object.assign(user, data)
    return { ...user }
  },

  updateStatus: async (id: string, status: UserStatus): Promise<User> => {
    await delay(400)
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) throw new Error('User not found')
    user.status = status
    return { ...user }
  },

  softDelete: async (id: string): Promise<User> => {
    await delay(400)
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) throw new Error('User not found')
    user.deleted_at = new Date().toISOString()
    return { ...user }
  },

  restore: async (id: string): Promise<User> => {
    await delay(400)
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) throw new Error('User not found')
    user.deleted_at = null
    return { ...user }
  },

  permanentDelete: async (id: string): Promise<void> => {
    await delay(500)
    const idx = MOCK_USERS.findIndex((u) => u.id === id)
    if (idx === -1) throw new Error('User not found')
    MOCK_USERS.splice(idx, 1)
  },

  resetPassword: async (id: string): Promise<void> => {
    await delay(500)
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) throw new Error('User not found')
  },
}
