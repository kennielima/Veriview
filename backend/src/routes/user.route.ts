import express from "express";
import authenticate from "../middleware/protectRoute";
import { GetCurrentUserData, GetMe, GetUser, GetUserProductRating, GetUserRatedHelpful } from "../controllers/user.controller";

const router = express.Router();


router.get('/api/me', authenticate, GetMe);


router.get('/api/getCurrentUserData', authenticate, GetCurrentUserData);

router.get('/api/users/:userId', GetUser);

router.get("/api/users/:userId/ratedhelpful", GetUserRatedHelpful)

router.get("/api/users/:userId/productrating", GetUserProductRating)

export default router;