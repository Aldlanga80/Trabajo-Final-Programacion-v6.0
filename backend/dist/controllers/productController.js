"use strict";
// FUNCIONES QUE SANITIZAN DATOS DE ENTRADA Y RESPONDEN AL CLIENTE
// LA REQUEST Y EL RESPONSE SIEMPRE ESTARÁN SOLO EN LOS CONTROLLERS
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const mongoose_1 = require("mongoose");
const productValidator_1 = require("../validators/productValidator");
class ProductController {
}
_a = ProductController;
ProductController.getAllProducts = async (req, res) => {
    try {
        const { name, stock, category, minPrice, maxPrice } = req.query;
        console.log(req.query);
        const filter = {};
        if (name)
            filter.name = new RegExp(String(name), "i");
        if (stock)
            filter.stock = Number(stock);
        if (category)
            filter.category = new RegExp(String(category), "i");
        if (minPrice || maxPrice) {
            filter.price = {};
            // maxPrice -> si tengo precio máximo quiero un objeto con un precio menor
            if (minPrice)
                filter.price.$gte = minPrice;
            // minPrice -> si tengo un precio mínimo quiero un objeto con un precio mas grande.
            if (maxPrice)
                filter.price.$lte = maxPrice;
        }
        const products = await ProductModel_1.default.find(filter);
        res.json({ success: true, data: products });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ success: false, error: error.message });
    }
};
ProductController.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "ID Inválido" });
        }
        const product = await ProductModel_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, error: "Producto no encontrado" });
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ success: false, error: error.message });
    }
};
ProductController.addProduct = async (req, res) => {
    try {
        const { body, file } = req;
        const { name, description, price, category, stock } = body;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        const dataToValidate = {
            name,
            description,
            category,
            stock: +stock,
            price: +price,
            image: file?.path
        };
        const validator = productValidator_1.createProductSchema.safeParse(dataToValidate);
        if (!validator.success) {
            return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
        }
        const newProduct = new ProductModel_1.default(validator.data);
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ success: false, error: error.message });
    }
};
ProductController.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        if (!mongoose_1.Types.ObjectId.isValid(id))
            res.status(400).json({ succes: false, error: "ID Inválido" });
        const validator = productValidator_1.updatedProductSchema.safeParse(body);
        if (!validator.success) {
            return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
        }
        const updatedProduct = await ProductModel_1.default.findByIdAndUpdate(id, validator.data, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "Producto no encontrado" });
        }
        res.json({ success: true, data: updatedProduct });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ success: false, error: error.message });
    }
};
ProductController.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID Inválido" });
        }
        const deletedProduct = await ProductModel_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Producto no encontrado" });
        }
        res.json({ success: true, data: deletedProduct });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ error: error.message });
    }
};
exports.default = ProductController;
