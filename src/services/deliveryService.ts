import { promises as fs } from 'fs';
import { DeliveryInfo } from '@types/domain';
import { BasketService } from '@services/basketService';
import { ORDERS_FILE } from '@config/index';

export interface OrderRecord {
  userId: string;
  delivery: DeliveryInfo;
  createdAt: string;
}

async function readOrders(): Promise<OrderRecord[]> {
  try {
    const content = await fs.readFile(ORDERS_FILE, 'utf-8');
    if (content.trim().length === 0) {
      return [];
    }
    const parsed = JSON.parse(content) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as OrderRecord[];
  } catch {
    return [];
  }
}

async function writeOrders(orders: OrderRecord[]): Promise<void> {
  const json = JSON.stringify(orders, null, 2);
  await fs.writeFile(ORDERS_FILE, json, { encoding: 'utf-8' });
}

export const DeliveryService = {
  async createOrder(userId: string, delivery: DeliveryInfo): Promise<void> {
    if (!delivery.address || !delivery.phone || !delivery.email || !delivery.paymentMethod) {
      const error = new Error('Invalid delivery info');
      (error as Error & { statusCode?: number }).statusCode = 400;
      throw error;
    }

    const orders = await readOrders();
    const order: OrderRecord = {
      userId,
      delivery,
      createdAt: new Date().toISOString()
    };
    orders.push(order);
    await writeOrders(orders);
    await BasketService.clear(userId);
  }
};

