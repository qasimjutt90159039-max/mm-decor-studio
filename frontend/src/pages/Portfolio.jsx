import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Filter, MapPin, Calendar, FolderPlus } from 'lucide-react';
import { getPortfolio } from '../services/api';
import { SmartImage } from '../components/SmartImage';

const DEFAULT_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'Warm Minimalist Living & Spatial Lounge',
    category: 'Interior',
    description:
      'A refined residential concept harmonizing honed limestone, low-kelvin cove illumination, smoked oak millwork, and textured linen bouclé upholstery in Lahore.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Interior Discipline',
  },
  {
    _id: 'proj-2',
    title: 'Celebratory Evening Staging & Candlelit Ambience',
    category: 'Events',
    description:
      'Evocative celebratory atmosphere incorporating sheer fabric canopies, dramatic botanical archways, tiered pillar candles, and ambient champagne lighting in Lahore.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Event Discipline',
  },
  {
    _id: 'proj-3',
    title: 'Contemporary Dining & Sculptural Table Architecture',
    category: 'Interior',
    description:
      'A tactile dining space featuring a monolithic travertine dining table, fluted cast glass partitions, and brushed bronze lighting accents.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Interior Discipline',
  },
  {
    _id: 'proj-4',
    title: 'Intimate Ceremonial Floral & Lighting Pavilion',
    category: 'Events',
    description:
      'Botanical installations with cascading ivory florals, subtle warm amber uplighting, and bespoke silk drapery for intimate celebratory moments.',
    images: [
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Event Discipline',
  },
  {
    _id: 'proj-5',
    title: 'Boutique Executive Suite & Private Library',
    category: 'Interior',
    description:
      'Sculptural spatial proportions with custom acoustic fluting, deep plum velvet accent seating, and warm focused task illumination.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Interior Discipline',
  },
  {
    _id: 'proj-6',
    title: 'Grand Banquet Tablescape & Floral Canopy',
    category: 'Events',
    description:
      'Orchestration of long banquet tablescapes with custom gilded candelabras, textured champagne runners, and layered hanging greenery.',
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Event Discipline',
  },
];

export const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioItems();
  }, [category]);

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const res = await getPortfolio(category === 'All' ? null : category);
      if (res.data?.data && res.data.data.length > 0) {
        setItems(res.data.data);
      } else {
        // Filter fallback items by category
        const filtered =
          category === 'All'
            ? DEFAULT_PROJECTS
            : DEFAULT_PROJECTS.filter(
                (p) => p.category.toLowerCase() === category.toLowerCase()
              );
        setItems(filtered);
      }
    } catch (err) {
      console.warn('Using curated visual portfolio items:', err.message);
      const filtered =
        category === 'All'
          ? DEFAULT_PROJECTS
          : DEFAULT_PROJECTS.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase()
            );
      setItems(filtered);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Interior', 'Events'];

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-24 sm:pt-28 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-12 border-b border-[#241018]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Studio Archive</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#F7F3EE] uppercase leading-none">
            Portfolio
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-[#C9AB81] italic">
            Spatial Compositions & Event Styling
          </p>
          <p className="text-sm text-[#8C817A] max-w-2xl leading-relaxed">
            An editorial collection of realized interior spaces and event atmospheres by MM Decor Studio in Lahore.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#241018]">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#C9AB81]" />
            <span className="text-xs uppercase tracking-widest text-[#8C817A]">
              Filter Disciplines:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-300 border ${
                  category === cat
                    ? 'bg-[#C9AB81] text-[#120309] font-semibold border-[#C9AB81]'
                    : 'bg-[#18060f] text-[#E9DFD2] border-[#241018] hover:border-[#C9AB81]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-12 max-w-7xl mx-auto px-5 sm:px-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-[#C9AB81]/30 border-t-[#C9AB81] rounded-full animate-spin mx-auto mb-4" />
            <p className="font-editorial text-lg text-[#C9AB81] uppercase tracking-widest">
              Accessing Studio Archive...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => {
              const isLarge = idx === 0 && items.length > 2;
              return (
                <div
                  key={item._id}
                  className={`group bg-[#18060f] border border-[#241018] hover:border-[#C9AB81]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className={`overflow-hidden relative ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <SmartImage
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18060f] via-transparent to-transparent opacity-80 pointer-events-none" />
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#120309] bg-[#C9AB81] px-3 py-1 font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EE] group-hover:text-[#C9AB81] transition-colors">
                        {item.title}
                      </h3>
                      {(item.location || item.date) && (
                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#8C817A] pt-1">
                          {item.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="text-[#C9AB81]" />
                              {item.location}
                            </span>
                          )}
                          {item.date && (
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-[#C9AB81]" />
                              {item.date}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-[#8C817A] line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-4 border-t border-[#241018]">
                      <Link
                        to={`/portfolio/${item._id}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81] hover:text-[#F7F3EE] transition-colors font-medium"
                      >
                        <span>View Project Details</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
