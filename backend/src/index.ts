import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.route';
import reviewsRoute from './routes/reviews.route';
import productsRoute from './routes/products.route'
import userRoute from './routes/user.route'
import searchRoute from "./routes/search.route";
import logger from "./utils/logger";
import { BASE_URL, PORT } from "./utils/config";

const app = express();
dotenv.config();

app.set('trust proxy', 1);

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}))
app.use(cookieParser())

app.use('/', authRoute)
app.use('/', reviewsRoute)
app.use('/', productsRoute)
app.use('/', userRoute)
app.use('/', searchRoute)

app.listen(port, () => {
    logger.info(`server running on port ${port}`)
})