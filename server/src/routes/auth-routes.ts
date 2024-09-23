import {Router, Request, Response} from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser } from '../controllers/user-controller.js';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({
      where: { username },
    });
  
    if(!user){
      return res.status(401).json({message: 'Authentication Failed: username error'});
    }
    console.log('Password New:', password , '   Password old:', user.password)
    const passwordValidity = await bcrypt.compare(password, user.password);
    if (!passwordValidity){
      return res.status(401).json({message: "Authentication Failed: password error"});
    }
  
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if(!secretKey){
        console.error('JWT Secret Key is Missing!');
        return res.status(500).json({message: 'Internal Server Error'})
    } 

    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
    return res.json({token});
  };
  

export const exists = async (req: Request, res: Response) => {
    const {username, email} = req.body;

    try {
        const user: any[any] = await User.findAll({
            where: {username, email},
        })
        const arrayCheck = user.length > 0 ? true : false
       
        //if the user comes out null then return false. Signifying that the user does not exist
        if(!arrayCheck){
            return res.json({exists: false});
        }

        //if the user does exist then send back true
        return res.json({exists: true});

    } catch (err) {
        return res.status(500).json({message: 'Server Error'});
    }
};


const router = Router();
//Post User (create user)
router.post('/create', createUser);
router.post('/check', exists)
router.post('/login', login)

export default router;