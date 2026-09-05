import { create } from 'zustand';
import { ProductVariant } from '../types/product';
import { EmiPlan } from '../types/emi';

interface MarketplaceState {
  selectedVariant: ProductVariant | null;
  selectedPlan: EmiPlan | null;
  searchQuery: string;
  selectedCategory: string;
  setSelectedVariant: (variant: ProductVariant | null) => void;
  setSelectedPlan: (plan: EmiPlan | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  resetSelection: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  selectedVariant: null,
  selectedPlan: null,
  searchQuery: '',
  selectedCategory: 'All',
  setSelectedVariant: (variant) => set({ selectedVariant: variant }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  resetSelection: () => set({ selectedVariant: null, selectedPlan: null }),
}));
