import express from "express";
import { createPost, getPost, likePost, commentPost, deletePost, deleteComment, getUsersPosts, getFeed } from "../controllers/postController.js";
const router = express.Router();
import requireAuth from "../middleware/authMiddleware.js";

router.get("/user/:id", getUsersPosts);
router.get("/getfeed", requireAuth, getFeed);
router.get("/:id", getPost);
router.post("/create", requireAuth, createPost);
router.post("/like/:id", requireAuth, likePost);
router.post("/comment/:id", requireAuth, commentPost);
router.delete("/delete/:id", requireAuth, deletePost);
router.delete("/delete/:id/:commentId", requireAuth, deleteComment);

export default router;
