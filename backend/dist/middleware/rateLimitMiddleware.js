"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos,
    max: 5,
    handler: (req, res, next, options) => {
        res.status(429).json({
            success: false,
            error: `Limite alcanzado ${options.max} solicitudes cada ${options.windowMs / 1000 / 60} minutos.`
        });
    }
});
exports.default = limiter;
