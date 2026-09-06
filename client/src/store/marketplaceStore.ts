import { create } from 'zustand';
import { ProductVariant } from '../types/product';
import { EmiPlan } from '../types/emi';

export interface SubmittedOrder {
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  variantLabel: string;
  tenureMonths: number;
  monthlyAmount: number;
  totalPayable: number;
  isNoCost: boolean;
  createdAt: string;
}

interface MarketplaceState {
  selectedVariant: ProductVariant | null;
  selectedPlan: EmiPlan | null;
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'featured' | 'price_asc' | 'price_desc';
  noCostOnly: boolean;
  submittedOrders: SubmittedOrder[];
  setSelectedVariant: (variant: ProductVariant | null) => void;
  setSelectedPlan: (plan: EmiPlan | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: 'featured' | 'price_asc' | 'price_desc') => void;
  setNoCostOnly: (noCostOnly: boolean) => void;
  addSubmittedOrder: (order: SubmittedOrder) => void;
  resetSelection: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  selectedVariant: null,
  selectedPlan: null,
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'featured',
  noCostOnly: false,
  submittedOrders: [],
  setSelectedVariant: (variant) => set({ selectedVariant: variant }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  setNoCostOnly: (noCostOnly) => set({ noCostOnly }),
  addSubmittedOrder: (order) =>
    set((state) => ({ submittedOrders: [order, ...state.submittedOrders] })),
  resetSelection: () => set({ selectedVariant: null, selectedPlan: null }),
}));
