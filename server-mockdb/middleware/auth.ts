import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const config = process.env;

export function verifyToken(req:Request, res:Response, next:any) {
    const tokenHeader = req.headers['authorization'];
    if(tokenHeader) {
        const token = tokenHeader.split(' ');
        const tokenContents = token[1];
        try {
            const decoded = jwt.verify(tokenContents, config.TOKEN_KEY as string);
            (req as unknown as Record<string, unknown>).user = decoded;
            (req as unknown as Record<string, unknown>).token = tokenContents;
        } catch (err) {
            return res.status(401).send("Invalid token");
        }
        return next();
    }
    return res.status(403).send("A token is required for authentication");
}
