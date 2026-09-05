import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
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
import { emiService } from '../services/emiService';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    selectedVariant,
    selectedPlan,
    setSelectedVariant,
    setSelectedPlan,
    resetSelection,
  } = useMarketplaceStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderId: string;
    message: string;
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
      const res = await emiService.createOrder({
        productId: product.id,
        variantId: selectedVariant.id,
        emiPlanId: selectedPlan.id,
      });

      setOrderConfirmation({
        orderId: res.orderId,
        message: res.message || 'Application submitted successfully!',
      });
    } catch (err) {
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-fi-bg max-w-md mx-auto p-4 flex flex-col gap-4">
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
      <div className="min-h-screen bg-fi-bg max-w-md mx-auto p-4">
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
    <div className="min-h-screen bg-fi-bg max-w-md mx-auto relative pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          {product.brand}
        </span>
        <div className="w-8" />
      </header>

      <main className="p-4 flex flex-col gap-5">
        {/* Product Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Title & Price Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
          <span className="text-xs font-semibold text-fi-purple uppercase tracking-wider">
            {product.category}
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-0.5">
            {product.name}
          </h1>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900">
              {formatCurrency(currentPrice)}
            </span>
            <span className="text-xs text-gray-500 font-normal">
              incl. all taxes
            </span>
          </div>

          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Eligible for 0% No-Cost EMI via Mutual Funds pledge</span>
          </div>
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
            <h3 className="text-xs font-semibold text-gray-700 tracking-wide uppercase mb-3">
              Specifications
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
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-fi-purple flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 fill-fi-purple text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Application Placed!</h3>
            <p className="text-xs text-gray-500 mt-1">{orderConfirmation.message}</p>
            <div className="bg-gray-50 rounded-xl p-3 my-4 w-full text-xs text-gray-600 font-mono">
              Ref: {orderConfirmation.orderId}
            </div>
            <button
              onClick={() => {
                setOrderConfirmation(null);
                navigate('/');
              }}
              className="w-full py-2.5 rounded-full bg-fi-purple text-white text-xs font-semibold hover:bg-fi-purple-dark transition-colors"
            >
              Back to Shop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
