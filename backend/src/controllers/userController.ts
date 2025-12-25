import { Request, Response } from "express";
import User, { IUser } from "../model/UserModel"

// Lista en memoria (temporal)
let userList: IUser[] = [];

// Registrar usuario
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Usuario ya existe" });

    const newUser = new User({ email, password });
    await newUser.save();

    // Añadir a lista en memoria
    userList.push(newUser);

    return res.status(201).json({ message: "Usuario registrado", user: newUser, userList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// Obtener lista de usuarios registrados (memoria)
export const getUserList = (req: Request, res: Response) => {
  res.json(userList);
};

// Eliminar usuario de la lista en memoria
export const removeUserFromList = (req: Request, res: Response) => {
  const { email } = req.params;
  const index = userList.findIndex(user => user.email === email);

  if (index === -1) return res.status(404).json({ message: "Usuario no encontrado en lista" });

  userList.splice(index, 1);
  res.json({ message: "Usuario eliminado de la lista", userList });
};
