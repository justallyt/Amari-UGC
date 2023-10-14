import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { upload } from "../utils/multer.js"
import { 
    GetAdminProfile,
    UpdateAdminProfile,
    GetAllRequestsToAdmin,
    GetAllCreators,
    GetAllBrands,
    GetAdminNotifications,
    ApproveCreatorRequest,
    ApprovedRequests
} from "../controllers/Admin/adminController.js"

const router = express.Router()

router.get('/get-admin-profile', protect, GetAdminProfile);
router.get('/get-all-requests', protect, GetAllRequestsToAdmin)
router.get('/getallcreators', protect, GetAllCreators);
router.get('/getallbrands', protect, GetAllBrands);
router.get('/admin-notifications', protect, GetAdminNotifications);
router.put('/approve-creator', protect, ApproveCreatorRequest);
router.get('/approved-requests', protect, ApprovedRequests);
router.put('/update-admin-profile', protect, upload.single('profileImage'), UpdateAdminProfile)

export default router