import React from 'react';
import { AlertCircle, RefreshCw, Sparkles, FolderX } from 'lucide-react';

export const StateView = ({
  type = 'empty', // 'loading' | 'empty' | 'error'
  title,
  message,
  onRetry,
  className = '',
}) => {
  if (type === 'loading') {
    return (
      <div className={`py-20 text-center flex flex-col items-center justify-center ${className}`}>
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border border-[#C9AB81]/20 animate-ping" />
          <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-[#C9AB81] border-r-[#C9AB81]/40 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-[#C9AB81]">
            <Sparkles size={18} className="animate-pulse" />
          </div>
        </div>
        <h4 className="font-editorial text-xl tracking-widest text-[#F7F3EE] uppercase">
          {title || 'Loading Studio Visuals'}
        </h4>
        <p className="text-xs text-[#8C817A] tracking-wider uppercase mt-2">
          {message || 'Harmonizing atmosphere and media curation...'}
        </p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className={`py-16 px-6 max-w-lg mx-auto text-center border border-[#241018] bg-[#1a0710] rounded-sm ${className}`}>
        <AlertCircle size={36} className="mx-auto text-[#C9AB81] mb-4 opacity-80" />
        <h4 className="font-editorial text-2xl tracking-wide text-[#F7F3EE] mb-2">
          {title || 'Unable to Load Content'}
        </h4>
        <p className="text-sm text-[#8C817A] mb-6">
          {message || 'An unexpected connection issue occurred while retrieving data.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#241018] hover:bg-[#C9AB81] hover:text-[#120309] text-[#E9DFD2] text-xs uppercase tracking-widest border border-[#C9AB81]/40 transition-all duration-300"
          >
            <RefreshCw size={13} />
            <span>Retry Connection</span>
          </button>
        )}
      </div>
    );
  }

  // Default 'empty' state
  return (
    <div className={`py-20 px-8 text-center max-w-xl mx-auto border border-[#241018]/80 bg-[#15040d]/60 rounded-sm relative overflow-hidden ${className}`}>
      {/* Decorative luxury corners */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C9AB81]/40" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C9AB81]/40" />
      
      <div className="w-12 h-12 mx-auto rounded-full bg-[#241018] flex items-center justify-center text-[#C9AB81] mb-4 border border-[#C9AB81]/20">
        <FolderX size={20} />
      </div>
      <p className="font-editorial text-2xl md:text-3xl text-[#F7F3EE] tracking-wide mb-3">
        {title}
      </p>
      {message && (
        <p className="text-sm text-[#8C817A] max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      )}
    </div>
  );
};
