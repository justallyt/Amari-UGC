import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


//Initialize dotenv for usage
dotenv.config();

//Create port for server
const port = process.env.SERVER_PORT || 8000;

//Initialize express for use
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Yay Server is up and running"));

app.listen(port, () => console.log(`Server listening at port ${port}`));