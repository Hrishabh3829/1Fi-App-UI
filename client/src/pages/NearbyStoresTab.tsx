import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { ChevronDown, MapPin } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  distance: string;
  category: string;
  address: string;
}

const STORES: Store[] = [
  {
    id: 'suzuki-railway',
    name: 'Pacholi Suzuki Railway Road',
    distance: '1.0 KM',
    category: 'Automotive & Two-Wheelers',
    address: 'Near Old Railway Station, Gurugram',
  },
  {
    id: 'croma-mg-road',
    name: 'Croma Electronics - MG Road',
    distance: '2.4 KM',
    category: 'Electronics & Gadgets',
    address: 'DT Mega Mall, Golf Course Road, Gurugram',
  },
  {
    id: 'tanishq-sector-14',
    name: 'Tanishq Jewellery Sector 14',
    distance: '3.1 KM',
    category: 'Jewellery & Watches',
    address: 'Main Market, Sector 14, Gurugram',
  },
];

export const NearbyStoresTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCity] = useState('Gurugram');

  const filteredStores = STORES.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-4">
      {/* Search Bar */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search stores..."
      />

      {/* Section Header with City Selector */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Nearby Stores</h2>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-200 bg-[#F5F0FF] text-[#712CDC] text-xs font-semibold hover:bg-purple-100 transition-colors"
        >
          <MapPin className="w-3 h-3 text-[#712CDC]" />
          <span>{selectedCity}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>

      {/* Stores List */}
      <div className="flex flex-col gap-3">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="flex items-start gap-4 bg-white rounded-[20px] p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(20,14,50,0.04)] hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Store Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center p-2 text-white font-black text-lg select-none shrink-0 shadow-sm">
              S
            </div>

            {/* Store Information */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                  {store.name}
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 shrink-0">
                  {store.distance}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{store.address}</p>
              <p className="text-[11px] text-[#712CDC] font-semibold mt-1">
                Zero Downpayment • Flexible EMIs
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

