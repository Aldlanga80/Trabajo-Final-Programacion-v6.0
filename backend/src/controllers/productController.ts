import { Request, Response } from "express"
import Product from "../model/ProductModel"

export default class ProductController {
  static getAll = async (_req: Request, res: Response) => {
    try {
      const products = await Product.find()
      res.json(products)
    } catch (error) {
      res.status(500).json({ message: "Error del servidor" })
    }
  }
}
