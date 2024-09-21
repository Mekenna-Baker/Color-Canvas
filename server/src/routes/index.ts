import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { imageRouter } from './image-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/images', imageRouter);

export default router;