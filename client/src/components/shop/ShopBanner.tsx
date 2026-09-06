import React from 'react';
import bannerImg from '../../assets/1fi.webp';

export const ShopBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full select-none bg-[#2e0854] rounded-b-[24px] sm:rounded-b-[28px] shadow-sm">
      <img
        src={bannerImg}
        alt="Shop today, Pay later using Mutual funds. No credit score required. No interest. Backed by your investments."
        className="w-full h-auto block object-cover"
        loading="eager"
        decoding="async"
      />
    </section>
  );
};

