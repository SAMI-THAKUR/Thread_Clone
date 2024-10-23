import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

// CORS configuration with multiple origins
const allowedOrigins = [
  "https://thread-clone-bjsq.vercel.app",
  "http://localhost:5173", // Add your local development URL
  process.env.FRONTEND_URL, // Add this to your .env file
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// API Routes - make sure they start with /api
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Basic API test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// Connect to the database and start the server
connectDB(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
