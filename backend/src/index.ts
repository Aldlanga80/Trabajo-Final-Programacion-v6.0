import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/productRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tienda";

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Cambia al puerto de tu frontend
app.use(express.json());

// Rutas
app.use("/products", productRouter);

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión a MongoDB:", err));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
