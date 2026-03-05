import { Request, Response, NextFunction } from 'express';
import { ProductQuery } from '@types/domain';
import { ProductService } from '@services/productService';

export const ProductsController = {
  async list(
    req: Request<unknown, unknown, unknown, ProductQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const products = await ProductService.list(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
};

