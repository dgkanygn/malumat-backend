import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    console.log("db connection successful");
  } catch (error) {
    console.log(error);
  }
};
