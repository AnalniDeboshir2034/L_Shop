import { httpClient } from './httpClient';
import { ProductDto, ProductQueryDto } from '@types/domain';

export const productsApi = {
  async list(params?: ProductQueryDto): Promise<ProductDto[]> {
    const response = await httpClient.get<ProductDto[]>('/products', { params });
    return response.data;
  }
};

