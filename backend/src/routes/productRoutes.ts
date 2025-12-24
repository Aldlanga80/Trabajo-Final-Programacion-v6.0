import { Router } from "express"
import ProductController from "../controllers/productController"

const router = Router()

router.get("/products", ProductController.getAll)

export default router
