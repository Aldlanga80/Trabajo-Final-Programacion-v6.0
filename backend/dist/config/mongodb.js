"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    const URI_DB = process.env.URI_DB;
    try {
        await (0, mongoose_1.connect)(URI_DB);
        console.log("✅ Conectado a Mongo DB con éxito!");
    }
    catch (e) {
        console.log("❌ Error al conectarse a Mongo DB");
        process.exit(1);
    }
};
exports.default = connectDB;
