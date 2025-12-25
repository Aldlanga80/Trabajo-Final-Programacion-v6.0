import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb";
import productRouter from "./routes/productRoutes";
import authRouter from "./routes/authRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({ origin: "*" })); // Ajusta tu origen si tienes frontend en otra URL
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use("/auth", authRouter);
app.use("/products", productRouter);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
