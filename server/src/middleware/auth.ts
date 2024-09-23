import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

interface JwtPayload {
    username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if(authHeader){
      const token = authHeader.split(' ')[1];
      const secretKey = process.env.JWT_SECRET_KEY || '';
  
      jwt.verify(token, secretKey, (err, user) => {
          if(err){
            //sends back the forbidden status
            return res.sendStatus(403).json({mesage: 'Error verifying Token!'});
          }
  
          req.user = user as JwtPayload;
          return next();
      });
  
    } else {
      //send back the unauthorized status
      res.sendStatus(401).json({message: 'No token Exists'});
    }
  };