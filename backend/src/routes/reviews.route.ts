import express, { Request, Response } from "express";
import Review from "../models/Review";
import authenticate from "../middleware/protectRoute";
import User from "../models/User";

const router = express.Router()

router.post("/create-review", authenticate, async (req: Request, res: Response) => {
    const user = req.user;
    console.log("request user:", req.user);
    try {
        const { title, content, rating } = req.body;
        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to post a review' })
        }

        if (!title) {
            console.log("can't find title")
            return res.status(400).json({ message: 'Please input title' })
        }
        const newReview = await Review.create({ title, content, rating, userId: user.id });
        return res.status(200).json({
            title: newReview.title,
            content: newReview.content,
            rating: newReview.rating,
            userId: user.id
        })
    }
    catch (error) {
        console.error("error posting review:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const allReviews = await Review.findAll({
            include: {
                model: User,
                as: 'user'
            }
        });
        if (!allReviews || allReviews.length === 0) {
            console.log("can't find reviews")
            return res.status(404).json({ message: 'no reviews found' })
        }

        return res.status(200).json(allReviews)
    }
    catch (error) {
        console.error("error getting reviews:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.get("/reviews/:id", async (req: Request, res: Response) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findOne({ where: { id: reviewId } });
        const user = await User.findOne({ where: { id: reviewId } });

        if (!review) {
            console.log("can't find review")
            return res.status(400).json({ message: 'no review found' })
        }

        return res.status(200).json({review, user})
    }
    catch (error) {
        console.error("error getting reviews:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

export default router;

