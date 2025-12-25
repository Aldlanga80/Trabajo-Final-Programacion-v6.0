import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/mongodb"
import productRouter from "./routes/productRoutes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/products", productRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
