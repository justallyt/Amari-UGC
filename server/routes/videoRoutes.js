import express from 'express';
import { CreateVideo } from '../controllers/videoController.js';
import { protect } from '../middlewares/authMiddleware.js';

const video_router = express.Router();

video_router.post('/create', protect, CreateVideo);

export default video_router;