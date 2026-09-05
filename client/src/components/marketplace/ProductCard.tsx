import React from 'react';
import { Product } from '../../types/product';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateMonthlyEmi } from '../../utils/calculateEmi';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // Estimate lowest monthly EMI (e.g. 6-month or 12-month tenure)
  const minMonthlyEmi = calculateMonthlyEmi(product.basePrice, 0, 6);

  return (
    <Card interactive onClick={onClick} className="flex flex-col gap-3 group">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="purple" className="shadow-xs">
            From {formatCurrency(minMonthlyEmi)}/mo
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[11px] font-semibold text-fi-purple tracking-wider uppercase">
            {product.brand}
          </div>
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-fi-purple transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {product.description}
          </p>
        </div>

        <div className="mt-3 flex items-baseline justify-between border-t border-gray-100 pt-2">
          <span className="text-xs text-gray-400 font-medium">Starting at</span>
          <span className="text-sm font-bold text-gray-900">
            {formatCurrency(product.basePrice)}
          </span>
        </div>
      </div>
    </Card>
  );
};
