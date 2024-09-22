import { Request, Response} from 'express';
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

// Get users
export const getAllusers = async (_req: Request, res: Response) => {
    try {
        const usersData = await User.findAll({
            attributes: { exclude: ['password']}
        });
        res.json(usersData);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

// Post users (create a new user)
export const createUser = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password});
        res.status(201).json(newUser)
    } catch (err: any){
        res.status(400).json({message: err.message});
    }
};

// Put users (Update user)
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password} = req.body;

    try{ 
        const user = await User.findByPk(id);
        if (user){
            user.username = username;
            user.password = await bcrypt.hash(password, 10);
            user.email = email;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        } 
    } catch (err: any){
        res.status(400).json({message: err.message});
    }
};

// Post login (Login user)

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        //check if user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        //Make sure JWT_SECRET_KEY is defined in the environment variables
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
        }

        //create token
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
            expiresIn: '1h',
        });

        //return token
        return res.json({ token });
    } catch (err: any) {
        res.status(500).json({ message: 'Login failed' });
    }

};

