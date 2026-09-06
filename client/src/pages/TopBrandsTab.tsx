import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import airIndiaLogo from '../assets/air-india-8aa106.webp';
import appleLogo from '../assets/apple-premium-reseller-df9551.webp';
import atelierLogo from '../assets/atelier-forbidden-journeys-ce5e98.webp';

interface Brand {
  id: string;
  name: string;
  emiOffer: string;
  logo: string;
  logoBg: string;
}

const BRANDS: Brand[] = [
  {
    id: 'air-india',
    name: 'Air India',
    emiOffer: 'No-cost EMIs upto 18 months',
    logo: airIndiaLogo,
    logoBg: 'bg-[#D90429]',
  },
  {
    id: 'apple',
    name: 'Apple Premium Reseller',
    emiOffer: 'No-cost EMIs upto 24 months',
    logo: appleLogo,
    logoBg: 'bg-black',
  },
  {
    id: 'atelier',
    name: 'Atelier - Forbidden Journeys',
    emiOffer: 'No-cost EMIs upto 6 months',
    logo: atelierLogo,
    logoBg: 'bg-white border border-gray-100',
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
            className="flex items-center gap-4 bg-white rounded-[20px] p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(20,14,50,0.04)] hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
          >
            {/* Brand Logo */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden select-none shrink-0 ${brand.logoBg}`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-2xl"
                draggable={false}
              />
            </div>

            {/* Brand Information */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 truncate">{brand.name}</h3>
              <p className="text-xs text-[#712CDC] font-medium mt-0.5">{brand.emiOffer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

