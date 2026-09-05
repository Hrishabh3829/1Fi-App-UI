export interface EmiPlan {
  id: string;
  tenureMonths: number;
  interestRate: number;   // 0 for no-cost EMI
  monthlyAmount: number;
  totalPayable: number;
  processingFee: number;
  isNoCost: boolean;
}

export interface OrderPayload {
  productId: string;
  variantId: string;
  emiPlanId: string;
}

export interface OrderResponse {
  success: boolean;
  orderId: string;
  status: string;
  message?: string;
}
