import { httpClient } from './httpClient';
import { BasketDto } from '@types/domain';

export interface BasketItemPayload {
  productId: string;
  quantity: number;
}

export const basketApi = {
  async getBasket(): Promise<BasketDto> {
    const response = await httpClient.get<BasketDto>('/basket');
    return response.data;
  },

  async addItem(payload: BasketItemPayload): Promise<BasketDto> {
    const response = await httpClient.post<BasketDto>('/basket/items', payload);
    return response.data;
  },

  async updateItem(productId: string, quantity: number): Promise<BasketDto> {
    const response = await httpClient.patch<BasketDto>(`/basket/items/${productId}`, {
      quantity
    });
    return response.data;
  },

  async removeItem(productId: string): Promise<BasketDto> {
    const response = await httpClient.delete<BasketDto>(`/basket/items/${productId}`);
    return response.data;
  }
};

