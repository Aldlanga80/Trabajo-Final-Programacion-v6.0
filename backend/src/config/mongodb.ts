import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Atlas conectado");
  } catch (error) {
    console.error("Error DB:", error);
    process.exit(1);
  }
};

export default connectDB;
