import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';
import { useEmiPlans } from '../hooks/useEmiPlans';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { ProductGallery } from '../components/marketplace/ProductDetail/ProductGallery';
import { VariantSelector } from '../components/marketplace/ProductDetail/VariantSelector';
import { EMIPlanSelector } from '../components/marketplace/ProductDetail/EMIPlanSelector';
import { ProceedCTA } from '../components/marketplace/ProductDetail/ProceedCTA';
import { Skeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/marketplace/ErrorState';
import { formatCurrency } from '../utils/formatCurrency';
import { formatEmiDate, getNextEmiDate } from '../utils/emiDates';
import { emiService } from '../services/emiService';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    selectedVariant,
    selectedPlan,
    setSelectedVariant,
    setSelectedPlan,
    addSubmittedOrder,
    resetSelection,
  } = useMarketplaceStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderId: string;
    message: string;
    tenureMonths: number;
    monthlyAmount: number;
    totalPayable: number;
    nextDueDate: string;
  } | null>(null);

  const { data: product, isLoading, isError, error, refetch } = useProduct(id);

  // Initialize selected variant when product loads
  useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant, setSelectedVariant]);

  // Clean up selection when unmounting
  useEffect(() => {
    return () => {
      resetSelection();
    };
  }, [resetSelection]);

  // Calculate current price based on selected variant
  const currentPrice = product
    ? product.basePrice + (selectedVariant?.priceDelta || 0)
    : 0;

  // Calculate current MRP
  const currentMrp = product && product.mrp
    ? product.mrp + (selectedVariant?.priceDelta || 0)
    : undefined;

  // Fetch dynamic EMI plans for current price
  const {
    data: emiPlans,
    isLoading: isEmiLoading,
  } = useEmiPlans(id, currentPrice);

  // Auto-select first EMI plan when plans load or change
  useEffect(() => {
    if (emiPlans && emiPlans.length > 0) {
      setSelectedPlan(emiPlans[0]);
    }
  }, [emiPlans, setSelectedPlan]);

  const handleProceed = async () => {
    if (!product || !selectedVariant || !selectedPlan) return;

    try {
      setIsSubmitting(true);
      const createdAt = new Date();
      const nextDueDate = getNextEmiDate(createdAt);
      const res = await emiService.createOrder({
        productId: product.id,
        variantId: selectedVariant.id,
        emiPlanId: selectedPlan.id,
      });

      // Save order to store so it appears in EMI Dues tab
      addSubmittedOrder({
        orderId: res.orderId,
        productId: product.id,
        productName: product.name,
        productImage: product.images[0],
        variantLabel: selectedVariant.label,
        tenureMonths: selectedPlan.tenureMonths,
        monthlyAmount: selectedPlan.monthlyAmount,
        totalPayable: selectedPlan.totalPayable,
        isNoCost: selectedPlan.isNoCost,
        createdAt: createdAt.toISOString(),
        nextDueDate: nextDueDate.toISOString(),
      });

      setOrderConfirmation({
        orderId: res.orderId,
        message: res.message || '1Fi Mutual Fund EMI application created successfully!',
        tenureMonths: selectedPlan.tenureMonths,
        monthlyAmount: selectedPlan.monthlyAmount,
        totalPayable: selectedPlan.totalPayable,
        nextDueDate: nextDueDate.toISOString(),
      });
    } catch (err) {
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] max-w-[500px] mx-auto p-4 flex flex-col gap-4">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="w-full aspect-square rounded-2xl" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-32 w-full rounded-2xl mt-4" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] max-w-[500px] mx-auto p-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>
        <ErrorState
          message={(error as Error)?.message || 'Product not found'}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] max-w-[500px] mx-auto relative pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-xs">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-extrabold text-[#712CDC] uppercase tracking-wider">
          {product.brand}
        </span>
        <div className="w-8" />
      </header>

      <main className="p-4 flex flex-col gap-4">
        {/* Product Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Title & Price Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#712CDC] uppercase tracking-wider">
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <Sparkles className="w-2.5 h-2.5" />
              0% No-Cost EMI
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
            {product.name}
          </h1>

          <div className="mt-1 flex items-baseline gap-2.5 flex-wrap">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {formatCurrency(currentPrice)}
            </span>
            {currentMrp && currentMrp > currentPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(currentMrp)}
              </span>
            )}
            <span className="text-[11px] text-gray-500 font-normal">
              (incl. all taxes)
            </span>
          </div>

          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Highlights / Badges */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mt-2 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#712CDC]" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 1Fi Mutual Fund Pledge Explainer Card */}
        <div className="bg-gradient-to-br from-[#712CDC]/8 via-purple-50/40 to-white rounded-2xl p-4 border border-purple-100/80 shadow-card flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#712CDC] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              1Fi
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900">
                Shop with Mutual Funds, Keep Compounding
              </h3>
              <p className="text-[11px] text-[#712CDC] font-semibold">
                No credit score required • Backed by your investments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-100/60 text-center">
            <div className="bg-white/90 rounded-xl p-2 border border-purple-50">
              <span className="text-[10px] text-gray-400 block">Required Pledge</span>
              <span className="text-[11px] font-bold text-gray-800">
                {product.mfPledgeRequired
                  ? formatCurrency(product.mfPledgeRequired)
                  : formatCurrency(Math.round(currentPrice * 1.15))}
              </span>
            </div>
            <div className="bg-white/90 rounded-xl p-2 border border-purple-50">
              <span className="text-[10px] text-gray-400 block">Interest Rate</span>
              <span className="text-[11px] font-bold text-emerald-600">
                0% No-Cost
              </span>
            </div>
            <div className="bg-white/90 rounded-xl p-2 border border-purple-50">
              <span className="text-[10px] text-gray-400 block">Lien Status</span>
              <span className="text-[11px] font-bold text-[#712CDC]">
                Auto-Release
              </span>
            </div>
          </div>

          <p className="text-[10.5px] text-gray-500 leading-normal">
            Your mutual fund units remain invested in your name and keep generating returns while you pay regular monthly EMIs.
          </p>
        </div>

        {/* Variant Selector */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />
        </div>

        {/* EMI Plans Selector */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
          <EMIPlanSelector
            plans={emiPlans}
            isLoading={isEmiLoading}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
          />
        </div>

        {/* Technical Specifications */}
        {product.specs && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
            <h3 className="text-xs font-bold text-gray-800 tracking-wide uppercase mb-3">
              Technical Specifications
            </h3>
            <div className="divide-y divide-gray-100 text-xs">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-2 flex justify-between gap-4">
                  <span className="text-gray-500">{key}</span>
                  <span className="text-gray-900 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Checkout CTA */}
      <ProceedCTA
        selectedPlan={selectedPlan}
        onProceed={handleProceed}
        isSubmitting={isSubmitting}
      />

      {/* Confirmation Modal */}
      {orderConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8 fill-emerald-600 text-white" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">Application Submitted!</h3>
            <p className="text-xs text-gray-500 mt-1">{orderConfirmation.message}</p>

            {/* Application Summary Box */}
            <div className="bg-gray-50 rounded-2xl p-3.5 my-3 w-full text-left flex flex-col gap-2 border border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Reference ID</span>
                <span className="font-mono font-bold text-gray-800">{orderConfirmation.orderId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Plan</span>
                <span className="font-bold text-[#712CDC]">
                  {orderConfirmation.tenureMonths} Months @ {formatCurrency(orderConfirmation.monthlyAmount)}/mo
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Mutual Fund Pledge</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Lien Initiated
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">First EMI Due</span>
                <span className="font-semibold text-gray-800">
                  {formatEmiDate(orderConfirmation.nextDueDate)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                id="back-to-shop-btn"
                onClick={() => {
                  setOrderConfirmation(null);
                  navigate('/');
                }}
                className="w-full py-2.5 rounded-full bg-[#712CDC] text-white text-xs font-bold hover:bg-[#581c87] transition-colors shadow-sm"
              >
                Done & Return to Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
