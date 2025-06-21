import express from "express";
import { authLimiter } from "../middleware/rate-limit";
import { Signup, Login, Logout, GoogleOauth, GoogleCallback } from "../controllers/auth.controller"

const router = express.Router()

router.post('/api/auth/signup', authLimiter, Signup)

router.post('/api/auth/login', authLimiter, Login)

router.post('/api/auth/logout', Logout)

router.get('/api/auth/google', authLimiter, GoogleOauth)

router.get('/api/auth/google/callback', GoogleCallback);

export default router;