import express from "express";
import { 
    RegisterUser, 
    LoginUser, 
    LogOutUser, 
    GetProfile, 
    UpdateProfile, 
    AssetCreationRequest, 
    GetUserBrandRequests,
     GetAllBrandsForCreators,
     GetUserUnreadNotifications,
     UpdateAllNotificationsStatus,
     GetAllUserNotifications,
     ConfirmAccount,
     ResendUserOtp,
     SendResetPasswordCode,
     ConfirmPasswordResetRequest,
     ResendPasswordResetOtp,
     ResetUserPassword,
     SubscribeToBrand,
     GetAllRewardsForConsumer
} from "../controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/confirm-account', ConfirmAccount);
router.post('/resend-otp', ResendUserOtp);
router.post('/reset-password-confirmation', SendResetPasswordCode);
router.post('/validate-password-otp', ConfirmPasswordResetRequest);
router.post('/resend-password-reset-otp', ResendPasswordResetOtp);
router.put("/update-user-password", ResetUserPassword);
router.post('/logout', LogOutUser);
router.get('/profile', protect, GetProfile);
router.put('/update-profile', protect, upload.single('profileImage'), UpdateProfile);
router.get('/getbrandsforcreators', protect, GetAllBrandsForCreators);
router.post('/creation-request', protect, AssetCreationRequest);
router.get('/check-requests', protect, GetUserBrandRequests);
router.get('/all-notifications', protect, GetAllUserNotifications);
router.get('/unread-notifications', protect, GetUserUnreadNotifications);
router.put('/update-all-notifications', protect, UpdateAllNotificationsStatus)
router.post('/subscribe-to-brand', protect, SubscribeToBrand);
router.get("/get-all-user-rewards", protect, GetAllRewardsForConsumer)

export default router;