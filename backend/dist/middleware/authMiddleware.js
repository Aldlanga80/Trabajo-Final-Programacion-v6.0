"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const SECRET_KEY = process.env.JWT_SECRET;
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ succes: false, error: "El token es requerido" });
    }
    const token = header.split(" ")[1];
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, SECRET_KEY);
        req.user = payload;
        next();
    }
    catch (e) {
        const error = e;
        res.status(401).json({ succes: false, error: error.message });
    }
};
exports.default = authMiddleware;
