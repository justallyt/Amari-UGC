import express from "express";
import { 
    RegisterUser, 
    LoginUser, 
    LogOutUser, 
    GetProfile, 
    UpdateProfile, 
    AssetCreationRequest, 
    GetAllBrands, 
    GetUserBrandRequests,
     GetAdminNotifications,
     GetAllRequestsToAdmin,
     GetAllCreators,
     GetAllBrandsForCreators,
     ApproveCreatorRequest,
     ApprovedRequests
} from "../controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/logout', LogOutUser);
router.get('/profile', protect, GetProfile);
router.put('/update-profile', protect, upload.single('profileImage'), UpdateProfile);
router.get('/getbrandsforcreators', protect, GetAllBrandsForCreators);
router.post('/creation-request', protect, AssetCreationRequest);
router.get('/check-requests', protect, GetUserBrandRequests);




//Admin Routes
router.get('/get-all-requests', protect, GetAllRequestsToAdmin)
router.get('/getallcreators', protect, GetAllCreators);
router.get('/getallbrands', protect, GetAllBrands);
router.get('/admin-notifications', protect, GetAdminNotifications);
router.put('/approve-creator', protect, ApproveCreatorRequest);
router.get('/approved-requests', protect, ApprovedRequests);



export default router;