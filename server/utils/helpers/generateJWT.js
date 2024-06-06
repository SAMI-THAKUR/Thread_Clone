import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("auth", token, {
    httpOnly: true, // cookie cannot be accessed by client side javascript
    secure: true, // Set to true in production
    sameSite: "none",
    maxAge: 3 * 24 * 60 * 60 * 1000, // cookie is sent only to the same site as the one that originated it
  });
};

export default createToken;
