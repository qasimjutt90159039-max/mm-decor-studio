import app, { initBackend } from '../backend/src/app.js';

let ready = false;

export default async function handler(req, res) {
  if (!ready) {
    try {
      await initBackend();
      ready = true;
    } catch (err) {
      console.error('[VERCEL API] Initialization error:', err);
    }
  }
  return app(req, res);
}
