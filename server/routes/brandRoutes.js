import express from "express";
import { GetAllAssetsForBrand, GetAllCreatorsForBrands, GetBrandAssetsByCreator} from "../controllers/Brand/brandController.js";
import { protect } from "../middlewares/authMiddleware.js";

const brand_router = express.Router();

brand_router.get('/get-all-creators', protect, GetAllCreatorsForBrands);
brand_router.get('/get-brand-assets', protect, GetAllAssetsForBrand)
brand_router.get('/get-all-assets-by-a-creator/:id', protect, GetBrandAssetsByCreator)

export default brand_router;