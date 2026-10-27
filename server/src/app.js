import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { allowedOrigins, env } from './config/env.js';
import routes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();
  app.set('trust proxy', 1); // Render/Vercel sit behind a proxy; needed for correct rate limiting.
  app.use(helmet());
  app.use(cors({
    origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)),
    exposedHeaders: ['Content-Disposition'],
  }));
  app.use(express.json({ limit: '200kb' }));
  if (env.NODE_ENV !== 'test') app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  app.get('/', (_req, res) => res.json({ name: 'HaqDaar API', docs: '/api/health' }));
  app.use('/api', apiLimiter, routes);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
