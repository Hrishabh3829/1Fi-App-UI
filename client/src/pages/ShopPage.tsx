import React, { useState } from 'react';
import { ShopBanner } from '../components/shop/ShopBanner';
import { SegmentedTabs, TabOption } from '../components/common/SegmentedTabs';
import { BottomNav } from '../components/common/BottomNav';
import { MarketplaceTab } from './MarketplaceTab';
import { TopBrandsTab } from './TopBrandsTab';
import { NearbyStoresTab } from './NearbyStoresTab';
import { EmiDuesTab } from './EmiDuesTab';

const TABS: TabOption[] = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
];

export const ShopPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [bottomNavTab, setBottomNavTab] = useState<string>('shop');

  const handleBottomNavSelect = (tabId: string) => {
    setBottomNavTab(tabId);
    if (tabId === 'shop' && !activeTab) {
      setActiveTab('marketplace');
    }
  };

  const handleBrowseMarketplace = () => {
    setBottomNavTab('shop');
    setActiveTab('marketplace');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] max-w-[500px] mx-auto relative pb-28 flex flex-col antialiased">
      {bottomNavTab === 'shop' ? (
        <>
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
            {activeTab === 'marketplace' && <MarketplaceTab />}
            {activeTab === 'top-brands' && <TopBrandsTab />}
            {activeTab === 'nearby-stores' && <NearbyStoresTab />}
          </main>
        </>
      ) : bottomNavTab === 'emi-dues' ? (
        <main className="flex-1 pt-4">
          <EmiDuesTab onBrowseMarketplace={handleBrowseMarketplace} />
        </main>
      ) : (
        /* Minimal clean placeholder for other bottom nav items like Limit or Profile */
        <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-[#712CDC] mb-3">
            <span className="text-xl font-bold uppercase">{bottomNavTab.charAt(0)}</span>
          </div>
          <h2 className="text-base font-bold text-gray-900 capitalize">{bottomNavTab}</h2>
          <p className="text-xs text-gray-400 mt-1">1Fi Mutual Fund Credit Limit & Settings</p>
          <button
            onClick={handleBrowseMarketplace}
            className="mt-4 px-4 py-2 rounded-full bg-[#712CDC] text-white text-xs font-semibold"
          >
            Return to Shop
          </button>
        </main>
      )}

      {/* Floating Bottom Navigation Dock */}
      <BottomNav activeTab={bottomNavTab} onTabSelect={handleBottomNavSelect} />
    </div>
  );
};

