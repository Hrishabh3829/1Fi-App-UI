import React from 'react';
import { EmiPlan } from '../../../types/emi';
import { EMIPlanCard } from './EMIPlanCard';
import { Skeleton } from '../../common/Skeleton';

interface EMIPlanSelectorProps {
  plans?: EmiPlan[];
  isLoading: boolean;
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
}

export const EMIPlanSelector: React.FC<EMIPlanSelectorProps> = ({
  plans = [],
  isLoading,
  selectedPlan,
  onSelectPlan,
}) => {
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
        <div className="flex flex-col gap-2" role="radiogroup">
          {plans.map((plan) => (
            <EMIPlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan?.id === plan.id}
              onSelect={() => onSelectPlan(plan)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
