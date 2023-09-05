import mongoose from "mongoose";
import { DB_URI } from "./config";

const connectDB = async () => {
  try {
    const uri = DB_URI;

    await mongoose.connect(uri || "", {});
    console.log("> db connected");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
