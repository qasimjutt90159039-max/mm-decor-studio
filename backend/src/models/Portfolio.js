import mongoose from 'mongoose';
import { InMemoryCollection } from './store.js';

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Portfolio title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Interior', 'Events', 'Commercial', 'Residential', 'Styling'],
      default: 'Interior',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, 'At least one image URL is required'],
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    date: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const MongoosePortfolio =
  mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
const memoryPortfolio = new InMemoryCollection('portfolios');

export const Portfolio = new Proxy(MongoosePortfolio, {
  get(target, prop) {
    if (mongoose.connection?.readyState === 1) {
      return target[prop];
    }
    return memoryPortfolio[prop];
  },
});
