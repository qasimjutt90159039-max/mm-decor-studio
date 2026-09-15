import mongoose from 'mongoose';
import { InMemoryCollection } from './store.js';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Service category is required'],
      enum: ['Interior', 'Events', 'Consultation', 'Styling'],
      default: 'Interior',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const MongooseService =
  mongoose.models.Service || mongoose.model('Service', serviceSchema);
const memoryService = new InMemoryCollection('services');

export const Service = new Proxy(MongooseService, {
  get(target, prop) {
    if (mongoose.connection?.readyState === 1) {
      return target[prop];
    }
    return memoryService[prop];
  },
});
