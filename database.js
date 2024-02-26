import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    console.log("veritabanı bağlantısı başarılı");
  } catch (error) {
    console.log(error);
  }
};
