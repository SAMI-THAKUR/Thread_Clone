import User from "../models/user.model.js";
import dotenv from "dotenv";
import createToken from "../utils/helpers/generateJWT.js";

dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    // Find if the user already exists //
    const exist = await User.findOne({
      email: email,
      username: username,
    });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      username,
      password,
    });
    createToken(user._id, res);
    res.status(201).json({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      image: user.profilePic,
    });
  } catch (error) {
    res.status(400).json({ error: "phat gaya bc" });
  }
};

const login = async (req, res) => {
  try {
    const { query, password } = req.body;
    let user = await User.login(query, password); // login is a custom static method in user model //
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    user.password = undefined;
    createToken(user._id, res);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
