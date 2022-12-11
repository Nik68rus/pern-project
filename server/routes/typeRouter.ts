import { Router } from 'express';
import typeController from '../controllers/typeController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), typeController.postType);
router.delete('/:id', checkRoleMiddleware('ADMIN'), typeController.deleteType);
router.get('/', typeController.getTypes);

export default router;
