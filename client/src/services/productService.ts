import { apiClient } from './apiClient';
import { Product } from '../types/product';

export const productService = {
  getProducts: async (params?: { search?: string; category?: string }): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/products', { params });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },
};
