import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db.js";
import consumerRoutes from "./routes/consumerRoutes.js"
import brandRoutes from "./routes/brandRoutes.js"
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

app.use(cors())
/* Routes */
app.use('/api/consumer', consumerRoutes);
app.use('/api/brand', brandRoutes);

//Error Handling
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Yay Server is up and running"));

app.listen(port, () => console.log(`Server listening at port ${port}`));

//MongoDB Connection
connectToDatabase();