import React from 'react';
import { Sparkles } from 'lucide-react';

export const ShopBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#3B0764] via-[#4C1D95] to-[#6D28D9] text-white p-5 sm:p-6 rounded-b-3xl shadow-lg">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-sm">
        {/* No-cost EMI Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span className="text-[11px] font-semibold tracking-wide uppercase text-white">
            No-Cost EMIs
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-2">
          Shop today,<br />
          <span className="italic font-normal">Pay later</span> using<br />
          Mutual funds.
        </h1>

        {/* Subtitle */}
        <p className="text-xs text-purple-100/90 leading-relaxed max-w-xs font-normal">
          No credit score required. No interest. Backed by your investments.
        </p>
      </div>
    </div>
  );
};
