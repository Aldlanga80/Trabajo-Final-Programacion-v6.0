"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/logger.ts
const morgan_1 = __importDefault(require("morgan"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// Crear carpeta /logs si no existe
const logsDir = node_path_1.default.join(__dirname, "../../logs");
if (!node_fs_1.default.existsSync(logsDir)) {
    node_fs_1.default.mkdirSync(logsDir);
}
// Crear stream de escritura diaria
const getLogStream = () => {
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const logFile = node_path_1.default.join(logsDir, `access-${date}.log`);
    return node_fs_1.default.createWriteStream(logFile, { flags: "a" }); // modo append
};
// Formato combinado (IP, método, ruta, status, tiempo)
const logger = (0, morgan_1.default)(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream: getLogStream() });
exports.default = logger;
