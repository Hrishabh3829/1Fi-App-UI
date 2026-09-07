import React from 'react';
import { EmiPlan } from '../../../types/emi';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Badge } from '../../common/Badge';
import { CheckCircle2, Circle } from 'lucide-react';

interface EMIPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: () => void;
  badge?: string;
}

export const EMIPlanCard: React.FC<EMIPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
  badge,
}) => {
  return (
    <div
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      className={`relative flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? 'border-[#712CDC] bg-purple-50/70 shadow-sm ring-1 ring-[#712CDC]'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-[#712CDC]">
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 fill-[#712CDC] text-white" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-gray-900">
              {formatCurrency(plan.monthlyAmount)}
              <span className="text-xs font-normal text-gray-500"> / mo</span>
            </span>
            {plan.isNoCost ? (
              <Badge variant="purple">No-Cost EMI</Badge>
            ) : (
              <span className="text-[11px] text-gray-500">
                {plan.interestRate}% p.a.
              </span>
            )}
            {badge && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-0.5">
            For {plan.tenureMonths} months • Total: {formatCurrency(plan.totalPayable)}
          </p>
        </div>
      </div>

      {plan.processingFee > 0 ? (
        <span className="text-[10px] text-gray-400">
          Fee: {formatCurrency(plan.processingFee)}
        </span>
      ) : (
        <span className="text-[10px] text-emerald-600 font-medium">
          Zero fee
        </span>
      )}
    </div>
  );
};
