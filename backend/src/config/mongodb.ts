import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // 👈 DEBUG
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error DB:", error);
    process.exit(1);
  }
};
