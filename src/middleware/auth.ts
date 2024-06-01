import jwt, { Secret } from 'jsonwebtoken'
import express from 'express';
require ('dotenv').config();
// Generating a token
export const  generateAuthToken = (userId: string): string => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET as Secret, {expiresIn: '6d'});
    return token; 
};
// Verifying a token
export const verifyAuthToken = (token:string): any => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as Secret)
        return decode;
    }   catch (err) {
        throw new Error ('Invalid Token');
    }
}
//Middleware Authentication
export const authenticateAuthToken = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({message: 'Authentication required'});
    };
    try {
        const tokenString = Array.isArray(token) ? token[0] : token;
        const decoded = verifyAuthToken(tokenString.replace('Bearer', '').trim());
        (req as any).user = decoded;
        next();
    }   catch (err) {
        return res.status(401).send('Invalid token');
    }
}