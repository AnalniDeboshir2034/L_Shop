import { FileRepository } from '@utils/fileRepository';
import { Basket } from '@types/domain';
import { BASKETS_FILE } from '@config/index';

const repo = new FileRepository<Basket>(BASKETS_FILE);

export const BasketRepository = {
  async getAll(): Promise<Basket[]> {
    return repo.readAll();
  },

  async findByUserId(userId: string): Promise<Basket | undefined> {
    const baskets = await repo.readAll();
    return baskets.find((b) => b.userId === userId);
  },

  async saveAll(baskets: Basket[]): Promise<void> {
    await repo.writeAll(baskets);
  },

  async upsert(basket: Basket): Promise<Basket> {
    const baskets = await repo.readAll();
    const index = baskets.findIndex((b) => b.userId === basket.userId);
    if (index === -1) {
      baskets.push(basket);
    } else {
      baskets[index] = basket;
    }
    await repo.writeAll(baskets);
    return basket;
  }
};

