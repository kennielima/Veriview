import express, { Request, Response } from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs";

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
            return response.status(401).json({ message: 'User already exists, login instead' })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = await User.create({ fullName, email, username, password: hashedPassword })

        return response.status(200).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                username: newUser.username,
            }
        })
    }
    catch (error) {
        console.error('Signup error:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
})


router.post('/login', async (request: Request, response: Response) => {
    const { email, password } = request.body
    try {
        console.log('checking email')
        if (!email || !password) {
            return response.status(400).json({ message: 'please input all fields' })
        }
        console.log('finding user')
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return response.status(401).json({ message: "User doesn't exist, signup instead" })
        }
        console.log('validating password')
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return response.status(400).json({ message: "Invalid email or password" })
        }
        console.log('return user')
        return response.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                fullName: user.fullName
            }
        })
    }
    catch (error) {
        console.error('Login error:', error);
        return response.status(500).json({ message: 'Internal server error' })
    }
})
export default router