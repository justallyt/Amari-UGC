import express from 'express';
//import { CreateAsset, getUserAssets } from '../controllers/oldassetController.js';
import { CreateAsset } from '../controllers/assetsController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { asset_upload } from '../utils/multer.js';

const asset_router = express.Router();

asset_router.post('/create', protect, asset_upload.single('assetChunk'),CreateAsset);
//asset_router.get('/user-assets', protect, getUserAssets);

export default asset_router;