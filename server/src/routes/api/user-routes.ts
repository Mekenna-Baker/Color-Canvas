import express from 'express';
import { getAllusers, createUser, updateUser } from '../../controllers/user-controller.js';

const router = express.Router();

//Get Users
router.get('/', getAllusers);

//Post User
router.post('/', createUser);

//Put user
router.put('/', updateUser);


export { router as userRouter };


