import { Request, Response } from "express";
import User from "../models/usuarios";

export const getUser = async (req: Request, res: Response) => {
    const { nombre } = req.params;

    try {
        const usuario = await User.findByPk(nombre);
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}

export const addUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await User.create(body);
        res.json({
            msg: `El usuario fué agregado con éxito`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}