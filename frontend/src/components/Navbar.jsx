import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, MapPin, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Interior', path: '/interior' },
    { label: 'Events', path: '/events' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#120309]/95 backdrop-blur-md py-3 border-b border-[#C9AB81]/20 shadow-2xl'
            : 'bg-gradient-to-b from-[#120309]/90 via-[#120309]/50 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Left */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="MM Decor Studio Home"
          >
            {/* Elegant Monogram Emblem */}
            <div className="w-8 h-8 rounded-sm bg-[#241018] border border-[#C9AB81]/40 flex items-center justify-center text-[#C9AB81] font-editorial text-sm font-semibold group-hover:border-[#C9AB81] transition-colors">
              MM
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-xl sm:text-2xl tracking-wider text-[#F7F3EE] group-hover:text-[#C9AB81] transition-colors duration-300 uppercase leading-none">
                MM DECOR STUDIO
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C9AB81]/80 uppercase mt-0.5">
                Interior & Event Design · Lahore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Centered Luxury Pill Layout */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1a0710]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C9AB81]/25 shadow-lg shadow-black/30">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] uppercase tracking-[0.18em] transition-all duration-300 px-3.5 py-1 rounded-full font-medium ${
                    isActive
                      ? 'bg-[#C9AB81] text-[#120309] shadow-sm font-semibold'
                      : 'text-[#E9DFD2]/80 hover:text-[#F7F3EE] hover:bg-[#C9AB81]/15'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right-side Desktop CTA (Compact & Sleek) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+923180130117"
              className="text-[#8C817A] hover:text-[#C9AB81] transition-colors p-2 text-xs flex items-center gap-1.5"
              title="Call studio directly"
            >
              <Phone size={13} className="text-[#C9AB81]" />
              <span className="text-[11px] tracking-wider">+92 318 0130117</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-widest text-[#120309] bg-[#C9AB81] hover:bg-[#F7F3EE] border border-[#C9AB81] hover:border-[#F7F3EE] transition-all duration-300 font-semibold group rounded-xs shadow-md shadow-[#C9AB81]/10"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight
                size={12}
                className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/contact"
              className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#120309] bg-[#C9AB81] font-semibold rounded-xs"
            >
              Connect
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#E9DFD2] hover:text-[#C9AB81] transition-colors focus:outline-none"
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#120309] transition-all duration-500 flex flex-col justify-between p-6 sm:p-10 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        style={{ top: '0', paddingTop: '80px' }}
      >
        <div className="space-y-6 my-auto">
          <div className="flex items-center justify-between border-b border-[#241018] pb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9AB81]">
              Studio Navigation
            </span>
            <span className="text-[10px] text-[#8C817A] uppercase tracking-widest">
              Lahore, Pakistan
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between py-1.5 text-left border-b border-[#241018]/50 ${
                    isActive ? 'text-[#C9AB81]' : 'text-[#F7F3EE]'
                  }`}
                >
                  <span className="font-editorial text-2xl sm:text-3xl group-hover:text-[#C9AB81] transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs text-[#8C817A] group-hover:text-[#C9AB81]">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Contact Quick Actions */}
        <div className="pt-6 border-t border-[#241018] space-y-3">
          <div className="flex items-center gap-3 text-xs text-[#8C817A]">
            <MapPin size={13} className="text-[#C9AB81] shrink-0" />
            <span className="truncate">Ichra Bazar, Ichhra Lahore, 54000, Pakistan</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#E9DFD2]">
            <Phone size={13} className="text-[#C9AB81] shrink-0" />
            <a href="tel:+923180130117" className="text-[#C9AB81] hover:underline font-medium">
              +92 318 0130117
            </a>
          </div>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center py-2.5 bg-[#C9AB81] text-[#120309] uppercase text-xs tracking-widest font-semibold block transition-colors hover:bg-[#F7F3EE]"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </>
  );
};
