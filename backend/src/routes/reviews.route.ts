import express from "express";
import authenticate from "../middleware/protectRoute";
import { CreateReview, PresignImages, GetAllReviews, GetReview, DeleteReview, RateAsHelpful } from "../controllers/reviews.controller";

const router = express.Router()

router.post("/create-review", authenticate, CreateReview)

router.post("/presign-images", authenticate, PresignImages)

router.get("/reviews", GetAllReviews)

router.get("/reviews/:id", GetReview)

router.delete("/reviews/:id", authenticate, DeleteReview)

router.post("/reviews/:id/ratehelpful", authenticate, RateAsHelpful)

export default router;
