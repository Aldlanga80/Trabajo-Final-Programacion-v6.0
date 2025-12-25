import { Router } from "express";
import ProductController from "../controllers/productController";
import authMiddleware from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = Router();

// GET /products
router.get("/", ProductController.getProducts);

// GET /products/:id
router.get("/:id", ProductController.getProductById);

// POST /products (solo autenticados)
router.post("/", authMiddleware, upload.single("image"), ProductController.createProduct);


// PUT /products/:id (solo autenticados)
router.put("/:id", authMiddleware, ProductController.updateProduct);

// DELETE /products/:id (solo autenticados)
router.delete("/:id", authMiddleware, ProductController.deleteProduct);

export default router;
