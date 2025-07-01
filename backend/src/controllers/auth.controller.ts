import { Request, Response } from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import generateTokenSetCookies from "../utils/generateTokenSetCookies";
import logger from "../utils/logger";
import axios, { AxiosError } from "axios";
import { GOOGLE_AUTH_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_TOKEN_URI, GOOGLE_USERINFO_URL, BASE_URL } from "../utils/config";

const Signup = async (request: Request, response: Response) => {
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
        logger.error('Signup error: ', error);
        return response.status(500).json({ message: 'Signup error: ' + error });
    }
}
const Login = async (request: Request, response: Response) => {
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
        logger.error('Login error: ', error);
        return response.status(500).json({ message: `Login error: , ${error}` })
    }
}

const Logout = async (request: Request, response: Response) => {
    try {
        response.cookie("tokenkey", '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict'
        })
        response.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        logger.error('Logout error: ', error);
        return response.status(500).json({ message: 'Logout error: ' + error })
    }
}

const GoogleOauth = async (request: Request, response: Response) => {
    try {
        if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
            logger.error('Google client ID or redirect URI is not defined');
            return response.status(500).json({ message: 'Server configuration error: Google OAuth variables are missing' });
        }
        const params = {
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: GOOGLE_REDIRECT_URI,
            response_type: 'code',
            scope: "email profile"
        };
        const authURL = `${GOOGLE_AUTH_URI}?${new URLSearchParams(params).toString()}`;
        response.redirect(authURL);
    }
    catch (error) {
        logger.error('Google OAuth error: ', error);
        return response.status(500).json({ message: 'Google OAuth error: ' + error })
    }
}

const GoogleCallback = async (request: Request, response: Response) => {
    const param = request.query;
    const code = param.code as string;

    try {
        if (!GOOGLE_TOKEN_URI || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI || !GOOGLE_USERINFO_URL) {
            return response.status(500).json({ message: 'Server configuration error: Google OAuth variables are missing' });
        }

        const tokenResponse = await axios.post(
            GOOGLE_TOKEN_URI,
            new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code"
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            }
        )

        const { data } = tokenResponse;
        logger.info("datacreated:", data);

        const accessToken = data.access_token;

        const userInfoResponse = await axios.get(GOOGLE_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const userData = userInfoResponse.data;

        // logger.info("usercreated:", userInfoResponse);

        let token;
        const emailUser = await User.findOne({
            where: {
                email: userData.email
            }
        })

        // logger.info(emailUser);

        if (emailUser) {
            if (!emailUser?.googleId) {
                await emailUser.update({
                    googleId: userData.sub
                })
            }
            token = generateTokenSetCookies(emailUser.id, response);
        } else {
            const newUser = await User.create({
                googleId: userData.sub,
                email: userData.email,
                fullName: userData.name,
                username: userData.name.split(" ")[0]
            })
            token = generateTokenSetCookies(newUser.id, response);
            // logger.info(newUser);
        }
        return response.redirect(`${BASE_URL}/auth/google/callback`);
    }
    catch (err) {
        // if (axios.isAxiosError(error)) {
        const error = err as AxiosError;
        logger.error("Google callback error: ", error.response?.data || error.message);
        return response.status(error.response?.status || 500).json({
            details: error.response?.data || error.message,
        });
    }
}

export {
    Signup,
    Login,
    Logout,
    GoogleOauth,
    GoogleCallback
};