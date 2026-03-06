import { Basket, Product } from '@types/domain';
import { BasketRepository } from '@repositories/basketRepository';
import { ProductRepository } from '@repositories/productRepository';

export interface BasketWithProducts extends Basket {
  products: Product[];
}

export const BasketService = {
  async getOrCreate(userId: string): Promise<Basket> {
    const existing = await BasketRepository.findByUserId(userId);
    if (existing) {
      return existing;
    }
    const basket: Basket = { userId, items: [] };
    await BasketRepository.upsert(basket);
    return basket;
  },

  async getBasketWithProducts(userId: string): Promise<BasketWithProducts> {
    const basket = await this.getOrCreate(userId);
    const allProducts = await ProductRepository.getAll();
    const products = basket.items
      .map((item) => allProducts.find((p) => p.id === item.productId))
      .filter((p): p is Product => p !== undefined);
    return { ...basket, products };
  },

  async addItem(userId: string, productId: string, quantity: number): Promise<Basket> {
    const basket = await this.getOrCreate(userId);
    const existingItem = basket.items.find((i) => i.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      basket.items.push({ productId, quantity });
    }
    await BasketRepository.upsert(basket);
    return basket;
  },

  async updateItem(userId: string, productId: string, quantity: number): Promise<Basket> {
    const basket = await this.getOrCreate(userId);
    if (quantity <= 0) {
      basket.items = basket.items.filter((i) => i.productId !== productId);
    } else {
      const existingItem = basket.items.find((i) => i.productId === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        basket.items.push({ productId, quantity });
      }
    }
    await BasketRepository.upsert(basket);
    return basket;
  },

  async removeItem(userId: string, productId: string): Promise<Basket> {
    const basket = await this.getOrCreate(userId);
    basket.items = basket.items.filter((i) => i.productId !== productId);
    await BasketRepository.upsert(basket);
    return basket;
  },

  async clear(userId: string): Promise<void> {
    const basket = await this.getOrCreate(userId);
    basket.items = [];
    await BasketRepository.upsert(basket);
  }
};

