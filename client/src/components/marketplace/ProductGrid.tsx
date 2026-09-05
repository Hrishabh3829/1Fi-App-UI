import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../common/Skeleton';
import { EmptyState } from './EmptyState';

export interface ProductGridProps {
  products?: Product[];
  isLoading: boolean;
  onProductClick: (productId: string) => void;
}


export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  isLoading,
  onProductClick,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-card">
            <Skeleton className="w-full aspect-square rounded-xl" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
