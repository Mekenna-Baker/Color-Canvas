import { Request, Response} from 'express';
import { User } from "../models/user.js";

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

//Get user :id (grab a user with id)
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

//Get user :username (grab user with a username)
export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        //find a users data by a username
        const user = await User.findOne({ where: { username: username } })
        console.log(user)

        if(user){
            res.json(user)
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (err: any) {
        res.status(500).json({message: err.message})
    }

}

// Post users (create a new user)
export const createUser = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    try {
        const newUser = await User.create({ username, password, email});
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
            user.password = password;
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


