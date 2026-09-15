import React, { useState } from 'react';
import { Layers, Palette, Sun, Compass, Sparkles } from 'lucide-react';
import { SmartImage } from './SmartImage';

const MOODS = {
  Warm: {
    id: 'Warm',
    tagline: 'Earthy intimacy, tactile linens & ambient twilight',
    description:
      'Rooted in organic textures, rich terracotta undertones, oiled walnut woods, and low-kelvin amber illumination that creates an inviting sanctuary.',
    palette: [
      { name: 'Deep Plum', hex: '#120309' },
      { name: 'Warm Terracotta', hex: '#A85A44' },
      { name: 'Raw Champagne', hex: '#C9AB81' },
      { name: 'Oatmeal Bouclé', hex: '#E9DFD2' },
      { name: 'Smoked Walnut', hex: '#3E2F2B' },
    ],
    materials: [
      'Textured Raw Linen',
      'Honed Travertine',
      'Brushed Champagne Brass',
      'Smoked Walnut Wood',
    ],
    lighting: '2400K–2700K indirect cove light with unglazed ceramic sconces',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  Minimal: {
    id: 'Minimal',
    tagline: 'Quiet spatial restraint, monolithic lines & architectural light',
    description:
      'Focusing on sculptural simplicity, negative space, matte micro-cement surfaces, and unobstructed natural light penetration.',
    palette: [
      { name: 'Carbon Void', hex: '#120309' },
      { name: 'Bone White', hex: '#F7F3EE' },
      { name: 'Pale Taupe', hex: '#8C817A' },
      { name: 'Chalk Stone', hex: '#D7D1C9' },
      { name: 'Matte Black', hex: '#1D1A1B' },
    ],
    materials: [
      'Seamless Micro-Cement',
      'Limewash Plaster',
      'Blonde Nordic Ash',
      'Anodized Metal Rails',
    ],
    lighting: 'Recessed linear grazers & soft daylight diffusion through sheer voile',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  Contemporary: {
    id: 'Contemporary',
    tagline: 'Fluid geometry, bold contrasts & dynamic curated accents',
    description:
      'A harmonious dialogue between sleek modern architecture and handcrafted artisanal accents, balancing crisp silhouettes with unexpected material juxtapositions.',
    palette: [
      { name: 'Midnight Plum', hex: '#120309' },
      { name: 'Dark Burgundy', hex: '#241018' },
      { name: 'Polished Champagne', hex: '#C9AB81' },
      { name: 'Alabaster White', hex: '#F3EFEA' },
      { name: 'Graphite Shadow', hex: '#2F282B' },
    ],
    materials: [
      'Fluted Cast Glass',
      'Nero Marquina Marble',
      'Tailored Wool Velvet',
      'Satin Gunmetal',
    ],
    lighting: 'Sculptural pendant clusters with layered directional spotlights',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  Elegant: {
    id: 'Elegant',
    tagline: 'Regal proportions, classical symmetry & heirloom tactility',
    description:
      'Timeless grandeur characterized by delicate molding profiles, antiqued mirror glass, rich silk-blend drapery, and subtle champagne gold gilding.',
    palette: [
      { name: 'Imperial Plum', hex: '#120309' },
      { name: 'Vintage Gold', hex: '#C9AB81' },
      { name: 'Warm Cream', hex: '#F7F3EE' },
      { name: 'Subtle Rosewood', hex: '#3B1A24' },
      { name: 'Cashmere Beige', hex: '#E3D7C8' },
    ],
    materials: [
      'Calacatta Oro Marble',
      'Antique Mirror Paneling',
      'Pleated Silk Dupioni',
      'Hand-Carved Cornice Moldings',
    ],
    lighting: 'Crystal prism chandeliers complemented by dimmed perimeter wall lights',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
};

export const MoodboardBuilder = () => {
  const [selectedMood, setSelectedMood] = useState('Warm');
  const mood = MOODS[selectedMood];

  return (
    <div className="bg-[#18060f] border border-[#241018] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
      {/* Editorial Decorative Watermark */}
      <div className="absolute right-4 top-2 select-none pointer-events-none opacity-[0.03] font-editorial text-9xl text-[#C9AB81]">
        STUDIO
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest mb-3">
          <Sparkles size={12} />
          <span>Interactive Studio Experience</span>
        </div>
        <h3 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] tracking-wide mb-2">
          Editorial Moodboard Builder
        </h3>
        <p className="text-sm text-[#8C817A] leading-relaxed">
          Explore how materials, colors, and lighting coalesce to shape distinct spatial atmospheres. Select a design aesthetic below to inspect its curated visual language.
        </p>
      </div>

      {/* Mood Selector Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-[#241018] pb-5">
        {Object.keys(MOODS).map((key) => {
          const isSelected = selectedMood === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedMood(key)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 border ${
                isSelected
                  ? 'bg-[#C9AB81] text-[#120309] font-semibold border-[#C9AB81] shadow-lg shadow-[#C9AB81]/10'
                  : 'bg-[#120309] text-[#E9DFD2] border-[#241018] hover:border-[#C9AB81]/50'
              }`}
            >
              {key} Atmosphere
            </button>
          );
        })}
      </div>

      {/* Mood Display Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Visual Composition */}
        <div className="lg:col-span-6 relative group overflow-hidden border border-[#241018]">
          <div className="aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden relative">
            <SmartImage
              src={mood.image}
              alt={`${selectedMood} Aesthetic Mood`}
              className="w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120309] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-[#C9AB81] bg-[#120309]/90 px-2.5 py-1 border border-[#C9AB81]/30 inline-block mb-2 font-semibold">
                Curated Concept: {mood.id}
              </span>
              <p className="font-editorial text-xl sm:text-2xl text-[#F7F3EE]">
                "{mood.tagline}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Details Grid */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Aesthetic Narrative */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81]">
              <Compass size={14} />
              <span>Spatial Narrative</span>
            </div>
            <p className="text-sm sm:text-base text-[#E9DFD2] leading-relaxed">
              {mood.description}
            </p>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81]">
              <Palette size={14} />
              <span>Color Harmony</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {mood.palette.map((color, i) => (
                <div key={i} className="group text-center">
                  <div
                    className="h-10 sm:h-12 w-full rounded-xs border border-[#F7F3EE]/10 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name}: ${color.hex}`}
                  />
                  <span className="block text-[9px] uppercase tracking-tighter text-[#8C817A] mt-1 truncate">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tactile Materials & Lighting Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-[#120309] border border-[#241018]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81] mb-2">
                <Layers size={14} />
                <span>Tactile Materials</span>
              </div>
              <ul className="space-y-1 text-xs text-[#8C817A]">
                {mood.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C9AB81] rounded-full shrink-0" />
                    <span className="text-[#E9DFD2]">{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#120309] border border-[#241018]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81] mb-2">
                <Sun size={14} />
                <span>Lighting Orchestration</span>
              </div>
              <p className="text-xs text-[#E9DFD2] leading-relaxed">
                {mood.lighting}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
