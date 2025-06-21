import express from "express";
import Search from "../controllers/search.controller";

const router = express.Router();

router.get("/api/search", Search);

export default router;