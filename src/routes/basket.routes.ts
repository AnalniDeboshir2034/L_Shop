import { Router } from 'express';
import { BasketController } from '@controllers/basketController';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', BasketController.getBasket);
router.post('/items', BasketController.addItem);
router.patch('/items/:productId', BasketController.updateItem);
router.delete('/items/:productId', BasketController.removeItem);

export const basketRoutes = router;

