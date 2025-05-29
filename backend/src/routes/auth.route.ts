import express from "express";
import { authLimiter } from "../middleware/rate-limit";
import { Signup, Login, Logout, GoogleOauth, GoogleCallback } from "../controllers/auth.controller"

const router = express.Router()

router.post('/signup', authLimiter, Signup)

router.post('/login', authLimiter, Login)

router.post('/logout', Logout)

router.get('/google', authLimiter, GoogleOauth)

router.get('/google/callback', GoogleCallback);

export default router;