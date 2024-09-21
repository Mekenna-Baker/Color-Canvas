import { Router } from 'express';
import { userRouter } from './user-routes';
import { imageRouter } from './image-routes';

const router = Router();

router.use('/users', userRouter);
router.use('/images', imageRouter);

export default router;