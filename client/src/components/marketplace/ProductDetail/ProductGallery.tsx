import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card flex items-center justify-center p-4">
        <img
          src={images[activeIdx]}
          alt={`${name} preview ${activeIdx + 1}`}
          className="object-contain max-h-full max-w-full"
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white flex-shrink-0 ${
                activeIdx === idx ? 'border-[#712CDC] shadow-sm' : 'border-gray-200 opacity-70'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
