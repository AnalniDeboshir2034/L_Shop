import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@middleware/authMiddleware';
import { DeliveryInfo } from '@types/domain';
import { DeliveryService } from '@services/deliveryService';

export const DeliveryController = {
  async createOrder(
    req: AuthenticatedRequest & { body: DeliveryInfo },
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      await DeliveryService.createOrder(req.userId, req.body);
      res.status(201).json({ message: 'Order created' });
    } catch (error) {
      next(error);
    }
  }
};

