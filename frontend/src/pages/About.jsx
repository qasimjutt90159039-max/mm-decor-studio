import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Layers, Sun, ArrowUpRight } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';

export const About = () => {
  const philosophies = [
    {
      num: '01',
      title: 'Spatial Poetics',
      desc: 'Space is not merely an enclosure; it is an emotional canvas. We calibrate volume, proportion, and sightlines to evoke calm, contemplation, and effortless function.',
    },
    {
      num: '02',
      title: 'Material Honesty',
      desc: 'We honor tactile authenticity — marrying textured stones, open-grain woods, woven textiles, and nuanced metals to produce enduring depth without superficial ornamentation.',
    },
    {
      num: '03',
      title: 'Atmospheric Light',
      desc: 'Light defines mood. From daylight modulation through architectural recesses to low-kelvin evening glows, we sculpt lighting as an invisible structural material.',
    },
    {
      num: '04',
      title: 'Celebratory Narrative',
      desc: 'In event planning, decor serves as an experiential storyline. Every tablescape, floral element, and draped fabric contributes to an intimate, immersive atmosphere.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-24 sm:pt-28 pb-24">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-12 border-b border-[#241018]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Studio Identity</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#F7F3EE] uppercase leading-none">
            About MM Decor Studio
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-[#C9AB81] italic">
            Interior Designer & Event Planner · Lahore
          </p>
          <p className="text-sm text-[#8C817A] max-w-2xl leading-relaxed">
            An editorial atelier rooted in Ichra Bazar, Lahore, dedicated to the considered orchestration of spatial form, tactile materials, and memorable celebratory atmospheres.
          </p>
        </div>
      </section>

      {/* Studio Philosophy & Narrative */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#241018]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] border border-[#241018] overflow-hidden relative group">
              <SmartImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="MM Decor Studio Creative Direction"
                className="w-full h-full filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120309] via-transparent to-transparent opacity-75 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] uppercase tracking-widest text-[#C9AB81] mb-1 font-semibold">
                  Creative Philosophy
                </p>
                <p className="font-editorial text-xl text-[#F7F3EE]">
                  Curating environments that balance architecture, art, and intimacy.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
                Our Focus & Approach
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#F7F3EE] uppercase">
                The Intersection of Space & Celebration
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#E9DFD2]/90 leading-relaxed font-light">
                <p>
                  MM Decor Studio operates at the boundary where physical interior spaces and celebratory event styling meet. Based in the historic cultural vibrancy of Lahore, we approach both disciplines with the same reverence for visual harmony and emotional resonance.
                </p>
                <p>
                  As an <strong>Interior Designer</strong>, our studio engages with residential and commercial concepts through holistic spatial studies, tailored material specifications, and thoughtful custom elements designed for daily comfort.
                </p>
                <p>
                  As an <strong>Event Planner</strong>, our focus translates these architectural principles into temporary scenic realities — transforming event venues into evocative settings through drapery, bespoke floral architecture, atmospheric candle lighting, and curated decor.
                </p>
              </div>
            </div>

            {/* Location highlight */}
            <div className="p-5 bg-[#18060f] border border-[#241018] flex items-start gap-4">
              <MapPin size={20} className="text-[#C9AB81] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-editorial text-lg text-[#F7F3EE]">
                  Studio Location in Lahore
                </h4>
                <p className="text-xs text-[#8C817A] mt-1 leading-relaxed">
                  Located at Ichra Bazar, Ichhra Lahore, 54000, Pakistan. Situated in one of Lahore's culturally renowned trading and design hubs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Design Principles */}
      <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#241018]">
        <div className="mb-12 space-y-1">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9AB81]">
            Foundations
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
            Four Studio Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophies.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-[#18060f] border border-[#241018] hover:border-[#C9AB81]/40 transition-all duration-300 space-y-3"
            >
              <span className="font-editorial text-4xl text-[#C9AB81]/40">
                {item.num}
              </span>
              <h3 className="font-editorial text-xl text-[#F7F3EE]">
                {item.title}
              </h3>
              <p className="text-xs text-[#8C817A] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-16 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
          Collaborate With MM Decor Studio
        </h2>
        <p className="text-sm text-[#8C817A] max-w-md mx-auto">
          We invite you to reach out and discuss your spatial or celebration requirements in Lahore.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 bg-[#C9AB81] hover:bg-[#F7F3EE] text-[#120309] text-xs uppercase tracking-widest font-semibold transition-all"
          >
            Contact Studio
          </Link>
          <Link
            to="/portfolio"
            className="px-6 py-3 bg-[#18060f] border border-[#C9AB81]/40 hover:border-[#C9AB81] text-[#F7F3EE] text-xs uppercase tracking-widest transition-all"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
};
