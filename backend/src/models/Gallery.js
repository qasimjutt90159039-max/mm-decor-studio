import mongoose from 'mongoose';
import { InMemoryCollection } from './store.js';

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Interior', 'Events', 'Moodboard', 'Details', 'Atmosphere'],
      default: 'Interior',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const MongooseGallery =
  mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
const memoryGallery = new InMemoryCollection('galleries');

export const Gallery = new Proxy(MongooseGallery, {
  get(target, prop) {
    if (mongoose.connection?.readyState === 1) {
      return target[prop];
    }
    return memoryGallery[prop];
  },
});
