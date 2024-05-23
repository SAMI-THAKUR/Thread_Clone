import mongoose from "mongoose";

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
