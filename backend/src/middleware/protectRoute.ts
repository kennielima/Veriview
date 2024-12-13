import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

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
        const token = req.cookies.tokenkey;
        console.log("usertoken frm middleware: ", token)

        if (!token) {
            return res.status(401).json({ message: 'User unauthorized to make request' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as decodedToken
         
        if (!decoded) {
            return res.status(404).json({ message: 'Invalid token' })
        }
        console.log("decoded.id", decoded.userId)
        const user = await User.findOne({
            where: {
                id: decoded.userId
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        console.log("user from mw: ", user)
        req.user = user;
        next()
    }
    catch (error) {
        console.error("Authorization failed:", error)
    }
}

export default authenticate