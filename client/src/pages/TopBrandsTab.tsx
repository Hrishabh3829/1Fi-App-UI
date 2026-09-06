import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { Card } from '../components/common/Card';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface BrandItem {
  id: string;
  name: string;
  category: string;
  offer: string;
  logo: string;
  bgGradient: string;
}

const TOP_BRANDS: BrandItem[] = [
  {
    id: 'brand-1',
    name: 'Air India',
    category: 'Travel & Flights',
    offer: 'No-Cost EMI on bookings over ₹5,000',
    logo: '✈️',
    bgGradient: 'from-red-500 to-rose-600',
  },
  {
    id: 'brand-2',
    name: 'Apple India',
    category: 'Electronics & Gadgets',
    offer: '0% EMI up to 6 months via Mutual Funds',
    logo: '🍎',
    bgGradient: 'from-gray-800 to-gray-900',
  },
  {
    id: 'brand-3',
    name: 'MakeMyTrip',
    category: 'Hotels & Holidays',
    offer: 'Zero interest travel loans backed by MFs',
    logo: '🧳',
    bgGradient: 'from-red-600 to-orange-500',
  },
  {
    id: 'brand-4',
    name: 'Flipkart',
    category: 'Shopping & Electronics',
    offer: 'Instant checkout with 1Fi Mutual Fund limit',
    logo: '🛍️',
    bgGradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'brand-5',
    name: 'Samsung',
    category: 'Smartphones & TVs',
    offer: 'Exclusive 0% EMI on Galaxy series',
    logo: '📱',
    bgGradient: 'from-blue-800 to-blue-900',
  },
  {
    id: 'brand-6',
    name: 'Croma',
    category: 'Home Appliances',
    offer: 'Zero down-payment EMI available',
    logo: '⚡',
    bgGradient: 'from-emerald-600 to-teal-700',
  },
];

export const TopBrandsTab: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredBrands = TOP_BRANDS.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Search Online Stores (Real 1Fi SearchBar) */}
      <div className="px-4 pt-1">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search online stores..."
        />
      </div>

      {/* Title */}
      <div className="px-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Top Brands</h2>
        <span className="text-xs text-[#712CDC] font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Partners
        </span>
      </div>

      {/* Brands List */}
      <div className="px-4 flex flex-col gap-3">
        {filteredBrands.map((brand) => (
          <Card
            key={brand.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 transition-all shadow-card cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${brand.bgGradient} flex items-center justify-center text-white text-lg font-bold shadow-xs flex-shrink-0`}
              >
                {brand.logo}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#712CDC] transition-colors">
                  {brand.name}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {brand.category}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  {brand.offer}
                </span>
              </div>
            </div>

            <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:text-[#712CDC] group-hover:bg-purple-50 transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
