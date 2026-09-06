import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';

interface Brand {
  id: string;
  name: string;
  emiOffer: string;
  badgeBg: string;
  badgeText: string;
  logoType: 'air-india' | 'apple' | 'caratlane' | 'cgh';
}

const BRANDS: Brand[] = [
  {
    id: 'air-india',
    name: 'Air India',
    emiOffer: 'No-cost EMIs upto 18 months',
    badgeBg: 'bg-[#D90429]',
    badgeText: 'AIR INDIA',
    logoType: 'air-india',
  },
  {
    id: 'apple',
    name: 'Apple Premium Reseller',
    emiOffer: 'No-cost EMIs upto 24 months',
    badgeBg: 'bg-black',
    badgeText: ' Premium Reseller',
    logoType: 'apple',
  },
  {
    id: 'caratlane',
    name: 'CaratLane',
    emiOffer: 'No-cost EMIs upto 6 months',
    badgeBg: 'bg-[#5B0048]',
    badgeText: 'CARATLANE',
    logoType: 'caratlane',
  },
  {
    id: 'cgh-earth',
    name: 'CGH Earth',
    emiOffer: 'No-cost EMIs upto 6 months',
    badgeBg: 'bg-[#F2EFE9]',
    badgeText: 'CGH earth',
    logoType: 'cgh',
  },
];

export const TopBrandsTab: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredBrands = BRANDS.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-4">
      {/* Search Bar */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search online stores..."
      />

      {/* Section Heading */}
      <div className="pt-1">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Top Brands</h2>
      </div>

      {/* Brands List */}
      <div className="flex flex-col gap-3">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center gap-4 bg-white rounded-[20px] p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(20,14,50,0.04)] hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Brand Logo Box */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center p-2 text-center select-none shrink-0 ${brand.badgeBg}`}
            >
              {brand.logoType === 'air-india' && (
                <span className="text-white font-extrabold text-[10px] tracking-tight uppercase leading-none">
                  AIR INDIA
                </span>
              )}
              {brand.logoType === 'apple' && (
                <div className="text-white flex flex-col items-center">
                  <svg className="w-6 h-6 fill-current mb-0.5" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-6.3-9.77-11.23-20.9-14.79-33.39-3.56-12.5-5.34-24.36-5.34-35.6 0-14.28 3.65-26.06 10.96-35.32 7.3-9.27 16.51-13.96 27.63-14.07 4.79 0 10.23 1.34 16.32 4.02 6.09 2.68 10.05 4.08 11.87 4.19 1.45 0 5.48-1.4 12.09-4.19 6.61-2.79 12.03-4.08 16.27-3.88 12.63.78 22.84 5.38 30.63 13.8-11.09 6.74-16.52 16.14-16.3 28.2.22 9.54 3.86 17.51 10.94 23.91 7.07 6.4 15.54 10.13 25.4 11.19-2.22 6.74-4.88 13.4-7.97 19.98zm-30.82-105.7c0-6.19 2.22-11.96 6.66-17.31 4.45-5.35 10.01-8.99 16.69-10.92.22 1.56.33 3.01.33 4.35 0 6.08-2.39 11.97-7.18 17.67-4.79 5.7-10.42 9.21-16.89 10.53-.22-1.34-.33-2.78-.33-4.32z" />
                  </svg>
                  <span className="text-[7px] font-medium tracking-tight text-white/90 leading-none">
                    Reseller
                  </span>
                </div>
              )}
              {brand.logoType === 'caratlane' && (
                <div className="text-white flex flex-col items-center justify-center">
                  <span className="text-[12px] font-bold tracking-wider">💎</span>
                  <span className="text-[8px] font-bold tracking-tight uppercase leading-none mt-0.5">
                    CARATLANE
                  </span>
                </div>
              )}
              {brand.logoType === 'cgh' && (
                <span className="text-[#3A4D39] font-serif font-bold text-[10px] leading-tight">
                  CGH earth
                </span>
              )}
            </div>

            {/* Brand Information */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 truncate">{brand.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{brand.emiOffer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

