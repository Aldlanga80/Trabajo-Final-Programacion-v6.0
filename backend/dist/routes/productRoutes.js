"use strict";
// EL ROUTER VALIDA METODOS Y RUTAS PROPIAS DE LA ENTIDAD
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// GET http://localhost:3000/product
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware"));
const productRouter = (0, express_1.Router)();

productRouter.get("/", productController_1.default.getAllProducts);
productRouter.get("/:id", productController_1.default.getProduct);
productRouter.post("/", authMiddleware_1.default, uploadMiddleware_1.default.single("image"), productController_1.default.addProduct);
productRouter.patch("/:id", authMiddleware_1.default, productController_1.default.updateProduct);
productRouter.delete("/:id", authMiddleware_1.default, productController_1.default.deleteProduct);
exports.default = productRouter;
