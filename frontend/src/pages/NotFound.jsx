import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Sparkles } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] flex items-center justify-center px-4 py-28 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03]">
        <span className="font-editorial text-[30vw] text-[#C9AB81]">404</span>
      </div>

      <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest">
          <Sparkles size={12} />
          <span>Dimension Uncharted</span>
        </div>

        <h1 className="font-editorial text-6xl sm:text-8xl text-[#F7F3EE] uppercase leading-none">
          404
        </h1>

        <p className="font-editorial text-2xl text-[#C9AB81] italic">
          Spatial Pathway Not Found
        </p>

        <p className="text-sm text-[#8C817A] max-w-md mx-auto leading-relaxed">
          The requested coordinate does not exist in the MM Decor Studio architecture or may have been relocated.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3.5 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>Return to Studio Home</span>
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-[#18060f] border border-[#C9AB81]/40 hover:border-[#C9AB81] text-[#F7F3EE] text-xs uppercase tracking-widest transition-all"
          >
            Contact Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
};
