import express from 'express';
import { CreateVideo } from '../controllers/videoController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { video_upload } from '../utils/multer.js';
const video_router = express.Router();

video_router.post('/create', protect, video_upload.single('user-video'),CreateVideo);

export default video_router;