import {Router} from 'express';
import apiRoutes from './api/index.js'
import authRoutes from './auth-routes.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', apiRoutes)