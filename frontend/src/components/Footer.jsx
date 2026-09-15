import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ExternalLink, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0a0105] text-[#E9DFD2] border-t border-[#241018] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#241018]/80">
          {/* Col 1: Studio Identity & Description */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EE] tracking-wide uppercase">
              MM DECOR STUDIO
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#C9AB81]">
              Interior Designer & Event Planner Lahore
            </p>
            <p className="text-sm text-[#8C817A] max-w-sm leading-relaxed pt-2">
              Bespoke spatial design and celebratory atmosphere styling rooted in the vibrant cultural fabric of Lahore. Orchestrating form, light, moodboards, and material elegance.
            </p>
          </div>

          {/* Col 2: Direct Navigation */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#C9AB81]">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <Link to="/" className="text-[#8C817A] hover:text-[#F7F3EE] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#8C817A] hover:text-[#F7F3EE] transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link to="/interior" className="text-[#8C817A] hover:text-[#F7F3EE] transition-colors">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-[#8C817A] hover:text-[#F7F3EE] transition-colors">
                  Event Planning
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-[#8C817A] hover:text-[#F7F3EE] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-[#8C817A] hover:text-[#F7F3EE] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#8C817A] hover:text-[#F7F3EE] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Coordinates */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#C9AB81]">
              Studio Coordinates
            </p>
            <div className="space-y-3.5 text-sm text-[#8C817A]">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9AB81] shrink-0 mt-0.5" />
                <span>Ichra Bazar, Ichhra Lahore, 54000, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9AB81] shrink-0" />
                <a
                  href="tel:+923180130117"
                  className="text-[#E9DFD2] hover:text-[#C9AB81] transition-colors"
                >
                  +92 318 0130117
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://www.facebook.com/share/1CGzeig7td/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#241018] bg-[#120309] hover:border-[#C9AB81] hover:text-[#C9AB81] text-xs uppercase tracking-widest transition-all duration-300 group"
                >
                  <span>Follow on Facebook</span>
                  <ExternalLink size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C817A]">
          <p>
            © {new Date().getFullYear()} MM Decor Studio Interior Designer & Event Planner Lahore. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 hover:text-[#C9AB81] transition-colors text-[11px] uppercase tracking-wider"
              title="Studio Administrative Portal"
            >
              <Lock size={12} />
              <span>Studio Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
