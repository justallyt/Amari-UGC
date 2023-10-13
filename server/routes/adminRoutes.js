import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { upload } from "../utils/multer.js"
import { UpdateAdminProfile } from "../controllers/Admin/adminController.js"

const router = express.Router()

router.put('/update-admin-profile', protect, upload.single('profileImage'), UpdateAdminProfile)

export default router