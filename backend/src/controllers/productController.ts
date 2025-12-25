import { Request, Response } from "express";
import Product, { IProduct } from "../model/ProductModel";

interface IProductBody {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category?: string;
}

const ProductController = {
  createProduct: async (req: Request<{}, {}, IProductBody>, res: Response) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ data: product });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Error al crear el producto" });
    }
  },

  getProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json({ data: products });
    } catch (err: any) {
      res.status(500).json({ error: "Error al traer los productos" });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ data: product });
    } catch (err: any) {
      res.status(500).json({ error: "Error al traer el producto" });
    }
  },

  updateProduct: async (req: Request<{ id: string }, {}, Partial<IProductBody>>, res: Response) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ data: product });
    } catch (err: any) {
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ data: product });
    } catch (err: any) {
      res.status(500).json({ error: "Error al borrar el producto" });
    }
  }
};

export default ProductController;
