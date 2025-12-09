"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authRouter = (0, express_1.Router)();
// http://localhost:3000/auth/register
authRouter.post("/register", authController_1.default.register);
// http://localhost:3000/auth/login
authRouter.post("/login", authController_1.default.login);
exports.default = authRouter;
