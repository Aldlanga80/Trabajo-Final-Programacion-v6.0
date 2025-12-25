import { Request, Response } from "express";
import { fetchExternalData } from "../services/externalApiService";

export const getExternal = async (req: Request, res: Response) => {
  try {
    console.log("ENTRÓ A /api/external-data"); // 👈 ACÁ

    const data = await fetchExternalData();
    res.json(data);

  } catch (error) {
    console.error("ERROR API EXTERNA:", error);
    res.status(500).json({ error: "Error al consultar API externa" });
  }
};
