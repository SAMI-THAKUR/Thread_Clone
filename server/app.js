import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path"; // Import path for serving static files
// middleware //
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 4000;

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

// Middleware
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Serve static files from the client
app.use(express.static(path.join(__dirname, "../client/build"))); // Adjust path as needed

// Serve the frontend on any route that doesn't match the API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html")); // Adjust path as needed
});

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to the database and start the server
connectDB(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
