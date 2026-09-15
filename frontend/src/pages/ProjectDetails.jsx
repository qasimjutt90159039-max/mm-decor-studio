import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, MapPin, Calendar, Tag, ArrowUpRight, MessageSquare } from 'lucide-react';
import { getPortfolioItem } from '../services/api';
import { SmartImage } from '../components/SmartImage';

const DEFAULT_PROJECTS_MAP = {
  'proj-1': {
    title: 'Warm Minimalist Living & Spatial Lounge',
    category: 'Interior',
    description:
      'A refined residential concept harmonizing honed limestone, low-kelvin cove illumination, smoked oak millwork, and textured linen bouclé upholstery in Lahore.\n\nThe layout fosters intimacy while maintaining generous sightlines across living and dining areas.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Interior Discipline',
  },
  'proj-2': {
    title: 'Celebratory Evening Staging & Candlelit Ambience',
    category: 'Events',
    description:
      'Evocative celebratory atmosphere incorporating sheer fabric canopies, dramatic botanical archways, tiered pillar candles, and ambient champagne lighting in Lahore.\n\nDesigned to captivate guests from the entrance colonnade through to the central seating lounge.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    ],
    location: 'Lahore, Pakistan',
    date: 'Event Discipline',
  },
  'proj-3': {
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
  'proj-4': {
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
  'proj-5': {
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
  'proj-6': {
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
};

export const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const res = await getPortfolioItem(id);
      if (res.data?.success && res.data?.data) {
        setProject(res.data.data);
      } else if (DEFAULT_PROJECTS_MAP[id]) {
        setProject(DEFAULT_PROJECTS_MAP[id]);
      } else {
        // Check if id matches any default
        const fallback = Object.values(DEFAULT_PROJECTS_MAP)[0];
        setProject(fallback);
      }
    } catch (err) {
      if (DEFAULT_PROJECTS_MAP[id]) {
        setProject(DEFAULT_PROJECTS_MAP[id]);
      } else {
        const fallback = Object.values(DEFAULT_PROJECTS_MAP)[0];
        setProject(fallback);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-36 pb-24 text-center">
        <div className="w-10 h-10 border-2 border-[#C9AB81]/30 border-t-[#C9AB81] rounded-full animate-spin mx-auto mb-4" />
        <p className="font-editorial text-lg text-[#C9AB81] uppercase tracking-widest">
          Loading Project Record...
        </p>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-36 pb-24 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-5 text-center space-y-6">
          <span className="font-editorial text-7xl text-[#C9AB81]/40 block select-none">
            404
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EE] uppercase">
            Project Not Found
          </h2>
          <p className="text-sm text-[#8C817A] max-w-md mx-auto leading-relaxed">
            The requested portfolio entry does not exist or may have been relocated in the MM Decor Studio archive.
          </p>
          <div className="pt-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C9AB81] text-[#120309] text-xs uppercase tracking-widest font-semibold hover:bg-[#F7F3EE] transition-all"
            >
              <ArrowLeft size={14} />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = Array.isArray(project.images) && project.images.length > 0 ? project.images : [];

  return (
    <div className="min-h-screen bg-[#120309] text-[#E9DFD2] pt-24 sm:pt-28 pb-24">
      {/* Back to archive link */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C817A] hover:text-[#C9AB81] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio Archive</span>
        </Link>
      </div>

      {/* Main Project Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-10 border-b border-[#241018]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest text-[#120309] bg-[#C9AB81] px-3 py-1 font-semibold inline-block">
                {project.category}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#8C817A]">
                MM Decor Studio Lahore
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F3EE] uppercase leading-tight">
              {project.title}
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3 text-xs text-[#8C817A] lg:items-end">
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#C9AB81]" />
                <span>{project.location}</span>
              </div>
            )}
            {project.date && (
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#C9AB81]" />
                <span>{project.date}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media & Content Gallery */}
      <section className="py-10 max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Main Display Image */}
        {images.length > 0 && (
          <div className="border border-[#241018] bg-[#18060f] overflow-hidden aspect-[16/9] sm:aspect-[21/9] w-full">
            <SmartImage
              src={images[activeImageIndex]}
              alt={project.title}
              className="w-full h-full filter brightness-95"
            />
          </div>
        )}

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 horizontal-scroll-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`shrink-0 w-24 h-16 sm:w-28 sm:h-18 border overflow-hidden transition-all ${
                  activeImageIndex === i
                    ? 'border-[#C9AB81] opacity-100 scale-105'
                    : 'border-[#241018] opacity-60 hover:opacity-100'
                }`}
              >
                <SmartImage src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full" />
              </button>
            ))}
          </div>
        )}

        {/* Project Description & Inquiry Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EE] uppercase tracking-wide">
              Project Overview
            </h3>
            <p className="text-base text-[#E9DFD2]/90 leading-relaxed font-light whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 sm:p-8 bg-[#18060f] border border-[#241018] space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9AB81]">
                <MessageSquare size={14} />
                <span>Inquire About This Aesthetic</span>
              </div>
              <p className="text-xs text-[#8C817A] leading-relaxed">
                Interested in a similar interior spatial design or event atmosphere concept for your space in Lahore?
              </p>
              <Link
                to={`/contact?subject=Inquiry regarding project: ${encodeURIComponent(project.title)}&interestedIn=${project.category === 'Events' ? 'Event Planning' : 'Interior Design'}`}
                className="w-full py-2.5 bg-[#C9AB81] text-[#120309] text-xs uppercase tracking-widest font-semibold block text-center hover:bg-[#F7F3EE] transition-all"
              >
                Inquire With Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
