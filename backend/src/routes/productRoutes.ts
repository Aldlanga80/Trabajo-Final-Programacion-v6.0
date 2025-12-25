import { Router } from "express";
import ProductController from "../controllers/productController";

const router = Router();

// Obtener todos los productos
router.get("/", ProductController.getProducts);

// Obtener un producto por ID
router.get("/:id", ProductController.getProductById);

// Crear un producto
router.post("/", ProductController.createProduct);

// Borrar un producto
router.delete("/:id", ProductController.deleteProduct);

export default router;
