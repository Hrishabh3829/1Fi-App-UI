import React, { useState } from 'react';
import { ShopBanner } from '../components/shop/ShopBanner';
import { SegmentedTabs, TabOption } from '../components/common/SegmentedTabs';
import { BottomNav } from '../components/common/BottomNav';
import { TopBrandsTab } from './TopBrandsTab';
import { NearbyStoresTab } from './NearbyStoresTab';
import { MarketplaceTab } from './MarketplaceTab';

const TABS: TabOption[] = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
];

export const ShopPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('marketplace');

  return (
    <div className="min-h-screen bg-[#F5F5F7] max-w-[500px] mx-auto relative pb-28 flex flex-col antialiased">
      {/* Top Banner */}
      <ShopBanner />

      {/* Floating Segmented Tab Switcher */}
      <div className="relative z-20 -mt-7 mb-4 px-3 sm:px-4">
        <SegmentedTabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Tab Contents */}
      <main className="flex-1">
        {activeTab === 'top-brands' && <TopBrandsTab />}
        {activeTab === 'nearby-stores' && <NearbyStoresTab />}
        {activeTab === 'marketplace' && <MarketplaceTab />}
      </main>

      {/* Floating Bottom Navigation Dock */}
      <BottomNav activeTab="shop" />
    </div>
  );
};

