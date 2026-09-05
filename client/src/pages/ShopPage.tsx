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
    <div className="min-h-screen bg-fi-bg max-w-md mx-auto relative pb-16 flex flex-col">
      {/* Top Banner */}
      <ShopBanner />

      {/* Segmented Tab Switcher */}
      <div className="flex justify-center -mt-5 mb-4 z-20 px-4">
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

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab="shop" />
    </div>
  );
};
