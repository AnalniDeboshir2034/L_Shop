import { Router } from 'express';
import { DeliveryController } from '@controllers/deliveryController';
import { authMiddleware } from '@middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', DeliveryController.createOrder);

export const deliveryRoutes = router;

