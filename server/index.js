import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import videoRoutes from "./routes/videoRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import cors from "cors"

//Initialize dotenv for usage
dotenv.config();

//Create port for server
const port = process.env.SERVER_PORT || 8000;

//Initialize express for use
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const corsConfig = {
    credentials: true,
    origin: `${process.env.CLIENT_APP_URL}`,
};
app.use(cors(corsConfig))
/* Routes */
app.use("/api/user", userRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/admin', adminRoutes);

//Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening at port ${port}`));

//MongoDB Connection
connectToDatabase();