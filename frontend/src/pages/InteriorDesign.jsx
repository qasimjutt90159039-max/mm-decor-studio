import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Compass, Layers, Sun } from 'lucide-react';
import { MoodboardBuilder } from '../components/MoodboardBuilder';
import { SmartImage } from '../components/SmartImage';

export const InteriorDesign = () => {
  const sections = [
    {
      number: '01',
      title: 'SPACE',
      subtitle: 'Volumetric Balance & Flow',
      description:
        'Spatial composition begins with architectural clarity. We calibrate circulation corridors, sightlines, and transitions between communal gathering zones and intimate retreats, establishing an effortless choreography within the envelope.',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      number: '02',
      title: 'MATERIAL',
      subtitle: 'Tactile Honesty & Patina',
      description:
        'A dialogue between rough and refined. Honed limestone meets brushed champagne brass, oiled walnut, and open-weave bouclé, creating tactile depth that invites touch and evolves gracefully with ambient warmth.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      number: '03',
      title: 'LIGHT',
      subtitle: 'Chiaroscuro & Luminescence',
      description:
        'Lighting is treated as a foundational medium. We orchestrate indirect cove grazers, sculptural pendant statements, and warm low-level candle sconces to craft an atmosphere that transforms seamlessly from day to evening.',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    },
    {
      number: '04',
      title: 'DETAIL',
      subtitle: 'Bespoke Millwork & Micro-Accents',
      description:
        'Every shadow gap, fluted cabinet reveal, door pull, and baseboard transition is drawn with rigorous intent. True luxury resides in the quiet harmony of uncompromised micro-craftsmanship.',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const categories = [
    { name: 'Residential Interiors', desc: 'Holistic spatial design for private residences, villas, and modern apartments.' },
    { name: 'Living Spaces', desc: 'Curated lounges harmonizing bespoke seating, acoustic comfort, and conversation flow.' },
    { name: 'Bedrooms & Sanctuaries', desc: 'Intimate sleeping chambers prioritizing restorative textures and low-kelvin lighting.' },
    { name: 'Dining Areas', desc: 'Sculptural table settings, statement lighting fixtures, and refined culinary ambiance.' },
    { name: 'Commercial Interiors', desc: 'Boutique showrooms, executive suites, and hospitality lounges with editorial flair.' },
  ];

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-24 sm:pt-28 pb-24">
      {/* Header Hero */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-12 border-b border-[#241018]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Studio Discipline I</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#F7F3EE] uppercase leading-none">
            Interior Design
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-[#C9AB81] italic">
            Spatial Harmony · Material Palette · Light Orchestration
          </p>
          <p className="text-sm text-[#8C817A] max-w-2xl leading-relaxed">
            An editorial methodology dedicated to sculpting residential and commercial spaces in Lahore through volumetric proportion, material truth, and ambient tranquility.
          </p>
        </div>
      </section>

      {/* SECTION 10: 01 SPACE, 02 MATERIAL, 03 LIGHT, 04 DETAIL */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 space-y-20 border-b border-[#241018]">
        {sections.map((sec, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={sec.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Visual Composition */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative border border-[#241018] overflow-hidden group aspect-[16/10]">
                  <SmartImage
                    src={sec.image}
                    alt={`${sec.title} - ${sec.subtitle}`}
                    className="w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120309] via-transparent to-transparent opacity-70 pointer-events-none" />
                  <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-[#C9AB81] bg-[#120309]/90 px-3 py-1 border border-[#C9AB81]/30">
                    Discipline Focus · {sec.title}
                  </span>
                </div>
              </div>

              {/* Editorial Text */}
              <div className={`lg:col-span-5 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-baseline gap-4">
                  <span className="font-editorial text-6xl sm:text-7xl text-[#C9AB81]/30 select-none">
                    {sec.number}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C9AB81]">
                    Design Foundation
                  </span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase tracking-wide">
                  {sec.title}
                </h3>
                <p className="font-editorial text-lg text-[#C9AB81] italic">
                  {sec.subtitle}
                </p>
                <p className="text-sm text-[#8C817A] leading-relaxed">
                  {sec.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* DESIGN CATEGORIES */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#241018]">
        <div className="mb-10 space-y-1">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
            Taxonomy
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
            Interior Design Categories
          </h2>
          <p className="text-xs text-[#8C817A] uppercase tracking-wider">
            Spatial typologies and architectural scopes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-6 bg-[#18060f] border border-[#241018] hover:border-[#C9AB81]/40 transition-all duration-300 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#C9AB81]">
                  Category 0{i + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9AB81]" />
              </div>
              <h4 className="font-editorial text-xl text-[#F7F3EE]">
                {cat.name}
              </h4>
              <p className="text-xs text-[#8C817A] leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE MOODBOARD BUILDER SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#241018]">
        <MoodboardBuilder />
      </section>

      {/* Direct Contact CTA */}
      <section className="pt-16 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
          Inquire Regarding Interior Design
        </h2>
        <p className="text-sm text-[#8C817A] max-w-md mx-auto leading-relaxed">
          Contact MM Decor Studio in Ichra Bazar, Lahore to discuss your space and schedule a studio conversation.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all"
          >
            <span>Initiate Interior Inquiry</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};
