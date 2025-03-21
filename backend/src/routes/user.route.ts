import express, { Request, Response } from "express";
import User from "../models/User";
import authenticate from "../middleware/protectRoute";
import Review from "../models/Review";
import UserRating from "../models/UserRating";

const router = express.Router();


router.get('/me', authenticate, async (req: Request, res: Response) => {
    try {
        return res.status(200).json({ loggedIn: true, user: req.user });
    }
    catch (error) {
        console.error('failed to get user:', error);
    }
});


router.get('/getuser', authenticate, async (req: Request, res: Response) => {
    const user = req.user;
    try {
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist" })
        }

        const userData = await User.findOne({
            where: { id: user?.id },
            include: [
                {
                    model: Review,
                    as: "reviews"
                },
                {
                    model: UserRating,
                    as: "userratings"
                }]
        })
        return res.status(200).json({ userData })
    }
    catch (error) {
        console.error('failed to fetch user data:', error);
    }
});

export default router;