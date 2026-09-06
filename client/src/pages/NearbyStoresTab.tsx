import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { ChevronDown, MapPin, Navigation, X } from 'lucide-react';
import suzukiLogo from '../assets/ashoka-suzuki.webp';
import hondaLogo from '../assets/Honda-motors.webp';
import cromaLogo from '../assets/croma-34941f.webp';
import chargerLogo from '../assets/charger-on-wheels-c47579.webp';

interface Store {
  id: string;
  name: string;
  distance: string;
  category: string;
  address: string;
  logo: string;
  logoBg: string;
}

const STORES: Store[] = [
  {
    id: 'ashoka-suzuki',
    name: 'Ashoka Suzuki Railway Road',
    distance: '1.0 KM',
    category: 'Automotive & Two-Wheelers',
    address: 'Near Old Railway Station, Gurugram',
    logo: suzukiLogo,
    logoBg: 'bg-white border border-gray-100',
  },
  {
    id: 'honda-motors',
    name: 'Honda Motors Showroom',
    distance: '2.1 KM',
    category: 'Automotive & Two-Wheelers',
    address: 'Sohna Road, Sector 48, Gurugram',
    logo: hondaLogo,
    logoBg: 'bg-white border border-gray-100',
  },
  {
    id: 'croma-mg-road',
    name: 'Cromā Electronics - MG Road',
    distance: '2.4 KM',
    category: 'Electronics & Gadgets',
    address: 'DT Mega Mall, Golf Course Road, Gurugram',
    logo: cromaLogo,
    logoBg: 'bg-[#00A7A0]',
  },
  {
    id: 'charger-on-wheels',
    name: 'Charger on Wheels',
    distance: '3.8 KM',
    category: 'EV & Charging Solutions',
    address: 'Sector 56, Golf Course Extension, Gurugram',
    logo: chargerLogo,
    logoBg: 'bg-white border border-gray-100',
  },
];

const CITIES = ['Gurugram', 'Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'];

/** Location bottom-sheet modal */
const LocationModal: React.FC<{
  onSelect: (city: string) => void;
  onClose: () => void;
}> = ({ onSelect, onClose }) => {
  const [pincode, setPincode] = useState('122001');

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[70] w-full max-w-[500px] bg-white rounded-t-[28px] shadow-[0_-8px_40px_rgba(20,14,50,0.16)] px-5 pt-4 pb-8"
        role="dialog"
        aria-modal="true"
        aria-label="Select Your Location"
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Select Your Location</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Use Current Location */}
        <button
          type="button"
          onClick={() => { onSelect('Current Location'); onClose(); }}
          className="w-full flex items-center gap-3.5 p-4 rounded-2xl border-2 border-[#712CDC] bg-white hover:bg-[#F5F0FF] transition-colors mb-4 group"
        >
          <div className="w-9 h-9 rounded-full bg-[#F5F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#EDE5FF] transition-colors">
            <Navigation className="w-4.5 h-4.5 text-[#712CDC]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-[#712CDC]">Use Current Location</p>
            <p className="text-xs text-gray-500">Grant location access to sort stores</p>
          </div>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Pincode Search */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter Pincode
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPin className="w-4 h-4" />
              </span>
              <input
                type="tel"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="122001"
                maxLength={6}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#712CDC]/20 focus:border-[#712CDC] transition-all"
              />
            </div>
            <button
              type="button"
              onClick={() => { onSelect('Gurugram'); onClose(); }}
              className="px-5 py-2.5 rounded-full bg-[#712CDC] text-white text-sm font-semibold hover:bg-[#5b24b5] active:scale-95 transition-all"
            >
              Search
            </button>
          </div>
        </div>

        {/* Popular Cities */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Popular Cities</p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => { onSelect(city); onClose(); }}
                className="px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:border-[#712CDC] hover:text-[#712CDC] hover:bg-[#F5F0FF] active:scale-95 transition-all"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const NearbyStoresTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('Gurugram');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const filteredStores = STORES.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
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
            onClick={() => setShowLocationModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-200 bg-[#F5F0FF] text-[#712CDC] text-xs font-semibold hover:bg-purple-100 active:scale-95 transition-all"
          >
            <MapPin className="w-3 h-3" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>

        {/* Stores List */}
        <div className="flex flex-col gap-3">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="flex items-start gap-4 bg-white rounded-[20px] p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(20,14,50,0.04)] hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              {/* Store Logo */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden select-none shrink-0 ${store.logoBg}`}
              >
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-full h-full object-contain p-1"
                  draggable={false}
                />
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
                <p className="text-xs text-gray-500 mt-0.5 truncate">{store.address}</p>
                <p className="text-[11px] text-[#712CDC] font-semibold mt-1">
                  Zero Downpayment • Flexible EMIs
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Picker Modal */}
      {showLocationModal && (
        <LocationModal
          onSelect={setSelectedCity}
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </>
  );
};
