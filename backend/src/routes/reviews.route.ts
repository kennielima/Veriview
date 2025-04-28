import express, { Request, Response } from "express";
import Review from "../models/Review";
import authenticate from "../middleware/protectRoute";
import User from "../models/User";
import Product from "../models/Product";
import { calcAverageRating } from "../utils/calcAverageRating";
import UserRating from "../models/UserRating";
import RatedHelpful from "../models/RatedHelpful";
import { Order } from "sequelize";

const router = express.Router()

router.post("/create-review", authenticate, async (req: Request, res: Response) => {
    const user = req.user;
    try {
        const { title, brand, content, rating, anonymous } = req.body;
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
        let isNewProduct = false;

        if (!product) {
            isNewProduct = true;

            product = await Product.create({
                name: brand,
                averageRating: Number(rating),
                ratingsCount: 1
            });
        }

        const newReview = await Review.create({
            title,
            brand,
            content,
            rating: Number(rating),
            userId: user.id,
            productId: product?.id,
            anonymous
        });

        const updatedProduct = await Product.findOne({ //both newly created product and already existing product
            where: { id: product.id },
            include: [
                {
                    model: Review,
                    as: "reviews"
                },
                {
                    model: UserRating,
                    as: "rating"
                }
            ]
        });

        if (updatedProduct && updatedProduct?.reviews) {
            const newRatingsCount = isNewProduct ? 1 : product?.ratingsCount + 1
            const averageRating = calcAverageRating(updatedProduct, newRatingsCount)

            await product.update({
                averageRating: Number(averageRating),
                ratingsCount: newRatingsCount
            });
        }

        return res.status(200).json({
            title: newReview.title,
            brand: newReview.brand,
            content: newReview.content,
            rating: newReview.rating,
            userId: user.id,
            anonymous: newReview.anonymous
        })
    }

    catch (error) {
        console.error("error posting review:", error)
        return res.status(500).json({ message: 'error posting reviews' })
    }
})

router.get("/reviews", async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort?.toString();
    // const order = req.query.order?.toString() || 'DESC';
    const order: Order = [];

    if (sort === "newest") {
        order.push(["createdAt", "DESC"])
    } else if (sort === "oldest") {
        order.push(["createdAt", "ASC"])
    } else if (sort === "highest") {
        order.push(["rating", "DESC"])
    } else if (sort === "lowest") {
        order.push(["rating", "ASC"])
    } else if (!sort) {
        order.push(["createdAt", "DESC"])
    }
    console.log('req query:', req.query)

    try {
        const allReviews = await Review.findAndCountAll({
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: RatedHelpful,
                    as: "ratedhelpful"
                }
            ],
            limit,
            offset,
            order: order
        });

        const { rows, count } = allReviews;

        if (!rows || count === 0) {
            console.log("can't find reviews")
            return res.status(404).json({ message: 'no reviews found' })
        }
        return res.status(200).json({
            data: rows,
            totalReviews: count,
            currentPage: Number(page),
            totalPages: Math.ceil(count / limit),
            hasNextPage: page < Math.ceil(count / limit),
            hasPrevPage: page > 1
        })
    }
    catch (error) {
        console.error("error getting reviews:", error)
        return res.status(500).json({ message: 'error getting reviews' })
    }
})

router.get("/reviews/:id", async (req: Request, res: Response) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findOne({
            where: {
                id: reviewId
            },
            include: [
                {
                    model: User,
                    as: "user"
                },
                {
                    model: RatedHelpful,
                    as: "ratedhelpful"
                }
            ]
        });
        if (!review) {
            console.log("can't find review")
            return res.status(400).json({ message: 'no review found' })
        }
        return res.status(200).json({ review })
    }
    catch (error) {
        console.error("error getting review:", error)
        return res.status(500).json({ message: 'error getting review' })
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
            include: [
                {
                    model: Review,
                    as: "reviews"
                },
                {
                    model: UserRating,
                    as: "rating"
                }
            ]
        })
        if (product) {
            if (!product.reviews || product?.reviews?.length === 0) {
                await product?.destroy();
            } else {
                const newRatingsCount = product?.ratingsCount - 1
                const averageRating = product?.reviews && calcAverageRating(product, newRatingsCount);
                await product.update({
                    averageRating: averageRating,
                    ratingsCount: newRatingsCount
                }, {
                    where: { id: review?.productId }
                });
            }
        }

        return res.status(200).json({ message: 'successfully deleted' })
    }
    catch (error) {
        console.error("error deleting review:", error)
        return res.status(500).json({ message: 'error deleting review' })
    }
})

router.post("/reviews/:id/ratehelpful", authenticate, async (req: Request, res: Response) => {
    const { ratedHelpful } = req.body;
    const reviewId = req.params.id;
    const user = req.user;

    try {
        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to rate a review' })
        }

        const existingRatedHelpful = await RatedHelpful.findOne({
            where: {
                reviewId: reviewId,
                userId: user?.id
            }
        })
        let rateValue = ratedHelpful === true ? 1 : 0;
        console.log("rateValue", rateValue, ratedHelpful);

        if (!existingRatedHelpful) {
            const newv = await RatedHelpful.create({
                helpful: rateValue,
                reviewId: reviewId,
                userId: user?.id
            })
            console.log("helpfulv", newv)
        } else {
            if (rateValue === 1) {
                await existingRatedHelpful.update({ helpful: rateValue })
            } else {
                await existingRatedHelpful.destroy();
            }
        }

        return res.status(200).json({ message: 'review successfully rated' })
    }
    catch (error) {
        console.error("error rating review:", error)
        return res.status(500).json({ message: 'error rating review' })
    }
})

export default router;

