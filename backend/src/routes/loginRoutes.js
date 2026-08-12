import express from "express";
// import {searchUser, signUp, sendOtp, changePassword, verifyUserOtp} from "../controllers/authController.js";
import {searchUser, signUp, sendOtp, verifyOtp, changePassword} from "../controllers/authController.js";
import { authorizeToChangePassword } from "../middleware/authorizeMiddleware.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", searchUser);
router.post("/signup", signUp);
router.post("/ForgotPassword", sendOtp);
router.post("/verification", verifyOtp);
router.post("/changePassword", authenticate, authorizeToChangePassword('verified'), changePassword);

export default router