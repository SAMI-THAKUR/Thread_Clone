import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const getProfile = async (req, res) => {
  const { identifier } = req.params; // Assuming the parameter name can be 'username' or 'id'
  try {
    let user;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      // If the identifier is a valid MongoDB ObjectId, search by ID
      user = await User.findById(identifier).select("-password -updatedAt");
    } else {
      // Otherwise, treat it as a username and search by username
      user = await User.findOne({ username: identifier }).select("-password -updatedAt");
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const followUser = async (userId, followerId) => {
  const followedUser = await User.findByIdAndUpdate(userId, { $addToSet: { followers: followerId } }, { new: true })
    .lean()
    .select("-password");
  /**
   * { new: true }: An options object that specifies to return the modified document 
      rather than the original one. Without this option, findByIdAndUpdate would return the original document before the update.
      .lean():
      lean() is a Mongoose method used at the end of a query to indicate that you want to receive 
      plain JavaScript objects instead of Mongoose documents.
   */

  await User.findByIdAndUpdate(followerId, { $addToSet: { following: userId } }, { new: true });

  return followedUser.username;
};

const unfollowUser = async (userId, followerId) => {
  const unfollowedUser = await User.findByIdAndUpdate(userId, { $pull: { followers: followerId } }, { new: true })
    .lean()
    .select("-password");

  await User.findByIdAndUpdate(followerId, { $pull: { following: userId } }, { new: true });

  return unfollowedUser.username;
};

const followUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: currentUserId } = req.user;

    if (id === currentUserId.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    const anotherUser = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!anotherUser || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);
    let message, updatedUser;

    if (isFollowing) {
      updatedUser = await unfollowUser(id, currentUserId);
      message = "User unfollowed successfully";
    } else {
      updatedUser = await followUser(id, currentUserId);
      message = "User followed successfully";
    }

    res.status(200).json({ message, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { _id: currentUserId } = req.user;
  const { name, username, email, profilePic, bio } = req.body;
  const { id } = req.params;
  if (id !== currentUserId.toString()) return res.status(400).json({ error: "You are not authorized to perform this action" });
  try {
    let user = await User.findById(currentUserId);
    if (!user) return res.status(400).json({ error: "Invalid password" });
    if (profilePic) {
      if (profilePic) {
        if (user.profilePic) {
          await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
      }
    }
    await Post.updateMany(
      { "replies.userId": currentUserId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] },
    );
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();
    res.status(200).json({ user: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  const { _id: currentUserId } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    let user = await User.findById(currentUserId);
    if (!user) return res.status(400).json({ error: "Not authorized" });
    const auth = await bcrypt.compare(oldPassword, user.password);
    if (!auth) return res.status(400).json({ error: "Invalid password" });
    user.password = newPassword;
    user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const suggestedUser = async (req, res) => {
  const { _id: currentUserId } = req.user;
  try {
    const followingUser = await User.findById(currentUserId).select("following");
    let users = await User.aggregate([{ $match: { _id: { $ne: currentUserId } } }, { $sample: { size: 5 } }]);
    users = users.filter((user) => followingUser.following.includes(user._id));
    const suggestedUsers = users.slice(0, 5);
    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json({ suggestedUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { followUnfollow, updateUser, changePassword, getProfile, suggestedUser };
