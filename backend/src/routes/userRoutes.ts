import { Router } from "express";
import { registerUser, getUserList, removeUserFromList } from "../controllers/userController";

const router = Router();

router.post("/register", registerUser);       // Registrar usuario
router.get("/list", getUserList);             // Obtener lista de usuarios en memoria
router.delete("/remove/:email", removeUserFromList); // Eliminar usuario de la lista

export default router;

