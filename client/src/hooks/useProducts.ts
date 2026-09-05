import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProducts = (params?: { search?: string; category?: string }) => {
  return useQuery({
    queryKey: ['products', params?.search, params?.category],
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
