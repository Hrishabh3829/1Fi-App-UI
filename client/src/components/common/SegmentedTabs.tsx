import React from 'react';

export interface TabOption {
  id: string;
  label: string;
}

interface SegmentedTabsProps {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div
      className={`flex w-full items-center gap-1.5 sm:gap-2 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)] ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 rounded-full py-2.5 sm:py-[11px] px-2 text-center text-xs sm:text-sm font-semibold tracking-[-0.005em] transition-all duration-200 outline-none select-none ${
              isActive
                ? 'bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="truncate block">{tab.label}</span>
            {isActive && (
              <span className="absolute bottom-1 sm:bottom-1.5 left-1/2 h-[2.5px] w-5 sm:w-[22px] -translate-x-1/2 rounded-full bg-[#712CDC]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

