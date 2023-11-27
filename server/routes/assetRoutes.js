import express from 'express';
import { BookmarkAsset, CreateAsset, LikeAsset, getUserAssets } from '../controllers/assetsController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { asset_upload } from '../utils/multer.js';

const asset_router = express.Router();

asset_router.post('/create', protect, asset_upload.single('asset'),CreateAsset);
asset_router.get('/user-assets', protect, getUserAssets);
asset_router.put('/like-asset', protect, LikeAsset);
asset_router.put('/bookmark-asset', protect, BookmarkAsset)

export default asset_router;