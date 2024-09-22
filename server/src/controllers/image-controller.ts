import {Request, Response} from 'express';
import { Image } from "../models/image.js"
import { User } from "../models/user.js"

// Get images
export const getAllImages = async (_req: Request, res: Response) => {
    try {
        const imagesData = await Image.findAll({
            include: [
                {
                    model: User,
                    as: 'assignedUser',
                    attributes: ['username'],
                },
            ],
        });
        res.json(imagesData);
    } catch (err: any){
        res.status(500).json({message: err.message});
    }
};

//Post Images
export const createImage = async (req: Request, res: Response) => {
    const {title, width, height, imageData, userId } = req.body;
    try {
        const newImage = await Image.create({title, width, height, imageData, userId});
        res.status(201).json(newImage);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
};