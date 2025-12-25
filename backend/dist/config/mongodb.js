"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI); // 👈 DEBUG
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB Atlas");
    }
    catch (error) {
        console.error("Error DB:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
