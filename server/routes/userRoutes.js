import express from "express";
import { RegisterUser, LoginUser, LogOutUser } from "../controllers/usersController.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/logout', LogOutUser);

export default router;