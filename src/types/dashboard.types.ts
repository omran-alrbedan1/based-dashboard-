export interface StatCardProps {
  label: string
  value: string | number
  change: number
  sub: string
  icon: React.ReactNode
}

export interface QuickCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
}

export interface PerfCardProps {
  label: string
  value: string
  target: string
  progress: number
  warn?: boolean
}

export interface OrderRow {
  date: string
  amount: string
  customer: string
  method: string
  status: 'delivered' | 'pending' | 'cancelled'
}

export interface UserRow {
  initials: string
  name: string
  meta: string
  orders: string
}

export interface CategorySlice {
  name: string
  pct: number
  color: string
}

export interface BarDay {
  label: string
  revenue: number
  orders: number
}