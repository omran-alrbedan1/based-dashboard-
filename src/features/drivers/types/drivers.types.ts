export type DriverStatus = 'active' | 'suspended' | 'pending' | 'offline'

export interface DriverArea {
  id: number
  name: string
}

export interface DriverDocument {
  id: number
  type: string
  url: string
  verified: boolean
  expires_at?: string | null
  uploaded_at?: string
}

export interface DriverOrderHistoryItem {
  id: number
  order_number?: string
  status: 'pending' | 'accepted' | 'preparing' | 'on_delivery' | 'delivered' | 'cancelled'
  created_at: string
  delivery_fee: number
  total?: number
  currency?: string
  vendor?: {
    id: number
    name: string
  }
  customer?: {
    name: string
    delivery_address?: string
  }
  items_count?: number
}

export interface DriverStats {
  total_orders: number
  completed_orders: number
  cancelled_orders: number
  avg_rating: number
  delivery_rate: number
  avg_delivery_time: number
}

export interface Driver {
  id: number
  name: string
  phone: string
  email?: string
  status: DriverStatus
  gender?: 'male' | 'female'
  date_of_birth?: string
  national_id?: string
  address?: string
  vehicle_type?: string
  vehicle_model?: string
  vehicle_color?: string
  vehicle_plate?: string
  license_number?: string
  avatar?: string
  created_at: string
  updated_at?: string
  areas?: DriverArea[]
  orders_count?: number
  rating?: number
  reviews_count?: number
}

export interface PaginationMeta {
  page: number
  total: number
  lastPage: number
  per_page: number
}

export interface DriversListResponse {
  data: Driver[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface DriversFilterParams {
  page?: number
  per_page?: number
  search?: string
  status?: string
  area_id?: string | number
  sort_by?: string
  sort_dir?: 'asc' | 'desc'
}

export const EMPTY_STATUS = 'all'
export const EMPTY_AREA = 'all'

export interface IDriverFilterForm {
  search: string
  status: string
  area_id: string
}

export const DRIVER_FILTERS_DEFAULT: IDriverFilterForm = {
  search: '',
  status: EMPTY_STATUS,
  area_id: EMPTY_AREA,
}

