import express, { Request, Response } from "express";
import Review from "../models/Review";
import authenticate from "../middleware/protectRoute";
import User from "../models/User";
import Product from "../models/Product";
import { calcAverageRating } from "../utils/calcAverageRating";
import UserRating from "../models/UserRating";
import RatedHelpful from "../models/RatedHelpful";
import { Order } from "sequelize";
import logger from "../utils/logger";
import axios, { AxiosError } from "axios";
import { CLOUDFLARE_ACCESS_KEY_ID, CLOUDFLARE_API_TOKEN, CLOUDFLARE_R2_BUCKET, CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_PUBLIC_DOMAIN, CLOUDFLARE_SECRET_ACCESS_KEY } from "../utils/config";
import multer from "multer";
import path from "path";
import fs from "fs";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';

const upload = multer({ dest: 'uploads/' })

const S3 = new S3Client({
    region: "auto",
    endpoint: CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: `${CLOUDFLARE_ACCESS_KEY_ID}`,
        secretAccessKey: `${CLOUDFLARE_SECRET_ACCESS_KEY}`,
    },
});

const CreateReview = async (req: Request, res: Response) => {
    const user = req.user;
    try {
        const { title, brand, content, rating, anonymous, images } = req.body;

        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to post a review' })
        }

        if (!title || !brand) {
            logger.info("can't find title or brand")
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

        let existingProductReview = await Review.findOne({
            where: {
                productId: product.id,
                userId: user.id
            }
        })
        if (existingProductReview) {
            return res.status(500).json({ message: 'You cannot review a product twice' })
        }

        const newReview = await Review.create({
            title,
            brand,
            content,
            rating: Number(rating),
            userId: user.id,
            productId: product?.id,
            anonymous: anonymous as boolean,
            images
        });

        const existingRating = await UserRating.findOne({
            where: {
                productId: product.id,
                userId: user.id
            }
        });
        //drop existing rating to re-tally aggregate correctly
        if (existingRating) {
            await existingRating.destroy()
        }

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

        if (updatedProduct && updatedProduct?.reviews) { //get updated product with new review
            let newRatingsCount;
            if (isNewProduct) {
                newRatingsCount = 1
            } else {
                if (existingRating) {
                    newRatingsCount = product?.ratingsCount
                } else {
                    newRatingsCount = product?.ratingsCount + 1
                }
            }

            const averageRating = calcAverageRating(updatedProduct, newRatingsCount)
            // averageRating = existingRating ? calcAverageRating(updatedProduct, newRatingsCount, 0, existingRating?.productRating) :
            // will also retally aggregate by adding the new review rating and sending old rating to be removed

            // console.log(existingRating?.productRating, averageRating, newRatingsCount, rating, updatedProduct, product);

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
            anonymous: newReview.anonymous,
            images: newReview.images
        })
    }

    catch (err) {
        if (axios.isAxiosError(err)) {
            const error = err as AxiosError;
            logger.error("Post Review error:", error.response?.data || error.message);
            return res.status(error.response?.status || 500).json({
                details: error.response?.data || error.message,
            });
        } else {
            logger.error("error posting review:", err)
            return res.status(500).json({ message: 'error posting reviews' })
        }
    }
}

const PresignImages = async (req: Request, res: Response) => {
    const user = req.user;

    try {
        const { fileName } = req.query;

        if (!user) {
            return res.status(404).json({ message: 'You must be logged in to post a review' })
        }

        const key = `${user.id}/${uuidv4()}-${fileName}`;
        const signedURL = await getSignedUrl(
            S3,
            new PutObjectCommand({
                Bucket: `${CLOUDFLARE_R2_BUCKET}`,
                Key: key,
            }),
            { expiresIn: 10000 },
        );
        const publicUrl = `${CLOUDFLARE_R2_PUBLIC_DOMAIN}/${key}`;
        return res.json({ url: signedURL, publicUrl });
    }

    catch (err) {
        if (axios.isAxiosError(err)) {
            const error = err as AxiosError;
            logger.error("Post Review error:", error.response?.data || error.message);
            return res.status(error.response?.status || 500).json({
                details: error.response?.data || error.message,
            });
        } else {
            logger.error("error posting review:", err)
            return res.status(500).json({ message: 'error posting reviews' })
        }
    }
}

const GetAllReviews = async (req: Request, res: Response) => {
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
            logger.info("can't find reviews")
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
        logger.error("error getting reviews:", error)
        return res.status(500).json({ message: 'error getting reviews' })
    }
}

const GetReview = async (req: Request, res: Response) => {
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
            logger.warn("can't find review")
            return res.status(400).json({ message: 'no review found' })
        }
        return res.status(200).json({ review })
    }
    catch (error) {
        logger.error("error getting review:", error)
        return res.status(500).json({ message: 'error getting review' })
    }
}

const DeleteReview = async (req: Request, res: Response) => {
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
            logger.warn("can't find review")
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
                // subtract deleted rate from count
                const newRatingsCount = product?.ratingsCount - 1
                //recalculate av rating with updated product
                const averageRating = product?.reviews && calcAverageRating(product, newRatingsCount);
                await product.update({
                    averageRating: averageRating,
                    ratingsCount: newRatingsCount
                }, {
                    where: { id: review?.productId }
                });
            }
        }
        if (review.images?.length) {
            for (const image of review.images as string[]) {
                const key = image.replace(`${CLOUDFLARE_R2_PUBLIC_DOMAIN}/`, '');
                const deleteCommand = new DeleteObjectCommand({
                    Bucket: CLOUDFLARE_R2_BUCKET,
                    Key: key,
                });
                await S3.send(deleteCommand);
            }
        }
        return res.status(200).json({ message: 'successfully deleted' })
    }
    catch (error) {
        logger.error("error deleting review:", error)
        return res.status(500).json({ message: 'error deleting review' })
    }
}

const RateAsHelpful = async (req: Request, res: Response) => {
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

        if (!existingRatedHelpful) {
            const newv = await RatedHelpful.create({
                helpful: rateValue,
                reviewId: reviewId,
                userId: user?.id
            })
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
        logger.error("error rating review:", error)
        return res.status(500).json({ message: 'error rating review' })
    }
}

export {
    CreateReview,
    PresignImages,
    GetAllReviews,
    GetReview,
    DeleteReview,
    RateAsHelpful
};
