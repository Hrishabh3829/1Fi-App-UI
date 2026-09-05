import { useQuery } from '@tanstack/react-query';
import { emiService } from '../services/emiService';

export const useEmiPlans = (productId: string | undefined, price?: number) => {
  return useQuery({
    queryKey: ['emiPlans', productId, price],
    queryFn: () => {
      if (!productId) throw new Error('Product ID is required');
      return emiService.getEmiPlans(productId, price);
    },
    enabled: !!productId,
  });
};
