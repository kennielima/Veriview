import express from "express";
import { Signup, Login, Logout, GoogleOauth, GoogleCallback } from "../controllers/auth.controller"

const router = express.Router()

router.post('/api/auth/signup', Signup)

router.post('/api/auth/login', Login)

router.post('/api/auth/logout', Logout)

router.get('/api/auth/google', GoogleOauth)

router.get('/api/auth/google/callback', GoogleCallback);

export default router;