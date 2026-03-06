import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { APP_PORT, CORS_ORIGIN, DATA_DIR } from '@config/index';
import { authRoutes } from '@routes/auth.routes';
import { productsRoutes } from '@routes/products.routes';
import { basketRoutes } from '@routes/basket.routes';
import { deliveryRoutes } from '@routes/delivery.routes';
import { errorHandler } from '@middleware/errorHandler';
import { promises as fs } from 'fs';

export const createApp = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const app = express();

  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', port: APP_PORT });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productsRoutes);
  app.use('/api/basket', basketRoutes);
  app.use('/api/delivery', deliveryRoutes);

  app.use('/api/assets', express.static(path.join(__dirname, '..', 'public')));

  app.use(errorHandler);

  return app;
};

