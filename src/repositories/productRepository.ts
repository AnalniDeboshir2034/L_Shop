import { FileRepository } from '@utils/fileRepository';
import { Product } from '@types/domain';
import { PRODUCTS_FILE } from '@config/index';

const repo = new FileRepository<Product>(PRODUCTS_FILE);

export const ProductRepository = {
  async getAll(): Promise<Product[]> {
    return repo.readAll();
  }
};

