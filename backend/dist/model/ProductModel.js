"use strict";
// DEFINE EL ESQUEMA DE DATOS Y CREA EL MODELO
// EL MODELO:
// 1 - crea la colección en mongodb
// 2 - habilita los métodos de manipulación de data
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "No tiene descripción" },
    stock: { type: Number, default: 0, min: 0 },
    category: { type: String, default: "No tiene categoria" },
    price: { type: Number, default: 0, min: 0 },
    image: { type: String }
}, {
    versionKey: false
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
