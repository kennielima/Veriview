import express, { Request, Response } from "express";
import Product from "../models/Product";
import Review from "../models/Review";
import User from "../models/User";
const { Op } = require('sequelize');

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
    try {
        const {
            q,
            category,
            page = 1,
            limit = 10,
            // sortBy = 'createdAt',
            // order = 'DESC',
        } = req.query;

        const offset = (Number(page) - 1) * Number(limit);
        const whereAll = {
            [Op.and]: [
                q && {
                    [Op.or]:
                        [
                            { title: { [Op.iLike]: `%${q}%` } },
                            { brand: { [Op.iLike]: `%${q}%` } },
                            { content: { [Op.iLike]: `%${q}%` } },
                        ]
                }
            ].filter(Boolean)
        }
        const whereBrand = {
            [Op.and]: [
                q && {
                    [Op.or]: {
                        name: { [Op.iLike]: `%${q}%` }
                    },
                }
            ].filter(Boolean)
        }
        // let query = {};
        let where;
        let model;
        let include;

        if (category === "brands") {
            where = whereBrand;
            model = Product;
            include = { model: Review, as: 'reviews' }
        } else {
            where = whereAll;
            model = Review;
            include = [
                {
                    model: Product,
                    as: 'product'
                },
                {
                    model: User,
                    as: 'user',
                }
            ];
        }
        const searchResults = await model.findAndCountAll({
            where: where,
            offset: offset,
            limit: limit as number,
            // order: [order as string, sortBy as string],
            include: include
        })
        if (!searchResults) {
            return res.status(404).json({ message: 'No results found' });
        }
        const { rows, count } = searchResults;

        return res.status(200).json({ data: rows, count: count, page: Number(page) });
    }
    catch (err) {
        console.error('Search Error:', err);
        res.status(500).json({ error: 'Failed to get search results' });
    }
});

export default router;