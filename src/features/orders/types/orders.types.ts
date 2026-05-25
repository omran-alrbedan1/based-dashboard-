
export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'on_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderSupplier {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo_url?: string;
}

export interface OrderDriver {
  id: number;
  name: string;
  phone: string;
  rating: number;
  vehicle_plate: string;
  photo_url?: string;
}

export interface DeliveryCompany {
  id: number;
  name: string;
  tracking_url?: string;
  tracking_number?: string;
}

export interface LiveLocation {
  lat: number;
  lng: number;
  updated_at: string;
}

export interface DeliveryInfo {
  company: DeliveryCompany;
  driver?: OrderDriver;
  eta?: string;
  live_location?: LiveLocation | null;
  api_status: 'connected' | 'failed' | 'not_available';
  api_error_message?: string;
}

export interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
  image_url?: string;
}

export interface OrderCustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
  delivery_address: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  is_current: boolean;
  is_completed: boolean;
}

export interface Order {
  id: number;
  order_number: string;
  status: OrderStatus;
  customer: OrderCustomer;
  supplier: OrderSupplier;
  items: OrderItem[];
  delivery: DeliveryInfo;
  subtotal: number;
  delivery_fee: number;
  total: number;
  currency: string;
  created_at: string;
  updated_at: string;
  timeline: OrderTimelineEvent[];
}

export interface OrdersListResponse {
  data: Order[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface OrdersFilterParams {
  status?: OrderStatus | 'all';
  search?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
}


import type { DateRange } from 'react-day-picker';

export interface IOrderFilterForm {
  search: string;
  status: string;
  dateRange?: DateRange;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export const EMPTY_STATUS = 'all';
export const ORDER_FILTERS_DEFAULT: IOrderFilterForm = {
  search: '',
  status: EMPTY_STATUS,
  dateRange: undefined,
};