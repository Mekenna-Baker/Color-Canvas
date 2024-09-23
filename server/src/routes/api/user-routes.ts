import express from 'express';
import { getAllusers, getUserByUsername, updateUser } from '../../controllers/user-controller.js';

const router = express.Router();

//Get Users (grab all users)
router.get('/', getAllusers);

//Get Users with id
// router.get('/:id', getUserById);

//Get users with username
router.get('/:username', getUserByUsername)



//Put user (update user)
router.put('/', updateUser);

export { router as userRouter };


