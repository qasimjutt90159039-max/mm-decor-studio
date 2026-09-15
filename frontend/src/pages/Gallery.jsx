import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Filter, Maximize2, Plus, FolderPlus } from 'lucide-react';
import { getGallery } from '../services/api';
import { Lightbox } from '../components/Lightbox';
import { SmartImage } from '../components/SmartImage';

const DEFAULT_GALLERY = [
  {
    _id: 'gal-1',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    title: 'Monolithic Stone & Linear Illumination',
    category: 'Interior',
    description: 'Honed travertine surfaces paired with architectural recessed shadow gaps in Lahore.',
  },
  {
    _id: 'gal-2',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'Gilded Candlelight & Reception Draping',
    category: 'Events',
    description: 'Layered warm luminescence and deep plum fabric choreography for celebration.',
  },
  {
    _id: 'gal-3',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    title: 'Tactile Material Moodboard Study',
    category: 'Moodboard',
    description: 'Raw linen, brushed brass swatches, and hand-cut limestone samples.',
  },
  {
    _id: 'gal-4',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    title: 'Artisanal Tablescape Architecture',
    category: 'Details',
    description: 'Custom ceramic tableware, brass cutlery, and botanical accents.',
  },
  {
    _id: 'gal-5',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    title: 'Serene Minimalist Foyer',
    category: 'Interior',
    description: 'Daylight diffusion through sheer linen screens with sculptural seating.',
  },
  {
    _id: 'gal-6',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    title: 'Atmospheric Evening Scenography',
    category: 'Atmosphere',
    description: 'Twilight transition with ambient festoon lighting and floral canopies.',
  },
  {
    _id: 'gal-7',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    title: 'Bespoke Architectural Villa Interior',
    category: 'Interior',
    description: 'High ceilings, natural stone columns, and balanced symmetry in Lahore.',
  },
  {
    _id: 'gal-8',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    title: 'Floral Ceremony Arch Staging',
    category: 'Events',
    description: 'Textured floral density with soft champagne fabrics and warm ambient glows.',
  },
];

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, [category]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await getGallery(category === 'All' ? null : category);
      if (res.data?.data && res.data.data.length > 0) {
        setImages(res.data.data);
      } else {
        const filtered =
          category === 'All'
            ? DEFAULT_GALLERY
            : DEFAULT_GALLERY.filter(
                (item) => item.category.toLowerCase() === category.toLowerCase()
              );
        setImages(filtered);
      }
    } catch (err) {
      console.warn('Using curated visual gallery items:', err.message);
      const filtered =
        category === 'All'
          ? DEFAULT_GALLERY
          : DEFAULT_GALLERY.filter(
              (item) => item.category.toLowerCase() === category.toLowerCase()
            );
      setImages(filtered);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Interior', 'Events', 'Moodboard', 'Details', 'Atmosphere'];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-24 sm:pt-28 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-12 border-b border-[#241018]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241018] border border-[#C9AB81]/30 text-[#C9AB81] text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Visual Magazine</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#F7F3EE] uppercase leading-none">
            Studio Gallery
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-[#C9AB81] italic">
            Editorial Compositions, Textures & Mood
          </p>
          <p className="text-sm text-[#8C817A] max-w-2xl leading-relaxed">
            A visual anthology celebrating spatial elegance, decor accents, and ambient compositions in Lahore.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#241018]">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#C9AB81]" />
            <span className="text-xs uppercase tracking-widest text-[#8C817A]">
              Filter by Theme:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-widest transition-all duration-300 border ${
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

      {/* Gallery Masonry */}
      <section className="py-12 max-w-7xl mx-auto px-5 sm:px-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-2 border-[#C9AB81]/30 border-t-[#C9AB81] rounded-full animate-spin mx-auto mb-4" />
            <p className="font-editorial text-lg text-[#C9AB81] uppercase tracking-widest">
              Curating Visual Magazine...
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((item, index) => (
              <div
                key={item._id || index}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid group relative bg-[#18060f] border border-[#241018] hover:border-[#C9AB81]/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120309] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover icon */}
                  <div className="absolute top-4 right-4 p-2 bg-[#120309]/80 border border-[#C9AB81]/40 text-[#C9AB81] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 size={15} />
                  </div>

                  {/* Caption on hover */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="text-[9px] uppercase tracking-widest text-[#C9AB81] block mb-1 font-semibold">
                      {item.category}
                    </span>
                    <h4 className="font-editorial text-xl text-[#F7F3EE]">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-[#8C817A] line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
