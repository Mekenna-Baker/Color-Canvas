import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

interface JwtPayload {
    username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            return res.sendStatus(403).json({message: 'Invalid token'});
        }

        req.user = user as JwtPayload;
        next();
    });
};