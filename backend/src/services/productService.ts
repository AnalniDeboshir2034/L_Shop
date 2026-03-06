import { Product, ProductQuery } from '@types/domain';
import { ProductRepository } from '@repositories/productRepository';

export const ProductService = {
  async list(query: ProductQuery): Promise<Product[]> {
    const all = await ProductRepository.getAll();

    let filtered: Product[] = all;

    if (query.search) {
      const term = query.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (query.category) {
      filtered = filtered.filter((p) => p.category === query.category);
    }

    if (query.brand) {
      filtered = filtered.filter((p) => p.brand === query.brand);
    }

    if (typeof query.available === 'boolean') {
      filtered = filtered.filter((p) => p.available === query.available);
    }

    if (typeof query.minPrice === 'number') {
      filtered = filtered.filter((p) => p.price >= query.minPrice);
    }

    if (typeof query.maxPrice === 'number') {
      filtered = filtered.filter((p) => p.price <= query.maxPrice);
    }

    if (query.sortBy === 'price') {
      const order = query.sortOrder === 'desc' ? -1 : 1;
      filtered = [...filtered].sort((a, b) => (a.price - b.price) * order);
    }

    return filtered;
  }
};

