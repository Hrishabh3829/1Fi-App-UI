import { apiClient } from './apiClient';
import { EmiPlan, OrderPayload, OrderResponse } from '../types/emi';

export const emiService = {
  getEmiPlans: async (productId: string, price?: number): Promise<EmiPlan[]> => {
    const { data } = await apiClient.get<EmiPlan[]>(`/products/${productId}/emi-plans`, {
      params: price ? { price } : undefined,
    });
    return data;
  },

  createOrder: async (payload: OrderPayload): Promise<OrderResponse> => {
    const { data } = await apiClient.post<OrderResponse>('/orders', payload);
    return data;
  },
};
