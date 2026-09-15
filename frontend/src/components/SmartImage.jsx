import React, { useState } from 'react';

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';

export const SmartImage = ({
  src,
  alt = 'MM Decor Studio',
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
  loading = 'lazy',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If prop changes, reset
  React.useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else if (hasError && currentSrc !== DEFAULT_FALLBACK) {
      setCurrentSrc(DEFAULT_FALLBACK);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background skeleton loader while image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#1c0710] animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-[#C9AB81]/20 border-t-[#C9AB81] animate-spin" />
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${props.imgClassName || ''}`}
        {...props}
      />
    </div>
  );
};
