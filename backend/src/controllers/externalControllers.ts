import { Request, Response } from "express";
import { fetchExternalData } from "../services/externalApiService";

export const getExternal = async (req: Request, res: Response) => {
  try {
    const data = await fetchExternalData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar API externa" });
  }
};
