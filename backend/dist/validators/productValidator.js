"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const productSchemaValidator = zod_1.z.object({
    name: zod_1.z.string().min(4),
    description: zod_1.z.string().min(10),
    price: zod_1.z.number().min(10, "El valor debe ser mayor a 10"),
    category: zod_1.z.string().min(2),
    stock: zod_1.z.number().positive(),
    image: zod_1.z.string().default("No contiene imagen")
});
exports.createProductSchema = productSchemaValidator;
exports.updatedProductSchema = productSchemaValidator.partial();
