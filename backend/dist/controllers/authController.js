"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET;
class AuthController {
}
_a = AuthController;
// http://localhost:3000/auth/register
// method: POST
// body: {"email": "gabi@gmail.com", "password": pepe123}
AuthController.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Datos invalidos" });
        }
        const user = await UserModel_1.default.findOne({ email });
        if (user) {
            return res.status(409).json({ success: false, error: "El usuario ya existe en la base de datos." });
        }
        // crear el hash de la contraseña
        const hash = await bcryptjs_1.default.hash(password, 10);
        const newUser = new UserModel_1.default({ email, password: hash });
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    }
    catch (e) {
        const error = e;
        switch (error.name) {
            case "MongoServerError":
                return res.status(409).json({ success: false, error: "Usuario ya existente en nuestra base de datos" });
        }
    }
};
AuthController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Datos invalidos" });
        }
        const user = await UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, error: "No autorizado" });
        }
        // validar la contraseña
        const isValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, error: "No autorizado" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ success: true, token });
    }
    catch (e) {
        const error = e;
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.default = AuthController;
