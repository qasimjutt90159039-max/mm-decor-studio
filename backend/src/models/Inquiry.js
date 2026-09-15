import mongoose from 'mongoose';
import { InMemoryCollection } from './store.js';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Your name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    interestedIn: {
      type: String,
      required: [true, 'Please select your area of interest'],
      enum: ['Interior Design', 'Event Planning', 'General Inquiry'],
      default: 'General Inquiry',
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio',
      default: null,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'contacted'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const MongooseInquiry =
  mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
const memoryInquiry = new InMemoryCollection('inquiries');

export const Inquiry = new Proxy(MongooseInquiry, {
  get(target, prop) {
    if (mongoose.connection?.readyState === 1) {
      return target[prop];
    }
    return memoryInquiry[prop];
  },
});
