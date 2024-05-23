import express from "express";
import { createPost, getPost, likePost, deletePost, getUsersPosts, getFeed } from "../controllers/postController.js";
const router = express.Router();
import requireAuth from "../middleware/authMiddleware.js";

router.get("/user/:id", getUsersPosts);
router.get("/getfeed", requireAuth, getFeed);
router.get("/:id", getPost);
router.post("/create", requireAuth, createPost);
router.post("/like/:id", requireAuth, likePost);
router.delete("/delete/:id", requireAuth, deletePost);

export default router;
