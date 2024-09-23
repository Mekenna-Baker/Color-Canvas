import express, {Router, Request, Response} from 'express';
import { getAllusers, createUser, updateUser } from '../../controllers/user-controller.js';
import { User } from '../../models/index.js';

const router = express.Router();

//Get Users (grab all users)
router.get('/', getAllusers);

//Post User (create user)
router.post('/', createUser);

//Put user (update user)
router.put('/', updateUser);

export { router as userRouter };


