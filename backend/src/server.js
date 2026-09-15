import { app, initBackend } from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await initBackend();
    app.listen(PORT, () => {
      console.log(`[SERVER] MM Decor Studio API running on port ${PORT}`);
      console.log(`[SERVER] Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('[SERVER] Failed to start:', err.message);
  }
};

start();
