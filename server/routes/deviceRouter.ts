import { Router } from 'express';
import deviceController from '../controllers/deviceController';

const router = Router();

router.post('/', deviceController.postDevice);
router.get('/', deviceController.getAllDevices);
router.get('/:deviceId', deviceController.getDevice);

export default router;
