import express, { Request, Response } from "express";
import Product from "../models/Product";
import Review from "../models/Review";
import { calcAverageRating } from "../utils/calcAverageRating";
import UserRating from "../models/UserRating";
import authenticate from "../middleware/protectRoute";
import RatedHelpful from "../models/RatedHelpful";

const router = express.Router()

router.get("/products", async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.findAll({
            include: {
                model: Review,
                as: "reviews"
            },
            order: [
                ['createdAt', 'DESC'],
            ]
        })
        if (!allProducts || allProducts.length === 0) {
            console.log("can't find reviews")
            return res.status(404).json({ message: "no products found" })
        }
        return res.status(200).json(allProducts);
    }
    catch (error) {
        console.error('failed to get products:', error);
        return res.status(500).json({ message: 'failed to rate product' })
    }
})

router.get("/products/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findOne({
            where: {
                id: productId
            },
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
                    as: "rating"
                },
            ]
        })
        if (!product) {
            console.log("can't find product")
            return res.status(404).json({ message: "no product found" })
        }

        return res.status(200).json(product);
    }
    catch (error) {
        console.error('failed to get product:', error);
        return res.status(500).json({ message: 'failed to get product' })
    }
})

router.post("/products/:id/rate", authenticate, async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { rating } = req.body;
    const user = req.user;

    try {
        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to post a review' })
        }
        const product = await Product.findByPk(productId, {
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

        if (!rating) return res.status(400).json({ error: "Rating is missing" });
        if (!product) return res.status(404).json({ message: "no product found" });

        const existingRating = await UserRating.findOne({
            where: {
                productId: productId,
                userId: user.id
            }
        });

        if (existingRating) {
            const oldRating = existingRating?.productRating;

            const averageRating = product?.reviews && calcAverageRating(product, product.ratingsCount, Number(rating), oldRating);

            await product.update({ averageRating });

            await existingRating.update({ productRating: Number(rating) })
        } else {
            const averageRating = product?.reviews && calcAverageRating(product, product.ratingsCount + 1, Number(rating));

            await product.update({
                averageRating,
                ratingsCount: product.ratingsCount + 1
            });

            await UserRating.create({
                productRating: Number(rating),
                productId: productId,
                userId: user.id
            })
        }
        return res.status(200).json(product);
    }
    catch (error) {
        console.error('failed to rate product:', error);
    }
})

export default router;