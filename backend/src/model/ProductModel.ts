import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String, default: "General" }
}, { timestamps: true });

export default mongoose.model<IProduct>("Product", productSchema);
