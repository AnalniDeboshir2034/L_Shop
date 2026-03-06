import { Router } from 'express';
import { ProductsController } from '@controllers/productsController';

const router = Router();

router.get('/', ProductsController.list);

export const productsRoutes = router;

