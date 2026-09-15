import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Wine, Flame, Eye, Music, HeartHandshake } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';

export const EventPlanning = () => {
  const storyTimeline = [
    {
      step: '01',
      phase: 'Concept',
      subtitle: 'The Ideation Blueprint',
      description:
        'Every memorable occasion commences with a singular artistic vision. We explore cultural cues, aesthetic motifs, and client aspirations to establish an editorial narrative tailored for Lahore.',
      icon: Sparkles,
    },
    {
      step: '02',
      phase: 'Mood',
      subtitle: 'Color, Texture & Swatches',
      description:
        'Translating narrative into tactile reality. We assemble tonal palettes — deep plums, soft champagnes, antique metallics, and lush greenery — curating the emotional resonance of the gathering.',
      icon: Wine,
    },
    {
      step: '03',
      phase: 'Decor',
      subtitle: 'Structural Staging & Flora',
      description:
        'Orchestrating bespoke stage backdrops, entrance archways, floral installations, and dramatic drapery that redefine the venue into an evocative scenography.',
      icon: Eye,
    },
    {
      step: '04',
      phase: 'Atmosphere',
      subtitle: 'Luminescence & Acoustics',
      description:
        'Infusing life through multi-tiered lighting: candlelight clusters, warm amber washes, crystal illumination, and soft ambient acoustics designed to captivate guests upon arrival.',
      icon: Flame,
    },
    {
      step: '05',
      phase: 'Final Experience',
      subtitle: 'The Living Celebration',
      description:
        'The synthesis of all components. A seamless, breathtaking celebration where guests are embraced by beauty, warmth, and memorable artistic styling.',
      icon: HeartHandshake,
    },
  ];

  const stylingCategories = [
    {
      title: 'Event Styling',
      description:
        'Overall visual thematic direction, color balancing, and scenic coordination for weddings, receptions, and intimate gatherings in Lahore.',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Decor Concepts',
      description:
        'Bespoke backdrop architecture, ceremonial arches, artistic fabric draping, and customized staging elements.',
      image:
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Venue Atmosphere',
      description:
        'Transforming banquets, open-air lawns, or marquee spaces into immersive environments with spatial flow and focal points.',
      image:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Lighting Mood',
      description:
        'Ambient fairy light canopies, warm candlelit walkways, pin-spot floral illumination, and atmospheric washes.',
      image:
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Table & Detail Styling',
      description:
        'Artisanal centerpieces, textured tablecloths, fine cutlery placement, and personalized stationery accents.',
      image:
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-24 sm:pt-28 pb-24">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-12 border-b border-[#241018]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Studio Discipline II</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#F7F3EE] uppercase leading-none">
            Event Planning
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-[#C9AB81] italic">
            Atmospheric Staging · Bespoke Decor · Celebratory Storytelling
          </p>
          <p className="text-sm text-[#8C817A] max-w-2xl leading-relaxed">
            Translating celebratory milestones into cohesive, evocative sensory experiences in Lahore. Combining spatial balance with dramatic floral, lighting, and decor artistry.
          </p>
        </div>
      </section>

      {/* SECTION 11: EVENT STORY TIMELINE */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#241018]">
        <div className="max-w-3xl mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
            Storytelling Framework
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#F7F3EE] uppercase">
            The Event Narrative Arc
          </h2>
          <p className="text-xs sm:text-sm text-[#8C817A]">
            A five-step storytelling progression from initial spark to unforgettable sensory celebration.
          </p>
        </div>

        {/* Vertical Timeline with Connected Champagne Accent Line */}
        <div className="relative border-l border-[#241018] ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
          {storyTimeline.map((item) => {
            return (
              <div key={item.step} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[55px] top-1 w-6 h-6 rounded-full bg-[#120309] border-2 border-[#C9AB81] flex items-center justify-center text-[9px] text-[#C9AB81] font-semibold group-hover:scale-125 transition-transform duration-300">
                  <span className="w-2 h-2 rounded-full bg-[#C9AB81]" />
                </div>

                <div className="bg-[#18060f] border border-[#241018] p-6 sm:p-8 hover:border-[#C9AB81]/40 transition-all duration-300">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-editorial text-2xl sm:text-3xl text-[#C9AB81]">
                        {item.step}
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EE] uppercase">
                        {item.phase}
                      </h3>
                    </div>
                    <span className="text-xs text-[#C9AB81] uppercase tracking-widest italic">
                      {item.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-[#8C817A] max-w-3xl leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EVENT STYLING & DECOR CATEGORIES */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#241018]">
        <div className="mb-12 space-y-1">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
            Visual Taxonomy
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
            Event Styling & Decor Elements
          </h2>
          <p className="text-xs text-[#8C817A] uppercase tracking-wider">
            General event design categories and atmospheric compositions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylingCategories.map((cat, i) => (
            <div
              key={i}
              className="bg-[#18060f] border border-[#241018] hover:border-[#C9AB81]/40 transition-all duration-300 overflow-hidden group flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <SmartImage
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full filter brightness-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18060f] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              <div className="p-6 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C9AB81]">
                  Component 0{i + 1}
                </span>
                <h3 className="font-editorial text-2xl text-[#F7F3EE]">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#8C817A] leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Consultation CTA */}
      <section className="pt-16 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
          Plan Your Event Atmosphere
        </h2>
        <p className="text-sm text-[#8C817A] max-w-md mx-auto leading-relaxed">
          Contact MM Decor Studio in Ichra Bazar, Lahore to discuss your celebration decor concept.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all"
          >
            <span>Inquire Regarding Event Planning</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};
