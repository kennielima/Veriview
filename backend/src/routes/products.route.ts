import express from "express";
import authenticate from "../middleware/protectRoute";
import { postLimiter } from "../middleware/rate-limit";
import { AllProducts, GetProduct, RateProduct } from "../controllers/products.controller";

const router = express.Router()

router.get("/products", AllProducts)

router.get("/products/:id", GetProduct)

router.post("/products/:id/rate", postLimiter, authenticate, RateProduct)

export default router;