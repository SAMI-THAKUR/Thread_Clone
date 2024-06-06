import User from "../models/user.model.js";
import dotenv from "dotenv";
import createToken from "../utils/helpers/generateJWT.js";

dotenv.config();

import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find if the user already exists
    const exist = await User.findOne({
      email: email,
      username: username,
    });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    // Generate a token
    createToken(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Unable to sign up" });
  }
};

const login = async (req, res) => {
  try {
    const { query, password } = req.body;

    let user = await User.login(query, password);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.password = undefined;
    createToken(user._id, res);
    res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error.message); // Log the error for debugging
    res.status(400).json({ error: error.message }); // Send a more specific error message
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("auth", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

export { signup, login, logoutUser };
