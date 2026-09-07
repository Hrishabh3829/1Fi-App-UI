import React from 'react';
import { EmiPlan } from '../../../types/emi';
import { EMIPlanCard } from './EMIPlanCard';
import { Skeleton } from '../../common/Skeleton';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Badge } from '../../common/Badge';

interface EMIPlanSelectorProps {
  plans?: EmiPlan[];
  isLoading: boolean;
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
  productPrice: number;
}

export const EMIPlanSelector: React.FC<EMIPlanSelectorProps> = ({
  plans = [],
  isLoading,
  selectedPlan,
  onSelectPlan,
  productPrice,
}) => {
  const comparisonPlans = plans.filter((plan) => [3, 6, 9, 12].includes(plan.tenureMonths));
  const lowestMonthlyAmount = Math.min(...plans.map((plan) => plan.monthlyAmount));
  const bestValueTotal = Math.min(...plans.map((plan) => plan.totalPayable));
  const highestTotal = Math.max(...plans.map((plan) => plan.totalPayable));

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
          Choose EMI Plan
        </label>
        <span className="text-[11px] text-fi-purple font-medium">
          Backed by your Mutual Funds
        </span>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {selectedPlan && (
            <div className="rounded-2xl bg-[#712CDC]/5 border border-purple-100 p-3 mb-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-gray-900">Your live EMI estimate</span>
                <Badge variant="purple">{selectedPlan.tenureMonths} months</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-gray-500 block">Monthly EMI</span><strong className="text-sm text-gray-900">{formatCurrency(selectedPlan.monthlyAmount)}</strong></div>
                <div><span className="text-gray-500 block">Total payable</span><strong className="text-sm text-gray-900">{formatCurrency(selectedPlan.totalPayable)}</strong></div>
                <div><span className="text-gray-500 block">Processing fee</span><strong className="text-gray-800">{formatCurrency(selectedPlan.processingFee)}</strong></div>
                <div><span className="text-gray-500 block">Interest</span><strong className="text-gray-800">{selectedPlan.interestRate}% ({formatCurrency(Math.max(0, selectedPlan.totalPayable - productPrice - selectedPlan.processingFee))})</strong></div>
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold mt-2">
                You save {formatCurrency(Math.max(0, highestTotal - selectedPlan.totalPayable))} compared with the highest-cost plan.
              </p>
            </div>
          )}

          <p className="text-[11px] font-semibold text-gray-500 mt-2">Compare popular plans</p>
          <div className="grid grid-cols-2 gap-2" role="radiogroup">
            {comparisonPlans.map((plan) => (
              <EMIPlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan?.id === plan.id}
                onSelect={() => onSelectPlan(plan)}
                badge={plan.monthlyAmount === lowestMonthlyAmount ? 'Lowest EMI' : plan.totalPayable === bestValueTotal ? 'Best value' : undefined}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-2" role="radiogroup">
            {plans.filter((plan) => ![3, 6, 9, 12].includes(plan.tenureMonths)).map((plan) => (
              <EMIPlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan?.id === plan.id}
                onSelect={() => onSelectPlan(plan)}
                badge={plan.monthlyAmount === lowestMonthlyAmount ? 'Lowest EMI' : plan.totalPayable === bestValueTotal ? 'Best value' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
