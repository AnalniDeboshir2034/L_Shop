import path from 'path';

export const APP_PORT = Number(process.env.PORT ?? 4000);

export const DATA_DIR = path.join(__dirname, '..', '..', 'data');

export const USERS_FILE = path.join(DATA_DIR, 'users.json');
export const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
export const BASKETS_FILE = path.join(DATA_DIR, 'baskets.json');
export const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

export const SESSION_COOKIE_NAME = 'mafinbusi_session';
export const SESSION_TTL_MS = 10 * 60 * 1000;

export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

