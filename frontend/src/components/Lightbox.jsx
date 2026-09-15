import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export const Lightbox = ({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onNavigate,
}) => {
  const currentItem = images[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview Lightbox"
      className="fixed inset-0 z-50 bg-[#0a0105]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 text-[#E9DFD2] hover:text-[#C9AB81] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9AB81]"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#120309]/80 border border-[#241018] text-[#E9DFD2] hover:text-[#C9AB81] hover:border-[#C9AB81]/40 transition-all focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#120309]/80 border border-[#241018] text-[#E9DFD2] hover:text-[#C9AB81] hover:border-[#C9AB81]/40 transition-all focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Media & Details Container */}
      <div
        className="max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden">
          <img
            src={currentItem.image || currentItem.images?.[0]}
            alt={currentItem.title || 'Studio gallery visual'}
            className="max-h-[72vh] max-w-full object-contain shadow-2xl border border-[#241018]"
          />
        </div>

        {/* Caption Bar */}
        <div className="w-full max-w-2xl text-center mt-4 space-y-1.5 px-4">
          <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-[#C9AB81]">
            <span className="flex items-center gap-1">
              <Tag size={12} />
              {currentItem.category}
            </span>
            <span>·</span>
            <span>
              {currentIndex + 1} of {images.length}
            </span>
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl text-[#F7F3EE]">
            {currentItem.title}
          </h3>

          {currentItem.description && (
            <p className="text-xs text-[#8C817A] max-w-lg mx-auto">
              {currentItem.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
