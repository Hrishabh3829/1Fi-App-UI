import React from 'react';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { Card } from '../components/common/Card';
import { formatCurrency } from '../utils/formatCurrency';
import { formatEmiDate, getNextEmiDate } from '../utils/emiDates';
import { Calendar, CheckCircle2, ReceiptIndianRupee, ShieldCheck } from 'lucide-react';

interface EmiDuesTabProps {
  onBrowseMarketplace: () => void;
}

export const EmiDuesTab: React.FC<EmiDuesTabProps> = ({ onBrowseMarketplace }) => {
  const { submittedOrders } = useMarketplaceStore();

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">EMI Dues</h1>
          <p className="text-xs text-gray-500">Track and pay your 1Fi Mutual Fund EMI plans</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lien Active</span>
        </div>
      </div>

      {submittedOrders.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-gray-100 shadow-sm mt-4">
          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-[#712CDC] mb-3">
            <ReceiptIndianRupee className="w-7 h-7" />
          </div>
          <h2 className="text-base font-bold text-gray-900">No active EMI dues</h2>
          <p className="text-xs text-gray-500 max-w-[260px] mt-1">
            Shop on 1Fi Marketplace and pledge your Mutual Funds to buy gadgets with 0% No-Cost EMI!
          </p>
          <button
            onClick={onBrowseMarketplace}
            className="mt-5 px-5 py-2.5 rounded-full bg-[#712CDC] text-white text-xs font-semibold hover:bg-[#581c87] transition-all shadow-sm"
          >
            Browse 1Fi Marketplace
          </button>
        </Card>
      ) : (
        <div className="flex flex-col gap-3.5">
          {submittedOrders.map((order) => (
            <Card
              key={order.orderId}
              className="p-4 rounded-2xl bg-white border border-gray-100 shadow-card flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">{order.productName}</h2>
                    <span className="text-[11px] text-gray-500">{order.variantLabel}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-semibold text-[#712CDC] bg-purple-50 px-2 py-0.5 rounded-full">
                        {order.tenureMonths} Months
                      </span>
                      {order.isNoCost && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          0% No-Cost
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-gray-900 block">
                    {formatCurrency(order.monthlyAmount)}
                    <span className="text-[10px] font-normal text-gray-400">/mo</span>
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Total: {formatCurrency(order.totalPayable)}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>
                    Next Due: {formatEmiDate(order.nextDueDate || getNextEmiDate(order.createdAt))}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Auto-Debit Active</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
