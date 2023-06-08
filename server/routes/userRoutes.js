import express from "express";
import { RegisterUser, LoginUser } from "../controllers/usersController.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);

export default router;