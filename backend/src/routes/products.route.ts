import express, { Request, Response } from "express";
import Product from "../models/Product";
import Review from "../models/Review";
import { calcAverageRating } from "../utils/helpers";
import UserRating from "../models/UserRating";
import authenticate from "../middleware/protectRoute";

const router = express.Router()

router.post("/products/:id/rate", authenticate, async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { rating } = req.body;
    const user = req.user;

    try {
        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to post a review' })
        }
        const product = await Product.findOne({
            where: {
                id: productId
            },
        });

        if (!rating) {
            return res.status(400).json({ error: "Rating is missing" });
        }

        if (!product) {
            console.log("can't find product")
            return res.status(404).json({ message: "no product found" })
        }

        //if user has updated the rating before, we need to update the average rating
        //product model shd have list of everyone who rated
        const existingRating = await UserRating.findOne({
            where: {
                id: productId,
                userId: user.id
            }
        });

        if (existingRating) {
            const averageRating = product?.reviews && calcAverageRating(product?.reviews, product.ratingsCount, Number(rating));

            await product.update({
                averageRating: averageRating,
            },
                {
                    where: {
                        id: productId,
                        userId: user.id
                    }
                }
            );

            await existingRating.update({
                productRating: Number(rating),
                productId: productId,
                userId: user.id
            })
        }
        const averageRating = product?.reviews && calcAverageRating(product?.reviews, product.ratingsCount, Number(rating));

        await product.update({
            averageRating: averageRating,
            ratingsCount: product.ratingsCount + 1
        },
            {
                where: {
                    id: productId,
                    userId: user.id
                }
            }
        );

        await UserRating.create({
            productRating: Number(rating),
            productId: productId,
            userId: user.id
        })
        return res.status(200).json(product);
    }
    catch (error) {
        console.error('failed to rate product:', error);
    }
})


router.get("/products", async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.findAll({
            include: {
                model: Review,
                as: "reviews"
            }
        })
        if (!allProducts || allProducts.length === 0) {
            console.log("can't find reviews")
            return res.status(404).json({ message: "no products found" })
        }
        return res.status(200).json(allProducts);
    }
    catch (error) {
        console.error('failed to get products:', error);
    }
})

router.get("/products/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findOne({
            where: {
                id: productId
            },
            include: {
                model: Review,
                as: "reviews"
            }
        })
        if (!product) {
            console.log("can't find product")
            return res.status(404).json({ message: "no product found" })
        }

        return res.status(200).json(product);
    }
    catch (error) {
        console.error('failed to get product:', error);
    }
})

export default router;