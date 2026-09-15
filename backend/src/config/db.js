import mongoose from 'mongoose';

export let isMongooseConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mm_decor_studio';

  try {
    console.log(`[DB] Attempting connection to MongoDB at ${uri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongooseConnected = true;
    console.log('[DB] Connected to MongoDB database successfully.');
  } catch (err) {
    console.log(`[DB] MongoDB not detected (${err.message}).`);
    console.log('[DB] Seamlessly operating in built-in zero-dependency in-memory mode.');
    isMongooseConnected = false;
  }
};
