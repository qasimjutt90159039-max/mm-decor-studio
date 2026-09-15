import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Layers, Sun, Box, Wind, Compass } from 'lucide-react';
import { getServices } from '../services/api';
import { SmartImage } from '../components/SmartImage';

const DEFAULT_SERVICES = [
  {
    _id: 'svc-1',
    name: 'Interior Spatial Planning & Concept Design',
    category: 'Interior',
    description:
      'Harmonizing spatial layout, material palette, architectural proportions, and ambient lighting for residential and boutique spaces.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    active: true,
  },
  {
    name: 'Event Atmosphere & Scenic Styling',
    category: 'Events',
    description:
      'Transforming venues through bespoke structural decor, dramatic fabric draping, sensory lighting moods, and curated botanical concepts in Lahore.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    active: true,
  },
  {
    name: 'Material & Moodboard Curation',
    category: 'Interior',
    description:
      'Physical and visual tactile palettes pairing natural stones, warm textiles, brushed metals, and bespoke color swatches.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    active: true,
  },
  {
    name: 'Table Architecture & Detail Accents',
    category: 'Events',
    description:
      'Fine tableware orchestration, candlelit centerpieces, textured linens, and artisanal details creating intimate celebratory tablescapes.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    active: true,
  },
];

export const Home = () => {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    fetchStudioServices();
  }, []);

  const fetchStudioServices = async () => {
    try {
      const res = await getServices();
      if (res.data?.data && res.data.data.length > 0) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.warn('Using default studio disciplines:', err.message);
    }
  };

  const moodboardPillars = [
    {
      tag: 'MATERIAL',
      icon: Layers,
      description: 'Tactile natural stones, aged metals, bouclé weaves, and honest timbers.',
    },
    {
      tag: 'LIGHT',
      icon: Sun,
      description: 'Chiaroscuro transitions, indirect ambient glows, and architectural shadow lines.',
    },
    {
      tag: 'FORM',
      icon: Box,
      description: 'Sculptural proportions, organic curves, and disciplined spatial geometry.',
    },
    {
      tag: 'ATMOSPHERE',
      icon: Wind,
      description: 'Immersive sensory resonance woven through bespoke decor and celebratory tone.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2]">
      {/* SECTION 7: EDITORIAL VISUAL MOODBOARD HERO */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
        {/* Background Editorial Visual Layer */}
        <div className="absolute inset-0 z-0">
          <SmartImage
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
            alt="Editorial Interior Composition"
            className="w-full h-full filter brightness-[0.38] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120309] via-[#120309]/50 to-[#120309]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#120309_90%)] pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Main Typographic Hierarchy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#241018]/90 backdrop-blur-md border border-[#C9AB81]/40 text-[#C9AB81] text-[10px] sm:text-xs uppercase tracking-[0.25em]">
                <Sparkles size={12} />
                <span>Editorial Creative Studio · Lahore</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F7F3EE] uppercase leading-[0.95]">
                  MM DECOR STUDIO
                </h1>
                <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#C9AB81] italic tracking-wide">
                  Interior Designer & Event Planner
                </p>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-[#E9DFD2]/90 max-w-2xl font-light leading-relaxed">
                Harmonizing spatial forms, curated materials, and sensory atmospheres into bespoke environments and celebrations in Lahore.
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-4 justify-center sm:justify-start items-center">
                <Link
                  to="/portfolio"
                  className="px-6 py-3 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl shadow-[#C9AB81]/10 flex items-center gap-2 group"
                >
                  <span>Explore Our Work</span>
                  <ArrowUpRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#120309]/80 hover:bg-[#241018] text-[#F7F3EE] text-xs uppercase tracking-widest border border-[#C9AB81]/40 hover:border-[#C9AB81] transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Studio
                </Link>
              </div>
            </div>

            {/* Floating Moodboard Pillars (Right Side Desktop) */}
            <div className="lg:col-span-4 hidden lg:grid grid-cols-2 gap-3">
              {moodboardPillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#120309]/85 backdrop-blur-md border border-[#241018] hover:border-[#C9AB81]/50 transition-all duration-300 group"
                  >
                    <Icon size={16} className="text-[#C9AB81] mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[11px] uppercase tracking-widest text-[#F7F3EE] font-medium mb-1">
                      {item.tag}
                    </p>
                    <p className="text-[10px] text-[#8C817A] leading-normal line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9AB81]/30 to-transparent pointer-events-none" />
      </section>

      {/* SECTION 8: STUDIO INTRO (Split Editorial Section with Vertical '01') */}
      <section className="py-20 sm:py-28 border-b border-[#241018] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Large Vertical Section Number */}
            <div className="lg:col-span-3 flex items-baseline gap-4 lg:flex-col lg:sticky lg:top-28">
              <span className="font-editorial text-7xl sm:text-9xl text-[#C9AB81]/30 select-none leading-none">
                01
              </span>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81] block">
                  Studio Identity
                </span>
                <span className="text-[11px] text-[#8C817A] uppercase tracking-widest">
                  Lahore, Pakistan
                </span>
              </div>
            </div>

            {/* Right: Narrative based strictly on Interior Designer & Event Planner */}
            <div className="lg:col-span-9 space-y-6">
              <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#F7F3EE] uppercase leading-tight">
                About MM Decor Studio
              </h2>

              <div className="space-y-5 text-[#E9DFD2]/90 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
                <p>
                  MM Decor Studio is an interior design practice and event planning atelier based in Ichra Bazar, Lahore. We view every space and celebration through an editorial lens — translating raw volume, texture, and light into distinct sensory narratives.
                </p>
                <p className="text-sm sm:text-base text-[#8C817A]">
                  As an Interior Designer, the studio balances architectural proportion, tactile finishes, and serene spatial palettes. Concurrently, as indicated by our studio name, our creative focus extends into Event Planning, crafting evocative atmospheres, custom decor compositions, and memorable event environments without unnecessary excess.
                </p>
              </div>

              {/* Discovery CTA */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 px-6 py-2.5 border border-[#C9AB81]/40 hover:border-[#C9AB81] hover:bg-[#241018] text-xs uppercase tracking-widest text-[#F7F3EE] transition-all duration-300"
                >
                  <span>Discover Studio</span>
                  <ArrowUpRight size={14} className="text-[#C9AB81]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TWO WORLDS (Visual Asymmetric Panels) */}
      <section className="py-20 sm:py-28 bg-[#0d0207] border-b border-[#241018]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
              Dual Creative Disciplines
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F7F3EE] uppercase">
              Two Worlds of Expression
            </h2>
            <p className="text-xs sm:text-sm text-[#8C817A] tracking-wider uppercase">
              Interior Spaces & Event Atmospheres
            </p>
          </div>

          {/* Asymmetric Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Panel 1: Interior Spaces */}
            <div className="group relative bg-[#120309] border border-[#241018] hover:border-[#C9AB81]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between">
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden relative">
                <SmartImage
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Interior Design Concept Mood"
                  className="w-full h-full filter brightness-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120309] via-transparent to-transparent opacity-90 pointer-events-none" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#120309] bg-[#C9AB81] px-3 py-1 font-semibold">
                  Discipline I
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EE] uppercase tracking-wide">
                  Interior Spaces
                </h3>
                <p className="text-sm text-[#8C817A] leading-relaxed">
                  Sculpting domestic and commercial environments through refined spatial layout, tactile material pairing, and disciplined lighting design.
                </p>
                <div className="pt-2">
                  <Link
                    to="/interior"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81] hover:text-[#F7F3EE] transition-colors font-medium group-hover:underline"
                  >
                    <span>Explore Interior Design</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Panel 2: Event Atmospheres */}
            <div className="group relative bg-[#120309] border border-[#241018] hover:border-[#C9AB81]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between">
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden relative">
                <SmartImage
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                  alt="Event Styling Concept Atmosphere"
                  className="w-full h-full filter brightness-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120309] via-transparent to-transparent opacity-90 pointer-events-none" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#120309] bg-[#E9DFD2] px-3 py-1 font-semibold">
                  Discipline II
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EE] uppercase tracking-wide">
                  Event Atmospheres
                </h3>
                <p className="text-sm text-[#8C817A] leading-relaxed">
                  Transforming gatherings into bespoke visual memories with dramatic venue styling, layered floral aesthetics, fabric draping, and candlelit ambiance.
                </p>
                <div className="pt-2">
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81] hover:text-[#F7F3EE] transition-colors font-medium group-hover:underline"
                  >
                    <span>Explore Event Planning</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC STUDIO SERVICES SECTION */}
      <section className="py-20 sm:py-28 border-b border-[#241018]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81] block mb-1">
                Studio Capabilities
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#F7F3EE] uppercase">
                Creative Disciplines
              </h2>
            </div>
            <p className="text-xs uppercase tracking-widest text-[#8C817A] max-w-xs">
              Curated spatial design and celebration staging in Lahore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <div
                key={svc._id || i}
                className="p-6 bg-[#18060f] border border-[#241018] hover:border-[#C9AB81]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="font-editorial text-3xl text-[#C9AB81]/40 group-hover:text-[#C9AB81] transition-colors">
                    0{i + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#C9AB81] font-semibold">
                      {svc.category}
                    </span>
                    <h4 className="font-editorial text-xl text-[#F7F3EE]">
                      {svc.name}
                    </h4>
                  </div>
                  <p className="text-xs text-[#8C817A] leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#241018]/60 mt-4">
                  <Link
                    to="/contact"
                    className="text-[10px] uppercase tracking-widest text-[#E9DFD2] hover:text-[#C9AB81] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Inquire Discipline</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL EDITORIAL CALL TO ACTION */}
      <section className="py-20 sm:py-28 relative bg-[#15040e] overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-5 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
            Commence Your Vision
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#F7F3EE] uppercase tracking-wide">
            Design A Space Or Stage An Event
          </h2>
          <p className="text-sm sm:text-base text-[#8C817A] max-w-xl mx-auto leading-relaxed">
            Connect with MM Decor Studio in Ichra Bazar, Lahore to discuss your interior design inquiries or celebration concepts.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all duration-300"
            >
              Initiate Inquiry
            </Link>
            <a
              href="tel:+923180130117"
              className="px-6 py-3 bg-[#120309] border border-[#C9AB81]/40 hover:border-[#C9AB81] text-[#F7F3EE] text-xs uppercase tracking-widest transition-all duration-300"
            >
              Call +92 318 0130117
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
