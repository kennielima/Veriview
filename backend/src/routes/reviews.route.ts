import express, { Request, Response } from "express";
import Review from "../models/Review";

const router = express.Router()

router.post("/create-review", async (req: Request, res: Response) => {
    const { title, content, rating } = req.body;
    try {
        if (!title) {
            return res.status(400).json({ message: 'Please input title' })
        }
        const newReview = await Review.create({ title, content, rating });
        console.log(newReview);

        return res.status(200).json({
            title: newReview.title,
            content: newReview.content,
            rating: newReview.rating
        })
    }
    catch (error) {
        console.error("error posting review:", error)
    }
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const allReviews = await Review.findAll();
        console.log(allReviews);
        if (!allReviews || allReviews.length === 0) {
            console.log("can't find reviews")
            return res.status(400).json({ message: 'no reviews found' })
        }

        return res.status(200).json(allReviews)
    }
    catch (error) {
        console.error("error getting reviews:", error)
    }
})
router.get("/reviews/:id", async (req: Request, res: Response) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findOne({ where: {id: reviewId }});
        console.log(review);
        if (!review) {
            console.log("can't find review")
            return res.status(400).json({ message: 'no review found' })
        }

        return res.status(200).json(review)
    }
    catch (error) {
        console.error("error getting reviews:", error)
    }
})

export default router;

