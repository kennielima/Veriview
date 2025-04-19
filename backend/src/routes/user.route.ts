import express, { Request, Response } from "express";
import User from "../models/User";
import authenticate from "../middleware/protectRoute";
import Review from "../models/Review";
import UserRating from "../models/UserRating";
import RatedHelpful from "../models/RatedHelpful";
import Product from "../models/Product";

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
                },
                {
                    model: RatedHelpful,
                    as: "ratedhelpful"
                }
            ]
        })
        return res.status(200).json({ userData })
    }
    catch (error) {
        console.error('failed to fetch user data:', error);
    }
});

router.get("/users/:userId/ratedhelpful", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const UserRatedHelpful = await RatedHelpful.findAll({
            include: {
                model: Review,
                as: 'review'
            },
            where: {
                userId
            }
        });
        if (!UserRatedHelpful || UserRatedHelpful.length === 0) {
            console.log("can't find rated helpful")
            return res.status(404).json({ message: 'no rated helpful found' })
        }
        return res.status(200).json(UserRatedHelpful)
    }
    catch (error) {
        console.error("error rating review:", error)
        return res.status(500).json({ message: 'error fetching rated helpful' })
    }
})

router.get("/users/:userId/productrating", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const ProductRating = await UserRating.findAll({
            include: {
                model: Product,
                as: 'product'
            },
            where: {
                userId
            }
        });
        if (!ProductRating || ProductRating.length === 0) {
            console.log("can't find product rating")
            return res.status(404).json({ message: 'no product rating found' })
        }
        return res.status(200).json(ProductRating)
    }
    catch (error) {
        console.error("error rating review:", error)
        return res.status(500).json({ message: 'error fetching product rating' })
    }
})

export default router;