import { Request, Response } from "express";
import { fetchExternalData } from "../services/externalApiService";

export const getExternal = async (req: Request, res: Response) => {
  try {
    console.log("➡️ Llamando API externa...");
    const data = await fetchExternalData();
    console.log("✅ Datos recibidos");
    res.json(data);
  } catch (error) {
    console.error("❌ ERROR API EXTERNA:", error);
    res.status(500).json({ error: "Error al consultar API externa" });
  }
};
