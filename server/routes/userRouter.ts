import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/admins', checkRoleMiddleware('ADMIN'), userController.getAdmins);
router.patch('/:id', checkRoleMiddleware('ADMIN'), userController.updateUser);

export default router;
