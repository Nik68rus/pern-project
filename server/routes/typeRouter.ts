import { Router } from 'express';
import typeController from '../controllers/typeController';

const router = Router();

router.post('/', typeController.postType);
router.get('/', typeController.getTypes);

export default router;
