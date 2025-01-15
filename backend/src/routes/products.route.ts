import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router()


router.get("/products", async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.findAll()
        console.log(allProducts);
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

export default router;
// TODO: ON CREATE POST, USERS SHD BE ABLE TO POST ANONYMOUSLY
// TODO: ON CREATING POST, Products should be populated with brand name