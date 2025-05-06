import express, { Request, Response } from "express";
import User from "../models/User";
import authenticate from "../middleware/protectRoute";
import Review from "../models/Review";
import UserRating from "../models/UserRating";
import RatedHelpful from "../models/RatedHelpful";
import Product from "../models/Product";
import logger from "../utils/logger";

const router = express.Router();


router.get('/me', authenticate, async (req: Request, res: Response) => {
    try {
        return res.status(200).json({ loggedIn: true, user: req.user });
    }
    catch (error) {
        logger.error('failed to get user:', error);
    }
});


router.get('/getCurrentUserData', authenticate, async (req: Request, res: Response) => {
    const user = req.user;
    try {
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist" })
        }

        const userData = await User.findByPk(user?.id, {
            include: [
                {
                    model: Review,
                    as: "reviews",

                    include: [{
                        model: RatedHelpful,
                        as: 'ratedhelpful',
                        attributes: ['id']
                    }]

                },
                {
                    model: UserRating,
                    as: "userratings",

                    include: [{
                        model: Product,
                        as: 'product',
                        include: [{
                            model: Review,
                            as: 'reviews',
                            attributes: ['id']
                        }]
                    }]

                },
                {
                    model: RatedHelpful,
                    as: "ratedhelpful",

                    include: [{
                        model: Review,
                        as: 'review',
                        include: [{
                            model: RatedHelpful,
                            as: 'ratedhelpful',
                            attributes: ['id']
                        }]
                    }]

                }
            ]
        })
        return res.status(200).json({ userData })
    }
    catch (error) {
        logger.error('failed to fetch user data:', error);
    }
});

router.get('/users/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        if (!userId) {
            return res.status(401).json({ message: "User doesn't exist" })
        }
        const userData = await User.findByPk(userId, {
            include: [
                {
                    model: Review,
                    as: "reviews",
                    where: {
                        anonymous: false
                    },

                    include: [{
                        model: RatedHelpful,
                        as: 'ratedhelpful',
                        attributes: ['id']
                    }]

                },
                {
                    model: UserRating,
                    as: "userratings",

                    include: [{
                        model: Product,
                        as: 'product',
                        include: [{
                            model: Review,
                            as: 'reviews',
                            attributes: ['id']
                        }]
                    }]
                },
                {
                    model: RatedHelpful,
                    as: "ratedhelpful",

                    include: [{
                        model: Review,
                        as: 'review',
                        include: [{
                            model: RatedHelpful,
                            as: 'ratedhelpful',
                            attributes: ['id']
                        }]
                    }]
                }
            ]
        })
        return res.status(200).json({ userData })
    }
    catch (error) {
        logger.error('failed to fetch user data:', error);
    }
});

router.get("/users/:userId/ratedhelpful", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const UserRatedHelpful = await RatedHelpful.findAll({
            include: {
                model: Review,
                as: 'review',
                include: [{
                    model: RatedHelpful,
                    as: 'ratedhelpful',
                    attributes: ['id']
                }]
            },
            where: {
                userId
            }
        });
        if (!UserRatedHelpful || UserRatedHelpful.length === 0) {
            logger.warn("can't find rated helpful")
            return res.status(404).json({ message: 'no rated helpful found' })
        }
        return res.status(200).json(UserRatedHelpful)
    }
    catch (error) {
        logger.error("error rating review:", error)
        return res.status(500).json({ message: 'error fetching rated helpful' })
    }
})

router.get("/users/:userId/productrating", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const ProductRating = await UserRating.findAll({
            include: {
                model: Product,
                as: 'product',
                include: [{
                    model: Review,
                    as: 'reviews',
                    attributes: ['id']
                }],
            },
            where: {
                userId
            }
        });
        if (!ProductRating || ProductRating.length === 0) {
            logger.warn("can't find product rating")
            return res.status(404).json({ message: 'no product rating found' })
        }
        return res.status(200).json(ProductRating)
    }
    catch (error) {
        logger.error("error rating review:", error)
        return res.status(500).json({ message: 'error fetching product rating' })
    }
})

export default router;