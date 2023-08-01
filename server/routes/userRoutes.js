import express from "express";
import { RegisterUser, LoginUser, LogOutUser, GetProfile, UpdateProfile, AssetCreationRequest, GetAllBrands, GetUserBrandRequests, SendNotificationsCount } from "../controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multer.js";
import { requestEvent } from '../utils/sseConn.js'
const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/logout', LogOutUser);
router.get('/profile', protect, GetProfile);
router.put('/update-profile', protect, upload.single('profileImage'), UpdateProfile);
router.get('/getbrands', protect, GetAllBrands);
router.post('/creation-request', protect, AssetCreationRequest);
router.get('/check-requests', protect, GetUserBrandRequests);
router.get('/requests', requestEvent)
router.get('/reqcount', SendNotificationsCount)
export default router;