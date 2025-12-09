"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const USER = process.env.EMAIL_USER;
const PASS = process.env.EMAIL_PASS;
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: USER,
        pass: PASS
    }
});
exports.default = transporter;
