
export interface QuickCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
}

export interface GoalRowProps {
  name: string
  amount: string
  orders: number
  pct: number
  color: string
}

export interface PerfCardProps {
  label: string
  value: string
  target: string
  progress: number
  warn?: boolean  
}

export interface StatCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  sub: string      
  change?: number  
}

export interface SalesData {
  day: string
  revenue: number
  orders: number
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

export interface RecentOrder {
  date: string
  amount: string
  customer: string
  method: string
  status: string
  statusStyle: string
}

export interface NewUser {
  name: string
  amount: string
  orders: number
  pct: number
  color: string
}
export interface OrderRow {
  date: string
  amount: string
  customer: string
  method: string
  status: 'delivered' | 'pending' | 'cancelled'
}