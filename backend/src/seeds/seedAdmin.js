import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from '../models/Admin.js';
import { Service } from '../models/Service.js';
import { Portfolio } from '../models/Portfolio.js';
import { Gallery } from '../models/Gallery.js';
import { connectDB } from '../config/db.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'MMDecorStudio@2026!';

    // Ensure Admin exists
    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (!existingAdmin) {
      console.log(`[SEED] Creating default administrator: ${adminUsername}...`);
      await Admin.create({
        username: adminUsername,
        password: adminPassword,
        role: 'admin',
      });
      console.log('[SEED] Default admin user initialized successfully.');
    }

    // Seed Services if none exist
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log('[SEED] Initializing creative studio design disciplines...');
      await Service.create([
        {
          name: 'Interior Spatial Planning & Concept Design',
          category: 'Interior',
          description:
            'Harmonizing spatial layout, material palette, architectural proportions, and ambient lighting for residential and boutique spaces.',
          image:
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          active: true,
        },
        {
          name: 'Event Atmosphere & Scenic Styling',
          category: 'Events',
          description:
            'Transforming venues through bespoke structural decor, dramatic fabric draping, sensory lighting moods, and curated botanical concepts in Lahore.',
          image:
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          active: true,
        },
        {
          name: 'Material & Moodboard Curation',
          category: 'Interior',
          description:
            'Physical and visual tactile palettes pairing natural stones, warm textiles, brushed metals, and bespoke color swatches.',
          image:
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          active: true,
        },
        {
          name: 'Table Architecture & Detail Accents',
          category: 'Events',
          description:
            'Fine tableware orchestration, candlelit centerpieces, textured linens, and artisanal details creating intimate celebratory tablescapes.',
          image:
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
          active: true,
        },
      ]);
    }

    // Seed Portfolio Projects if none exist
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      console.log('[SEED] Initializing studio portfolio projects...');
      await Portfolio.create([
        {
          title: 'Warm Minimalist Living & Spatial Lounge',
          category: 'Interior',
          description:
            'A refined residential concept harmonizing honed limestone, low-kelvin cove illumination, smoked oak millwork, and textured linen bouclé upholstery in Lahore.',
          images: [
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          ],
          location: 'Lahore, Pakistan',
          date: 'Design Concept',
        },
        {
          title: 'Celebratory Evening Staging & Candlelit Ambience',
          category: 'Events',
          description:
            'Evocative celebratory atmosphere incorporating sheer fabric canopies, dramatic botanical archways, tiered pillar candles, and ambient champagne lighting.',
          images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
          ],
          location: 'Lahore, Pakistan',
          date: 'Event Concept',
        },
        {
          title: 'Contemporary Dining & Sculptural Table Architecture',
          category: 'Interior',
          description:
            'A tactile dining space featuring a monolithic travertine dining table, fluted cast glass partitions, and brushed bronze lighting accents.',
          images: [
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          ],
          location: 'Lahore, Pakistan',
          date: 'Design Concept',
        },
        {
          title: 'Intimate Ceremonial Floral & Lighting Pavilion',
          category: 'Events',
          description:
            'Botanical installations with cascading ivory florals, subtle warm amber uplighting, and bespoke silk drapery for intimate celebratory moments.',
          images: [
            'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
          ],
          location: 'Lahore, Pakistan',
          date: 'Event Concept',
        },
      ]);
    }

    // Seed Gallery Photos if none exist
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      console.log('[SEED] Initializing visual magazine gallery photos...');
      await Gallery.create([
        {
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
          title: 'Monolithic Stone & Linear Illumination',
          category: 'Interior',
          description: 'Honed travertine surfaces paired with architectural recessed shadow gaps.',
        },
        {
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          title: 'Gilded Candlelight & Reception Draping',
          category: 'Events',
          description: 'Layered warm luminescence and deep plum fabric choreography.',
        },
        {
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          title: 'Tactile Material Moodboard Study',
          category: 'Moodboard',
          description: 'Raw linen, brushed brass swatches, and hand-cut limestone samples.',
        },
        {
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
          title: 'Artisanal Tablescape Architecture',
          category: 'Details',
          description: 'Custom ceramic tableware, brass cutlery, and botanical accents.',
        },
        {
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          title: 'Serene Minimalist Foyer',
          category: 'Interior',
          description: 'Daylight diffusion through sheer linen screens with sculptural seating.',
        },
        {
          image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
          title: 'Atmospheric Evening Scenography',
          category: 'Atmosphere',
          description: 'Twilight transition with ambient festoon lighting and floral canopies.',
        },
      ]);
    }

    console.log('[SEED] Database setup ready with studio visual assets.');
  } catch (err) {
    console.error('[SEED] Error during seeding:', err.message);
  }
};
