import { Router } from 'express';
import brandController from '../controllers/brandController';

const router = Router();

router.post('/', brandController.postBrand);
router.get('/', brandController.getBrands);

export default router;
