import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";

const requireAuth = (req, res, next) => {
  const token = req.cookies.auth;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ error: "Unauthorized acces" });
      } else {
        const user = await User.findById(decodedToken.id).select("-password");
        if (!user) {
          res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default requireAuth;
