export interface ProductVariant {
  id: string;
  label: string;        // e.g. "128GB / Black"
  priceDelta: number;   // added to basePrice
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  images: string[];
  basePrice: number;
  mrp?: number;
  mfPledgeRequired?: number;
  highlights?: string[];
  variants: ProductVariant[];
  description: string;
  specs: Record<string, string>;
}

