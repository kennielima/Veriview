import express, { Request, Response } from "express";
import Product from "../models/Product";
import Review from "../models/Review";
import User from "../models/User";

const router = express.Router()


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
        // const reviews = await Review.findAll({
        //     where: {
        //         productId: product.id
        //     },
        //     include: {
        //         model: User,
        //         as: "user"
        //     }
        // })
        return res.status(200).json(product);
    }
    catch (error) {
        console.error('failed to get products:', error);
    }
})


export default router;