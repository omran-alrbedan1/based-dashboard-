export type UserStatus = 'Active' | 'Suspended' | 'Pending'

export interface UserPreferences {
  notifications?: boolean
  language?: 'en' | 'ar'
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  profile_image?: string
  status: UserStatus
  city: string
  country: string
  totalOrders: number
  totalSpent: number
  total_reports: number
  total_refunds: number
  is_banned_from_community: boolean
  joinedAt: string
  lastActiveAt: string
  date_of_birth?: string
  email_verified_at?: string | null
  phone_verified_at?: string | null
  last_login_at?: string
  last_login_ip?: string
  preferences?: UserPreferences
  notes?: string
  deleted_at?: string | null
}

export interface UserFilterForm {
  search: string
  status: string
  date_from: string
  date_to: string
}

export const EMPTY_STATUS = 'all'

export const USER_FILTERS_DEFAULT: UserFilterForm = {
  search: '',
  status: EMPTY_STATUS,
  date_from: '',
  date_to: '',
}

export interface UserFiltersProps {
  onApplyFilters: (values: UserFilterForm) => void
  onResetFilters: () => void
  isLoading?: boolean
  initialFilters?: Partial<UserFilterForm>
}

export interface UsersTableProps {
  users: User[]
  loading: boolean
  pagination: {
    total: number
    page: number
    lastPage: number
  }
  onPageChange: (page: number) => void
  onActivate: (id: string) => void
  onSuspend: (id: string) => void
}

export interface UserStats {
  total: number
  active: number
  suspended: number
  pending: number
  banned: number
  deleted: number
}
