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
      className={`inline-flex items-center bg-[#ECEBF8] p-1 rounded-full shadow-inner ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-white text-fi-purple shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-fi-purple rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
