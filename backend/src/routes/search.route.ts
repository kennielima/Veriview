import express, { Request, Response } from "express";
import Product from "../models/Product";
import Review from "../models/Review";
import User from "../models/User";
import RatedHelpful from "../models/RatedHelpful";
import { Sequelize } from "sequelize";
import logger from "../utils/logger";
const { Op } = require('sequelize');

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
    try {
        const {
            q,
            category,
            page = 1,
            // limit = 10,
            // sortBy = 'createdAt',
            // order = 'DESC',
        } = req.query;

        // const offset = (Number(page) - 1) * Number(limit);
        const whereAll = {
            [Op.and]: [
                q && {
                    [Op.or]:
                        [
                            { title: { [Op.iLike]: `${q}%` } },
                            { brand: { [Op.iLike]: `${q}%` } },
                            { content: { [Op.iLike]: `${q}%` } },
                        ]
                }
            ].filter(Boolean)
        }
        const whereBrand = {
            [Op.and]: [
                q && {
                    [Op.or]: {
                        name: { [Op.iLike]: `${q}%` }
                    },
                }
            ].filter(Boolean)
        }
        let query: Record<string, any> = {};
        let model;
        if (category === "brands") {
            model = Product;
            query.where = whereBrand;
            query.include = {
                model: Review,
                as: 'reviews',
                attributes: ["id"],
                separate: true
            }
            query.order = [["updatedAt", "DESC"]]
        } else {
            model = Review;
            query.where = whereAll;
            query.include = [
                {
                    model: Product,
                    as: 'product',
                    attributes: ["name"],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ["username"]
                },
                {
                    model: RatedHelpful,
                    as: 'ratedhelpful',
                    attributes: ['id']
                }
            ];
            query.order = [["createdAt", "DESC"]]
        }
        const searchResults = await model.findAndCountAll({
            ...query
        })
        if (!searchResults) {
            return res.status(404).json({ message: 'No results found' });
        }
        const { rows, count } = searchResults;
        logger.info(searchResults)

        return res.status(200).json({ data: rows, count: count, page: Number(page) });
    }
    catch (err) {
        logger.error('Search Error:', err);
        res.status(500).json({ error: 'Failed to get search results' });
    }
});

export default router;