import React from 'react';
import { EmiPlan } from '../../../types/emi';
import { formatCurrency } from '../../../utils/formatCurrency';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ProceedCTAProps {
  selectedPlan: EmiPlan | null;
  onProceed: () => void;
  isSubmitting?: boolean;
}

export const ProceedCTA: React.FC<ProceedCTAProps> = ({
  selectedPlan,
  onProceed,
  isSubmitting = false,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 max-w-md mx-auto shadow-nav">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-gray-500 font-medium block">
            {selectedPlan ? `${selectedPlan.tenureMonths}-month EMI` : 'Select a plan'}
          </span>
          <span className="text-base font-bold text-gray-900">
            {selectedPlan ? `${formatCurrency(selectedPlan.monthlyAmount)}/mo` : '—'}
          </span>
        </div>

        <button
          onClick={onProceed}
          disabled={!selectedPlan || isSubmitting}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-semibold transition-all shadow-md ${
            !selectedPlan || isSubmitting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-fi-purple text-white hover:bg-fi-purple-dark active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Proceed with EMI
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
