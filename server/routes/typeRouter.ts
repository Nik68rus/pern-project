import { Router } from 'express';
import typeController from '../controllers/typeController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';

const router = Router();

router.get('/', typeController.getTypes);
router.post('/', checkRoleMiddleware('ADMIN'), typeController.postType);
router.patch('/:id', checkRoleMiddleware('ADMIN'), typeController.editType);
router.delete('/:id', checkRoleMiddleware('ADMIN'), typeController.deleteType);

export default router;
