import express, { Request, Response } from "express";
import Review from "../models/Review";
import authenticate from "../middleware/protectRoute";
import User from "../models/User";
import Product from "../models/Product";
import { calcAverageRating } from "../utils/helpers";

const router = express.Router()

router.post("/create-review", authenticate, async (req: Request, res: Response) => {
    const user = req.user;
    try {
        const { title, brand, content, rating } = req.body;
        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to post a review' })
        }

        if (!title || !brand) {
            console.log("can't find title or brand")
            return res.status(400).json({ message: 'Please fill form' })
        }
        let product = await Product.findOne({
            where: {
                name: brand
            },
            include: {
                model: Review,
                as: "reviews"
            }
        })
        if (!product) {
            product = await Product.create({ name: brand, rating: rating });
        }

        const newReview = await Review.create({ title, brand, content, rating, userId: user.id, productId: product?.id });
        const updatedProduct = await Product.findOne({
            where: { id: product.id },
            include: {
                model: Review,
                as: "reviews"
            }
        });

        const averageRating = updatedProduct?.reviews && calcAverageRating(updatedProduct?.reviews)
        await product.update({ rating: averageRating });

        return res.status(200).json({
            title: newReview.title,
            brand: newReview.brand,
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
router.delete("/reviews/:id", authenticate, async (req: Request, res: Response) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findOne({
            where: { id: reviewId },
            include: {
                model: Product,
                as: "product"
            }
        });
        if (!review) {
            console.log("can't find review")
            return res.status(400).json({ message: 'no review found' })
        }
        await review.destroy();

        const product = await Product.findOne({
            where: { id: review?.productId },
            include: {
                model: Review,
                as: "reviews"
            }
        })
        if (product) {
            if (!product.reviews || product?.reviews?.length === 0) {
                await product?.destroy()
            } else {
                const averageRating = product?.reviews && calcAverageRating(product?.reviews);
                await product.update({ rating: averageRating }, {
                    where: { id: review?.productId }
                });
            }
        }

        return res.status(500).json({ message: 'successfully deleted' })
    }
    catch (error) {
        console.error("error deleting review:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})
router.get("/", async (req: Request, res: Response) => {
    try {
        const allReviews = await Review.findAll({
            include: {
                model: User,
                as: 'user'
            },
            order: [
                ['createdAt', 'DESC'],
            ]
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
        if (!review) {
            console.log("can't find review")
            return res.status(400).json({ message: 'no review found' })
        }
        return res.status(200).json({ review })
    }
    catch (error) {
        console.error("error getting review:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.delete("/reviews/:id", authenticate, async (req: Request, res: Response) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findOne({
            where: { id: reviewId },
            include: {
                model: Product,
                as: "product"
            }
        });
        if (!review) {
            console.log("can't find review")
            return res.status(400).json({ message: 'no review found' })
        }
        await review.destroy();

        const product = await Product.findOne({
            where: { id: review?.productId },
            include: {
                model: Review,
                as: "reviews"
            }
        })
        if (product) {
            if (!product.reviews || product?.reviews?.length === 0) {
                await product?.destroy()
            } else {
                const averageRating = product?.reviews && calcAverageRating(product?.reviews);
                await product.update({ rating: averageRating }, {
                    where: { id: review?.productId }
                });
            }
        }

        return res.status(500).json({ message: 'successfully deleted' })
    }
    catch (error) {
        console.error("error deleting review:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})
export default router;

