import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import productRouter from "./routes/productRoutes";
import authRouter from "./routes/authRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tienda";

// Crear carpeta uploads si no existe
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Frontend Vite
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/products", productRouter);
app.use("/auth", authRouter);

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión a MongoDB:", err));

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
