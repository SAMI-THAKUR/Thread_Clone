import express from "express";
const router = express.Router();
import { followUnfollow, updateUser, changePassword, getProfile, suggestedUser, Auth } from "../controllers/userController.js";
import requireAuth from "../middleware/authMiddleware.js";

router.post("/followUnfollow/:id", requireAuth, followUnfollow);
router.put("/update/:id", requireAuth, updateUser);
router.patch("/changePassword", requireAuth, changePassword);
router.get("/profile/:identifier", getProfile);
router.get("/suggested", requireAuth, suggestedUser);
router.get("/auth", Auth);

export default router;
