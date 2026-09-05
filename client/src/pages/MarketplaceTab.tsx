import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/common/SearchBar';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { ErrorState } from '../components/marketplace/ErrorState';
import { useProducts } from '../hooks/useProducts';
import { useMarketplaceStore } from '../store/marketplaceStore';

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'EV Two-Wheelers', 'Wearables'];

export const MarketplaceTab: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useMarketplaceStore();

  const { data: products, isLoading, isError, error, refetch } = useProducts({
    search: searchQuery,
    category: selectedCategory === 'All' ? undefined : selectedCategory,
  });

  return (
    <div className="flex flex-col gap-4 pb-20">
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-fi-purple text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

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
