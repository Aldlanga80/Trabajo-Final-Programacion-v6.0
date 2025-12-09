"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailConfig_1 = __importDefault(require("../config/emailConfig"));
const emailTemplate_1 = __importDefault(require("../templates/emailTemplate"));
const emailService = async (req, res) => {
    const { subject, email: emailUser, message } = req.body;
    if (!subject || !emailUser || !message) {
        return res.status(400).json({ success: false, message: "Data invalida" });
    }
    try {
        const info = await emailConfig_1.default.sendMail({
            from: `Mensaje de la tienda: ${emailUser}`,
            to: process.env.EMAIL_USER,
            subject,
            html: (0, emailTemplate_1.default)(emailUser, message)
        });
        res.json({ succes: true, message: "Correo fue enviado exitosamente", info });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.default = emailService;
