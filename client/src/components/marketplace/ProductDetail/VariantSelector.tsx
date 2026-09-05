import React from 'react';
import { ProductVariant } from '../../../types/product';
import { formatCurrency } from '../../../utils/formatCurrency';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
        Select Variant
      </label>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isSelected = selectedVariant?.id === v.id;
          return (
            <button
              key={v.id}
              onClick={() => onSelectVariant(v)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all text-left flex items-center gap-2 ${
                isSelected
                  ? 'border-fi-purple bg-purple-50 text-fi-purple shadow-xs ring-1 ring-fi-purple'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{v.label}</span>
              {v.priceDelta > 0 && (
                <span className="text-[10px] text-gray-500 font-normal">
                  (+{formatCurrency(v.priceDelta)})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
