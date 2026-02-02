import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

let MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}`);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error in DB connection", err);
  }
};
