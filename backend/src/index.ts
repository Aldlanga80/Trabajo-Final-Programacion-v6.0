import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import productRouter from "./routes/productRoutes";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);



// Permitir frontend Render y localhost
const allowedOrigins = [
  "https://trabajo-final-programacion-v6-0.onrender.com",
  "http://localhost:5173"
];

// Middleware global para todas las rutas y todos los métodos
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://trabajo-final-programacion-v6-0.onrender.com",
      "http://localhost:5173"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Preflight para todas las rutas
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/users", userRouter);
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/products", productRouter);
app.use("/auth", authRouter);

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión a MongoDB Atlas:", err));

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
