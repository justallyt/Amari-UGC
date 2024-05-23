import express from "express";
import { 
    CreateRewardForCreator, 
    DeleteBrandReward, 
    EditBrandReward, 
    GetAllAssetsForBrand, 
    GetAllBrandRewards, 
    GetAllCreatorsForBrands, 
    GetBrandAssetsByCreator
} from "../controllers/Brand/brandController.js";
import { protect } from "../middlewares/authMiddleware.js";

const brand_router = express.Router();

brand_router.get('/get-all-creators', protect, GetAllCreatorsForBrands);
brand_router.get('/get-brand-assets', protect, GetAllAssetsForBrand)
brand_router.get('/get-all-assets-by-a-creator/:id', protect, GetBrandAssetsByCreator)
brand_router.post("/create-reward", protect, CreateRewardForCreator);
brand_router.get("/get-all-brand-rewards", protect, GetAllBrandRewards);
brand_router.delete("/delete-reward", protect, DeleteBrandReward);
brand_router.put("/edit-reward", protect, EditBrandReward);


export default brand_router;