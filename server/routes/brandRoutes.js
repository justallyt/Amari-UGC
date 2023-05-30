import express from "express";
import { RegisterBrand } from "../controllers/brandController.js";

const router = express.Router();

router.post('/register', RegisterBrand);

export default router