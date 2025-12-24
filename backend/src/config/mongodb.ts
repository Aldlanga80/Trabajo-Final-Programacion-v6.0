import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI as string

const client = new MongoClient(uri)

export const connectDB = async () => {
  try {
    await client.connect()
    console.log("✅ MongoDB conectado")
  } catch (error) {
    console.error("❌ Error MongoDB", error)
    process.exit(1)
  }
}

export const db = client.db()
