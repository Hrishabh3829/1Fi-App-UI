import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProducts = (params?: {
  search?: string;
  category?: string;
  sort?: string;
  noCostOnly?: boolean;
}) => {
  return useQuery({
    queryKey: ['products', params?.search, params?.category, params?.sort, params?.noCostOnly],
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
