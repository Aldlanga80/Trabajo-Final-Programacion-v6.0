import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/mongodb"
import productRouter from "./routes/productRoutes"
import authRouter from "./routes/authRouter"
import mongoose from "mongoose"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: "http://localhost:4000" }));
app.use(express.json())

connectDB()

app.use("/auth", authRouter)
app.use("/products", productRouter)


mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error DB:", err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
