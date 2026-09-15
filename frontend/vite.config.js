import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'express-api-plugin',
      async configureServer(server) {
        try {
          const { app, initBackend } = await import('../backend/src/app.js');
          await initBackend();
          server.middlewares.use(app);
          console.log('[VITE] Express API connected to Vite dev server');
        } catch (err) {
          console.error('[VITE] API mount warning:', err.message);
        }
      },
    },
  ],
  server: {
    port: 5173,
  },
});
