"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
class ProductController {
}
_a = ProductController;
ProductController.getAll = async (_req, res) => {
    try {
        const products = await ProductModel_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
};
exports.default = ProductController;
