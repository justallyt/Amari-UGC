import express from 'express';
import { CreateVideo, getUserAssets } from '../controllers/videoController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { video_upload } from '../utils/multer.js';
const video_router = express.Router();

video_router.post('/create', protect, video_upload.single('userVideo'),CreateVideo);
video_router.get('/user-assets', protect, getUserAssets);

export default video_router;