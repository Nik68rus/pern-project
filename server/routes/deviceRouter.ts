import { Router } from 'express';
import deviceController from '../controllers/deviceController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), deviceController.postDevice);
router.get('/', deviceController.getAllDevices);
router.get('/:deviceId', deviceController.getDevice);

export default router;
