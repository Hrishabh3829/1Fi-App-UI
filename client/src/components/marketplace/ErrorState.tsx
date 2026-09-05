import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load marketplace products. Please check your connection.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[240px]">
      <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-3">
        <AlertCircle className="w-7 h-7 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-semibold text-gray-800">Something went wrong</h3>
      <p className="text-xs text-gray-500 mt-1 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fi-purple text-white text-xs font-semibold hover:bg-fi-purple-dark active:scale-95 transition-all shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retry
        </button>
      )}
    </div>
  );
};
