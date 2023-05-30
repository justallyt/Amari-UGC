import express from "express";
import { RegisterConsumer, LoginConsumer, LogoutConsumer } from '../controllers/consumerController.js'
const router = express.Router();

router.post('/login', LoginConsumer);
router.post('/register', RegisterConsumer);
router.post("/logout", LogoutConsumer);



export default router;