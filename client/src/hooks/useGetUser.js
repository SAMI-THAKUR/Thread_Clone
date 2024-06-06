import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import axios from "axios";

const updateUser = async (req, res) => {
  const { _id: currentUserId } = req.user;
  let { name, username, email, profilePic, bio, password } = req.body;
  const { id } = req.params;

  if (id !== currentUserId.toString()) {
    return res.status(400).json({ error: "You are not authorized to perform this action" });
  }

  try {
    let user = await User.findById(currentUserId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (profilePic) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
        console.log("Image uploaded:", profilePic);
      } catch (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Error uploading image" });
      }
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    if (password) {
      user.password = password;
      console.log("Password updated");
    } else {
      console.log("Password not provided");
    }

    await user.save();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
};

export default useGetUserProfile;
