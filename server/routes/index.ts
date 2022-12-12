import { Router } from 'express';
import deviceRouter from './deviceRouter';
import typeRouter from './typeRouter';
import brandRouter from './brandRouter';
import userRouter from './userRouter';
import rateRouter from './ratingRouter';
import cartRouter from './cartRouter';

const router = Router();

router.use('/brand', brandRouter);
router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/type', typeRouter);
router.use('/rate', rateRouter);
router.use('/cart', cartRouter);

export default router;
