import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { Card } from '../components/common/Card';
import { MapPin, Navigation, Store } from 'lucide-react';

interface NearbyStoreItem {
  id: string;
  name: string;
  category: string;
  distance: string;
  address: string;
  offer: string;
}

const NEARBY_STORES: NearbyStoreItem[] = [
  {
    id: 'store-1',
    name: 'Croma Megastore',
    category: 'Electronics & Appliances',
    distance: '0.8 km away',
    address: 'Indiranagar 100ft Road, Bengaluru',
    offer: 'Scan QR to pay with 1Fi Mutual Fund EMI',
  },
  {
    id: 'store-2',
    name: 'Reliance Digital',
    category: 'Mobiles & Computing',
    distance: '1.4 km away',
    address: 'Koramangala 5th Block, Bengaluru',
    offer: '0% No-Cost EMI on laptops & phones',
  },
  {
    id: 'store-3',
    name: 'Ather Space Experience Centre',
    category: 'EV Two-Wheelers',
    distance: '2.1 km away',
    address: 'Defence Colony, Indiranagar',
    offer: 'Pledge Mutual Funds for zero down payment',
  },
  {
    id: 'store-4',
    name: 'Vijay Sales',
    category: 'Home & Kitchen Appliances',
    distance: '3.0 km away',
    address: 'Commercial Street, Bengaluru',
    offer: 'Instant approval up to ₹2,50,000 credit',
  },
];

export const NearbyStoresTab: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredStores = NEARBY_STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Search Bar */}
      <div className="px-4 pt-1">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search nearby stores by name or area..."
        />
      </div>

      {/* Location Banner */}
      <div className="mx-4 p-3 bg-white rounded-2xl border border-gray-100 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#712CDC]/10 text-[#712CDC] flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Indiranagar, Bengaluru</span>
            <span className="text-[11px] text-gray-400">Stores accepting 1Fi Pay Later</span>
          </div>
        </div>
        <button className="text-[11px] font-semibold text-[#712CDC] bg-purple-50 px-2.5 py-1 rounded-full">
          Change
        </button>
      </div>

      {/* Stores List */}
      <div className="px-4 flex flex-col gap-3">
        {filteredStores.map((store) => (
          <Card
            key={store.id}
            className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-purple-200 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600">
                  <Store className="w-4 h-4 text-[#712CDC]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{store.name}</h3>
                  <span className="text-[11px] text-gray-400">{store.category}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#712CDC] bg-[#712CDC]/10 px-2 py-0.5 rounded-full">
                <Navigation className="w-2.5 h-2.5" />
                {store.distance}
              </span>
            </div>

            <p className="text-[11px] text-gray-500 pl-11.5">{store.address}</p>

            <div className="mt-1 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-emerald-700">{store.offer}</span>
              <span className="text-[11px] font-bold text-[#712CDC]">Pay in Store &rarr;</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
