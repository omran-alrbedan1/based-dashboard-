export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Refunded = 'refunded',
}

export enum PaymentMethod {
  Cash = 'cash',
  Online = 'online',
}

export interface Refund {
  status: string | null;
  amount: number | null;
  refunded_at: string | null;
}

export interface PaymentEvent {
  label: string;
  timestamp: string;
  completed?: boolean;
}

export interface PaymentRecord {
  id: number;
  provider: string;
  payment_intent_id: string;
  transaction_id: string;
  amount: number;
  currency: string;
  paid_at: string | null;
  failure_reason: string | null;
  refund: Refund;
  events?: PaymentEvent[];
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  member_since?: string;
  total_orders?: number;
  lifetime_value?: number;
  avatar_url?: string;
}

export interface Shipping {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderPayment {
  id: number;
  order_number: string;
  total: number;
  currency: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  created_at: string;
  customer: Customer;
  shipping: Shipping;
  payment_record?: PaymentRecord;
}