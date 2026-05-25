
import { Order, OrdersListResponse, OrdersFilterParams } from '../types/orders.types';

export const ordersService = {
  getOrders: async (_params: OrdersFilterParams): Promise<OrdersListResponse> => {
    throw new Error('Not implemented');
  },

  getOrderById: async (_id: number): Promise<Order> => {
    // TODO: Replace with real API call
    // const response = await axios.get(`/admin/orders/${id}`);
    // return response.data.data;
    throw new Error('Not implemented');
  },

  getLiveLocation: async (_orderId: number) => {
    // TODO: Replace with real API call
    throw new Error('Not implemented');
  },

  updateOrderStatus: async (_orderId: number, _status: string): Promise<Order> => {
    // TODO: Replace with real API call
    throw new Error('Not implemented');
  },

  processRefund: async (_orderId: number, _reason: string): Promise<void> => {
    // TODO: Replace with real API call
    throw new Error('Not implemented');
  },
};