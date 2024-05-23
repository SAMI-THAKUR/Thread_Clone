import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  let { body, image } = req.body;
  const postedBy = req.user._id;
  if (!postedBy || (!body && !image)) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const user = User.findById(postedBy);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (image) {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    } catch (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Error uploading image" });
    }
  }
  try {
    const post = await Post.create({ body, image, postedBy });
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    let post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    // Find the post by its id
    const post = await Post.findById(id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    const isLiked = post.likes.includes(userId);
    // console.log(userId.toString(), isLiked, post.likes);
    let message = "";
    // Toggle the like status
    if (isLiked) {
      // If user has already liked, remove their id from likes array
      post.likes = post.likes.remove(userId);
      console.log(post.likes);
      message = "Post unliked successfully";
    } else {
      // If user hasn't liked, add their id to likes array
      post.likes.push(userId);
      message = "Post liked successfully";
    }

    // Save the updated post to the database
    await post.save();

    // Send success response with updated post data
    res.status(200).json({ message, post });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};

const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    let { _id: userId, username, profilePic } = req.user;
    userId = userId.toString();
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const commemnt = {
      text,
      userId,
      username,
      profilePic,
    };
    post.comments.push(commemnt);
    await post.save();
    res.status(200).json({ message: "Comment added successfully", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (commentId !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    post.comments = post.comments.filter((comment) => comment._id.toString() !== commentId);
    await post.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ postedBy: id });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeed = async (req, res) => {
  console.log("Fetching feed...");
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });
    res.status(200).json(feedPosts);
  } catch (err) {
    console.error("Error fetching feed:", err);
    res.status(500).json({ error: "Error fetching feed" });
  }
};

export { createPost, getPost, likePost, commentPost, deletePost, deleteComment, getUsersPosts, getFeed };
