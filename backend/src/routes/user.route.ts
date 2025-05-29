import express from "express";
import authenticate from "../middleware/protectRoute";
import { GetCurrentUserData, GetMe, GetUser, GetUserProductRating, GetUserRatedHelpful } from "../controllers/user.controller";

const router = express.Router();


router.get('/me', authenticate, GetMe);


router.get('/getCurrentUserData', authenticate, GetCurrentUserData);

router.get('/users/:userId', GetUser);

router.get("/users/:userId/ratedhelpful", GetUserRatedHelpful)

router.get("/users/:userId/productrating", GetUserProductRating)

export default router;