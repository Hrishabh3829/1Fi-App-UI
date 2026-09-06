import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, Sparkles } from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { ErrorState } from '../components/marketplace/ErrorState';
import { useProducts } from '../hooks/useProducts';
import { useMarketplaceStore } from '../store/marketplaceStore';

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'EV Two-Wheelers', 'Wearables'];

export const MarketplaceTab: React.FC = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    noCostOnly,
    setNoCostOnly,
  } = useMarketplaceStore();

  const { data: products, isLoading, isError, error, refetch } = useProducts({
    search: searchQuery,
    category: selectedCategory === 'All' ? undefined : selectedCategory,
    sort: sortBy === 'featured' ? undefined : sortBy,
    noCostOnly: noCostOnly ? true : undefined,
  });

  return (
    <div className="flex flex-col gap-3.5 pb-20">
      {/* Search Bar */}
      <div className="px-4 pt-1">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search products, brands, gadgets..."
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 px-4 overflow-x-auto no-scrollbar py-0.5">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isActive
                  ? 'bg-[#712CDC] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Micro Filter / Sort Toolbar */}
      <div className="flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-2">
          {/* 0% No-Cost EMI Toggle Pill */}
          <button
            onClick={() => setNoCostOnly(!noCostOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all select-none text-[11px] font-medium ${
              noCostOnly
                ? 'bg-[#712CDC]/10 text-[#712CDC] border-[#712CDC]/30 font-semibold'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${noCostOnly ? 'text-[#712CDC]' : 'text-gray-400'}`} />
            <span>0% No-Cost Only</span>
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2.5 py-1 text-gray-600">
          <ArrowUpDown className="w-3 h-3 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-[11px] font-medium text-gray-700 outline-none cursor-pointer"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {!isLoading && !isError && products && (
        <div className="px-4 text-[11px] text-gray-400 font-medium">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'} backed by Mutual Funds
        </div>
      )}

      {/* Product Content */}
      {isError ? (
        <ErrorState
          message={(error as Error)?.message || 'Unable to load products. Please check if the mock server is running.'}
          onRetry={() => refetch()}
        />
      ) : (
        <ProductGrid
          products={products}
          isLoading={isLoading}
          onProductClick={(id) => navigate(`/product/${id}`)}
        />
      )}
    </div>
  );
};
