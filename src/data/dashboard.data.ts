  import type { BarDay, CategorySlice, OrderRow, UserRow } from '@/types/dashboard.types'

export const barData: BarDay[] = [
  { label: 'Mon', revenue: 50, orders: 28 },
  { label: 'Tue', revenue: 68, orders: 40 },
  { label: 'Wed', revenue: 44, orders: 25 },
  { label: 'Thu', revenue: 80, orders: 55 },
  { label: 'Fri', revenue: 60, orders: 35 },
  { label: 'Sat', revenue: 88, orders: 62 },
  { label: 'Sun', revenue: 48, orders: 30 },
]

export const categoryData: CategorySlice[] = [
  { name: 'Meals',  pct: 38, color: 'var(--olive-mid)' },
  { name: 'Bakery', pct: 27, color: '#7A8F4E' },
  { name: 'Snacks', pct: 20, color: '#9FAF72' },
  { name: 'Drinks', pct: 15, color: '#C0DD97' },
]

export const recentOrders: OrderRow[] = [
  { date: 'May 17', amount: '$124', customer: 'Layla Hassan',    method: 'Apple Pay', status: 'delivered' },
  { date: 'May 17', amount: '$88',  customer: 'Omar Siddiqui',   method: 'Card',      status: 'pending'   },
  { date: 'May 16', amount: '$57',  customer: 'Sara Al-Rashidi', method: 'Cash',      status: 'delivered' },
  { date: 'May 16', amount: '$203', customer: 'Ahmed Khalil',    method: 'Card',      status: 'cancelled' },
  { date: 'May 15', amount: '$76',  customer: 'Nour Farouk',     method: 'Apple Pay', status: 'delivered' },
]

export const newUsers: UserRow[] = [
  { initials: 'LH', name: 'Layla Hassan',    meta: 'Joined today',     orders: '3 orders' },
  { initials: 'OS', name: 'Omar Siddiqui',   meta: 'Joined today',     orders: '1 order'  },
  { initials: 'SA', name: 'Sara Al-Rashidi', meta: 'Joined yesterday', orders: '5 orders' },
  { initials: 'AK', name: 'Ahmed Khalil',    meta: 'Joined May 15',    orders: '2 orders' },
]