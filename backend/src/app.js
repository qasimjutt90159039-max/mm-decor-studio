import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seeds/seedAdmin.js';
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Studio Health & Info Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    studio: 'MM Decor Studio Interior Designer & Event Planner Lahore',
    category: 'Interior Designer',
    address: 'Ichra Bazar, Ichhra Lahore, 54000, Pakistan',
    phone: '+92 318 0130117',
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/inquiries', inquiryRoutes);

let initialized = false;
export const initBackend = async () => {
  if (initialized) return;
  try {
    await connectDB();
    await seedDatabase();
    initialized = true;
    console.log('[BACKEND] Database and seed services initialized.');
  } catch (err) {
    console.error('[BACKEND] Initialization warning:', err.message);
  }
};

export { app };
export default app;
