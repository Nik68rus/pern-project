import { Router } from 'express';
import rateController from '../controllers/rateController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/:deviceId/summary', rateController.getTotalRate);
router.get('/:deviceId', authMiddleware, rateController.getPersonalRate);
router.post('/:deviceId', authMiddleware, rateController.postRate);

export default router;
