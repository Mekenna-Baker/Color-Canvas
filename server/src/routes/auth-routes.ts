import {Router, Request, Response} from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({
            where: { username },
        });

        if(!user){
            return res.status(401).json({message: 'Authentication Failed: user'});
        }

        const passwordValidity = await bcrypt.compare(password, user.password);
        if(!passwordValidity){
            return res.status(401).json({message: 'Authentication Failed: password'});
        }

        const secretKey = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
        return res.json({token});

    } catch (err){
        return res.status(500).json({message: 'Server Error'});
    }
};

export const exists = async (req: Request, res: Response) => {
    const {username, email} = req.body;

    try {
        const user = User.findAll({
            where: {username, email},
        })

        //if the user comes out null then return false. Signifying that the user does not exist
        if(!user){
            return res.json({exists: false});
        }

        //if the user does exist then send back true
        return res.json({exists: true});

    } catch (err) {
        return res.status(500).json({message: 'Server Error'});
    }
};


const router = Router();
router.post('/check', exists)
router.post('/login', login);

export default router;