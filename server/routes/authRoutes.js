import express from "express";
import { signup, login, logoutUser } from "../controllers/authController.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logoutUser);
// router.route("/login").post(login_post);

export default router;
