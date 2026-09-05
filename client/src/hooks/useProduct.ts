import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) throw new Error('Product ID is required');
      return productService.getProductById(id);
    },
    enabled: !!id,
  });
};
