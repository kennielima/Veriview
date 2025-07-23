import express from "express";
import authenticate from "../middleware/protectRoute";
import { postLimiter } from "../middleware/rate-limit";
import { AllProducts, GetProduct, RateProduct } from "../controllers/products.controller";

const router = express.Router()

router.get("/api/products", AllProducts)

router.get("/api/products/:id", GetProduct)

router.post("/api/products/:id/rate", authenticate, RateProduct)

export default router;