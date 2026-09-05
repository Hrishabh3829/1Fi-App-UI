import React from 'react';
import { PackageOpen } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No products found',
  description = 'Try searching with different keywords or clearing filters.',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[220px]">
      <div className="w-14 h-14 rounded-full bg-purple-50 text-fi-purple flex items-center justify-center mb-3">
        <PackageOpen className="w-7 h-7 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      <p className="text-xs text-gray-500 mt-1 max-w-xs">{description}</p>
    </div>
  );
};

export default EmptyState;

