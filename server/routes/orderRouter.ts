import { Router } from 'express';
import orderController from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';

const router = Router();

router.get('/', checkRoleMiddleware('ADMIN'), orderController.getAllOrders);
router.get('/:orderId', authMiddleware, orderController.getOneOrder);
router.post('/', authMiddleware, orderController.postOrder);

export default router;
