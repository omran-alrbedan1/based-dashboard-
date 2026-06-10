import { FilterConfig } from '@/hooks/useFilter'
import type { User } from '../types/users.types'

export const userFilterConfig: FilterConfig<User>[] = [
  {
    key: 'search',
    label: 'Search',
    type: 'search',
    getValue: (user) => [user.name, user.email, user.phone],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Suspended', label: 'Suspended' },
      { value: 'Pending', label: 'Pending' },
    ],
    getValue: (user) => user.status,
  },
  {
    key: 'date_from',
    label: 'From',
    type: 'date',
    getValue: () => '',
  },
  {
    key: 'date_to',
    label: 'To',
    type: 'date',
    getValue: () => '',
  },
]
