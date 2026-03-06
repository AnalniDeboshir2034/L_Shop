import { APP_PORT } from '@config/index';
import { createApp } from './app';

const start = async () => {
  const app = await createApp();
  app.listen(APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`MaFinBuSi backend listening on port ${APP_PORT}`);
  });
};

void start();

