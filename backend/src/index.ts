import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/mongodb"
import externalRouter from "./routes/externalRoutes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api", externalRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
