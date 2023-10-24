import express from "express";
import { GetAllCreatorsForBrands } from "../controllers/Brand/brandController.js";
import { protect } from "../middlewares/authMiddleware.js";

const brand_router = express.Router();

brand_router.get('/get-all-creators', protect, GetAllCreatorsForBrands);

export default brand_router;