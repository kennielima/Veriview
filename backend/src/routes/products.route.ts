import express, { Request, Response } from "express";
import Product from "../models/Product";
import Review from "../models/Review";
import { calcAverageRating } from "../utils/calcAverageRating";
import UserRating from "../models/UserRating";
import authenticate from "../middleware/protectRoute";
import RatedHelpful from "../models/RatedHelpful";
import { Order, Sequelize } from "sequelize";
import logger from "../utils/logger";

const router = express.Router()

router.get("/products", async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort?.toString();
    const order: Order = [];

    if (sort === "recent") {
        order.push(["updatedAt", "DESC"])
    } else if (sort === "desc") {
        order.push(["name", "DESC"])
    } else if (sort === "asc") {
        order.push(["name", "ASC"])
    } else if (sort === "highest") {
        order.push(["averageRating", "DESC"])
    } else if (sort === "lowest") {
        order.push(["averageRating", "ASC"])
    } else if (sort === "reviewcount-desc") {
        // order.push([Sequelize.fn('COUNT', Sequelize.col('reviews.id')), 'DESC'])
        // order.push([Sequelize.literal("reviewCount"), "DESC"])
        order.push(["ratingsCount", "DESC"])
    } else if (sort === "reviewcount-asc") {
        // order.push([Sequelize.fn('COUNT', Sequelize.col('reviews.id')), 'ASC'])
        order.push(["ratingsCount", "ASC"])
    } else if (!sort) {
        order.push(["updatedAt", "DESC"])
    }

    try {
        const allProducts = await Product.findAndCountAll({
            include: {
                model: Review,
                as: "reviews",
                attributes: ["id"],
                separate: true,
            },
            // attributes: {
            //     include: [
            //         [Sequelize.fn('COUNT', Sequelize.col('reviews.id')), "reviewCount"],
            //     ]
            // },
            // group: ["Product.id"],
            // subQuery: false,
            limit,
            offset,
            order: order,

        })

        const { rows, count } = allProducts;
        if (!rows || count === 0) {
            logger.warn("can't find products")
            return res.status(404).json({ message: 'no products found' })
        }

        return res.status(200).json({
            data: rows,
            totalProducts: count,
            currentPage: Number(page),
            totalPages: Math.ceil(count / limit),
            hasNextPage: page < Math.ceil(count / limit),
            hasPrevPage: page > 1
        })
    }
    catch (error) {
        logger.error('failed to get products:', error);
        return res.status(500).json({ message: 'failed to get products' })
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
                    }],
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    separate: true
                },
                {
                    model: UserRating,
                    as: "rating"
                },
            ]
        })
        if (!product) {
            logger.warn("can't find product")
            return res.status(404).json({ message: "no product found" })
        }

        return res.status(200).json(product);
    }
    catch (error) {
        logger.error('failed to get product:', error);
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
        const review = await Review.findOne({
            where: {
                productId: product?.id,
                userId: user?.id
            }
        })

        if (review) return res.status(400).json({ error: "Cannot re-rate a reviewed brand" });
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
            //if previously rated, calc av with old rating to be subtracted and new rating to be added
            const averageRating = product?.reviews && calcAverageRating(product, product.ratingsCount, Number(rating), oldRating);

            await product.update({ averageRating });

            await existingRating.update({ productRating: Number(rating) })
        } else {
            //if not previously rated, calc av with new rating to be added, updated product rate count
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
        logger.error('failed to rate product:', error);
    }
})

export default router;