import express from "express";
import authenticate from "../middleware/protectRoute";
import { CreateReview, PresignImages, GetAllReviews, GetReview, DeleteReview, RateAsHelpful } from "../controllers/reviews.controller";

const router = express.Router()

router.post("/api/create-review", authenticate, CreateReview)

router.post("/api/presign-images", authenticate, PresignImages)

router.get("/api/reviews", GetAllReviews)

router.get("/api/reviews/:id", GetReview)

router.delete("/api/reviews/:id", authenticate, DeleteReview)

router.post("/api/reviews/:id/ratehelpful", authenticate, RateAsHelpful)

export default router;
