import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import logger from "../utils/logger";
import { JWT_SECRET } from "../utils/config";

interface decodedToken extends JwtPayload {
    id: string
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenkey = req.cookies.tokenkey;
        const authHeader = req.headers['authorization']; // FETCHING FROM authHeader INSTEAD OF COOKIE
        const token = authHeader && authHeader.split(' ')[1];

        if (!tokenkey) {
            return res.status(401).json({ message: 'User unauthorized to make request' })
        }
        const decoded = jwt.verify(tokenkey, JWT_SECRET as string) as decodedToken

        if (!decoded) {
            return res.status(404).json({ message: 'Invalid token' })
        }
        const user = await User.findOne({
            where: {
                id: decoded.userId
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        req.user = user;
        next()
    }
    catch (error) {
        logger.error("Authorization failed:", error)
        return res.status(401).json({ message: 'Authentication failed: User unauthorized to make requesA' });
    }
}

export default authenticate