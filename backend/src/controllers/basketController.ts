import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@middleware/authMiddleware';
import { BasketService } from '@services/basketService';

export interface BasketItemPayload {
  productId: string;
  quantity: number;
}

export const BasketController = {
  async getBasket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const basket = await BasketService.getBasketWithProducts(req.userId);
      res.json(basket);
    } catch (error) {
      next(error);
    }
  },

  async addItem(
    req: AuthenticatedRequest & { body: BasketItemPayload },
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const basket = await BasketService.addItem(req.userId, req.body.productId, req.body.quantity);
      res.status(201).json(basket);
    } catch (error) {
      next(error);
    }
  },

  async updateItem(
    req: AuthenticatedRequest & { body: { quantity: number } },
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const productId = req.params.productId;
      const basket = await BasketService.updateItem(
        req.userId,
        productId,
        req.body.quantity
      );
      res.json(basket);
    } catch (error) {
      next(error);
    }
  },

  async removeItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const productId = req.params.productId;
      const basket = await BasketService.removeItem(req.userId, productId);
      res.json(basket);
    } catch (error) {
      next(error);
    }
  }
};

