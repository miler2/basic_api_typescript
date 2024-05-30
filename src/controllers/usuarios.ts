import { Request, Response } from "express";
import User from "../models/usuarios";
import jwt from "jsonwebtoken";

const miClave = 'miclave'; // Esta es la clave que usamos para encriptar y desencriptar

// Crea un token a partir de un login correcto
export const token = async (req: Request, res: Response) => {

    const { email, contrasena } = req.body;

    try {
        // Busca un usuario cuyo email coincida con el email introducido
        const user = await User.findOne({ where: { email: email } });

        if (user && user.contrasena === contrasena) {
        const token = jwt.sign({ email: user.email }, miClave, { expiresIn: '1h' }); // Genera un token

        res.json({ token: token });

        } else {
        res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    } catch {
        console.error(Error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}


// Verifica el token dado por la página web
export const verifyToken = async (req: Request, res: Response) => {

    const { token } = req.body;
  
    try {
      // Verificar y decodificar el token
      const decoded = jwt.verify(token, miClave);   // Verifica y guarda en la variable "decoded" el token
      const userId = (decoded as any).email;    // (decoded as any) define que la variable sea de tipo any, y de esa variable extrae ".email" para luego usarlo en el comando de abajo
  
      // Buscar al usuario en la base de datos usando el email
      const user = await User.findByPk(userId);
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
    //   console.error(error);
      res.status(400).json({ message: 'Token inválido o expirado' });
    }   // Este try catch funciona?
}