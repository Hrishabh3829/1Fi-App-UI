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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 max-w-[500px] mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-gray-500 font-medium block">
            {selectedPlan ? `${selectedPlan.tenureMonths}-Month Plan` : 'Select EMI'}
          </span>
          <span className="text-base font-extrabold text-gray-900">
            {selectedPlan ? `${formatCurrency(selectedPlan.monthlyAmount)}/mo` : '—'}
          </span>
        </div>

        <button
          id="proceed-btn"
          onClick={onProceed}
          disabled={!selectedPlan || isSubmitting}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md ${
            !selectedPlan || isSubmitting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#712CDC] text-white hover:bg-[#581c87] active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Proceed with EMI</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
