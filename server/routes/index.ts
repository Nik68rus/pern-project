import { Router } from 'express';
import deviceRouter from './deviceRouter';
import typeRouter from './typeRouter';
import brandRouter from './brandRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/brand', brandRouter);
router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/type', typeRouter);

export default router;
