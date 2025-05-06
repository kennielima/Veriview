import express, { Request, Response } from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import authenticate from "../middleware/protectRoute";
import generateTokenSetCookies from "../utils/generateTokenSetCookies";
import logger from "../utils/logger";

const router = express.Router()
router.post('/signup', async (request: Request, response: Response) => {
    const { fullName, email, username, password, confirmPassword } = request.body
    try {
        if (!fullName || !email || !username || !password || !confirmPassword) {
            return response.status(400).json({ message: 'please input all fields' })
        }

        if (password !== confirmPassword) {
            return response.status(400).json({ message: "passwords don't match" })
        }
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            logger.warn("User already exists");
            return response.status(401).json({ message: 'User already exists with this email, use a different email or login instead' })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = await User.create({ fullName, email, username, password: hashedPassword })

        generateTokenSetCookies(newUser.id, response)
        return response.status(200).json({
            loggedIn: true,
            message: 'User created successfully',
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                username: newUser.username,
            },
        })
    }
    catch (error) {
        logger.error('Signup error:', error);
        return response.status(500).json({ message: 'Signup error' });
    }
})

router.post('/login', async (request: Request, response: Response) => {
    const { email, password } = request.body;
    try {
        if (!email || !password) {
            return response.status(400).json({ message: 'please input all fields' })
        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return response.status(401).json({ message: "User doesn't exist, signup instead" })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return response.status(400).json({ message: "Invalid credentials" })
        }

        generateTokenSetCookies(user.id, response);
        response.status(200).json({
            loggedIn: true,
            message: 'User logged in successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                fullName: user.fullName,
            },
        })
    }
    catch (error) {
        logger.error('Login error:', error);
        return response.status(500).json({ message: 'Login error' })
    }
})

router.post('/logout', async (request: Request, response: Response) => {
    try {
        response.cookie("tokenkey", '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict'
        })
        response.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        logger.error('Logout error:', error);
    }
})
export default router