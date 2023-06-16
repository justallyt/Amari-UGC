import express from "express";
import { RegisterUser, LoginUser, LogOutUser, GetProfile } from "../controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/logout', LogOutUser);
router.get('/profile', protect, GetProfile);

export default router;