import { FilterConfig } from '@/hooks/useFilter';
import { EMPTY_STATUS, Order } from '../types/orders.types';
import { OrderStatus } from "../types/orders.types";
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  XCircle,
} from 'lucide-react';

export interface StatusConfig {
  label: string;
  labelAr: string;
  color: string;
  textColor: string;
  dotColor: string;
  icon: React.ComponentType<any>;
  iconColor?: string;
}

export const ordersFilterConfig: FilterConfig<Order>[] = [
  {
    key: 'search',
    label: 'Search',
    type: 'search',
    getValue: (order) => [order.order_number, order.customer.name, order.customer.email],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'accepted', label: 'Accepted' },
      { value: 'preparing', label: 'Preparing' },
      { value: 'on_delivery', label: 'On Delivery' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
    getValue: (order) => order.status,
  },
  {
    key: 'dateRange',
    label: 'Date Range',
    type: 'range',
    getValue: (order) => new Date(order.created_at).getTime(),
  },
];

export const orderFiltersUIOptions = [
  { value: EMPTY_STATUS, label: 'All Statuses', icon: AlertCircle },
  { value: 'pending', label: 'Pending', icon: Clock },
  { value: 'accepted', label: 'Accepted', icon: CheckCircle },
  { value: 'preparing', label: 'Preparing', icon: Package },
  { value: 'on_delivery', label: 'On Delivery', icon: Truck },
  { value: 'delivered', label: 'Delivered', icon: MapPin },
  { value: 'cancelled', label: 'Cancelled', icon: XCircle },
];

export const orderStatusConfig: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: 'Pending',
    labelAr: 'قيد الانتظار',
    color: 'bg-amber-100',
    textColor: 'text-amber-800',
    dotColor: 'bg-amber-400',
    icon: Clock,
    iconColor: 'text-amber-600',
  },
  accepted: {
    label: 'Accepted',
    labelAr: 'تم القبول',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    dotColor: 'bg-blue-500',
    icon: CheckCircle,
    iconColor: 'text-blue-600',
  },
  preparing: {
    label: 'Preparing',
    labelAr: 'جاري التحضير',
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    dotColor: 'bg-orange-400',
    icon: Package,
    iconColor: 'text-orange-600',
  },
  on_delivery: {
    label: 'On Delivery',
    labelAr: 'في الطريق',
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    dotColor: 'bg-purple-500',
    icon: Truck,
    iconColor: 'text-purple-600',
  },
  delivered: {
    label: 'Delivered',
    labelAr: 'تم التسليم',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    dotColor: 'bg-green-500',
    icon: MapPin,
    iconColor: 'text-green-600',
  },
  cancelled: {
    label: 'Cancelled',
    labelAr: 'ملغي',
    color: 'bg-red-100',
    textColor: 'text-red-800',
    dotColor: 'bg-red-500',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
};