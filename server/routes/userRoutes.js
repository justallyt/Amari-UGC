import express from "express";
import { RegisterUser, LoginUser, LogOutUser, GetProfile, UpdateProfile } from "../controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/logout', LogOutUser);
router.get('/profile', protect, GetProfile);
router.put('/update-profile', protect, upload.single('profileImage'), UpdateProfile)

export default router;