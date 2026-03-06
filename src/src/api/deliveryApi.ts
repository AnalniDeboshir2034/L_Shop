import { httpClient } from './httpClient';
import { DeliveryInfoDto } from '@types/domain';

export const deliveryApi = {
  async createOrder(payload: DeliveryInfoDto): Promise<void> {
    await httpClient.post('/delivery', payload);
  }
};

