import { Router } from 'express';
import brandController from '../controllers/brandController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), brandController.postBrand);
router.get('/', brandController.getBrands);

export default router;
