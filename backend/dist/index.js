"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LEVANTAR NUESTRO SERIVICIO Y CONFIGURACIONES GLOBALES
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./config/logger"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const emailService_1 = __importDefault(require("./services/emailService"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
const uploadsPath = node_path_1.default.join(__dirname, "../uploads");
if (!node_fs_1.default.existsSync(uploadsPath)) {
    node_fs_1.default.mkdirSync(uploadsPath, { recursive: true });
}
app.use("/uploads", express_1.default.static(uploadsPath));
app.use((0, morgan_1.default)("dev"));
app.get("/", (__, res) => {
    res.json({ status: true });
});
app.use("/auth", authRouter_1.default);
// http://localhost:3000/products?
app.use("/products", productRoutes_1.default);
// enviar correo electrónico
app.post("/email/send", emailService_1.default);
// endpoint para el 404 - no se encuentra el recurso
app.use((__, res) => {
    res.status(404).json({ success: false, error: "El recurso no se encuentra" });
});
// servidor en escucha
app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`);
    (0, mongodb_1.default)();
});
