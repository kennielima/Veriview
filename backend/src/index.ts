import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from './routes/auth.route';

const app = express();
dotenv.config();

app.use(express.json())
app.use(cors())

app.use('/auth', authRoute)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})