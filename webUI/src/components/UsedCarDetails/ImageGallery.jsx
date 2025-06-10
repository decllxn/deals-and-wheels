import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ImageGallery({ mainImage, images, make, model }) {
  const allImages = [mainImage, ...images.slice(0, 8)];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % allImages.length);
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  // Swipe Support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) handlePrev();
    if (deltaX < -50) handleNext();
  };

  return (
    <div className="flex flex-col gap-6 relative">

      {/* Main Image with navigation arrows */}
      <div 
        className="w-full rounded-2xl overflow-hidden shadow-md aspect-[16/9] bg-black relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={allImages[selectedIndex]}
          alt={`${make} ${model} selected image`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[var(--surface-color)] hover:bg-[var(--highlight-color)] text-[var(--text-color)] p-2 rounded-full shadow-md transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[var(--surface-color)] hover:bg-[var(--highlight-color)] text-[var(--text-color)] p-2 rounded-full shadow-md transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Fullscreen button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 bg-[var(--surface-color)] hover:bg-[var(--highlight-color)] text-[var(--text-color)] p-2 rounded-full shadow-md transition-all"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex overflow-x-auto gap-4 no-scrollbar mt-2">
        {allImages.map((img, index) => {
          const isActive = selectedIndex === index;
          return (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300
                ${isActive ? 'border-[var(--accent-color)] shadow-lg' : 'border-[var(--border-color)]'}`}
            >
              <img
                src={img}
                alt={`${make} ${model} thumbnail ${index + 1}`}
                className={`w-full h-full object-cover transition-transform duration-300 ${isActive ? '' : 'hover:scale-105'}`}
                style={{
                  filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
                  transition: 'filter 0.3s ease'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <img src={allImages[selectedIndex]} alt="fullscreen" className="max-h-full max-w-full object-contain" />

          {/* Close Button */}
          <button 
            onClick={() => setIsLightboxOpen(false)} 
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition backdrop-blur-md shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/10 transition backdrop-blur-md"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/10 transition backdrop-blur-md"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}