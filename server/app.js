import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";
// middleware //
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "https://thread-clone-bjsq.vercel.app", // Specify the exact origin
  }),
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// middleware //
app.use((req, res, next) => {
  const origin = req.header("Origin");
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  next();
});
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use("/auth", cors({ credentials: true, origin: "*" }), authRoutes);
app.use("/user", cors({ credentials: true, origin: "*" }), userRoutes);
app.use("/post", cors({ credentials: true, origin: "*" }), postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
