import React from 'react';
import { Product } from '../../types/product';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateMonthlyEmi } from '../../utils/calculateEmi';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // Estimate lowest monthly EMI (6-month 0% No-Cost EMI)
  const minMonthlyEmi = calculateMonthlyEmi(product.basePrice, 0, 6);

  return (
    <Card
      interactive
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}, ${formatCurrency(product.basePrice)}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      className="flex flex-col gap-2.5 p-3 group rounded-2xl border border-gray-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-purple-200 transition-all bg-white"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAFAFC] flex items-center justify-center p-3 border border-gray-100/60">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#712CDC]/10 text-[#712CDC] border border-[#712CDC]/20">
            0% No-Cost
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold text-[#712CDC] tracking-wider uppercase">
            {product.brand}
          </span>
          <h3 className="font-bold text-[13px] text-gray-900 line-clamp-1 group-hover:text-[#712CDC] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
            {product.description}
          </p>
        </div>

        {/* Pricing & EMI */}
        <div className="pt-2 border-t border-gray-100 flex flex-col gap-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-extrabold text-gray-900 tracking-tight">
              {formatCurrency(product.basePrice)}
            </span>
            {product.mrp && product.mrp > product.basePrice && (
              <span className="text-[10px] text-gray-400 line-through font-normal">
                {formatCurrency(product.mrp)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10.5px] font-medium text-emerald-700 bg-emerald-50/90 px-1.5 py-0.5 rounded-md w-fit">
            <span>From</span>
            <span className="font-bold text-emerald-800">{formatCurrency(minMonthlyEmi)}/mo</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

