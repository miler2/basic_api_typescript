import { Request, Response } from "express";
import Producto from "../models/productos";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const listProducts = await Producto.findAll()
        res.json(listProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Producto.findByPk(id);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}

export const deleteProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    try {
        await product?.destroy();
        res.json({
            msg: `El producto con id ${id} ha sido eliminado correctamente`
        })
    } catch (error) {
        res.status(404).json({
            msg: `No existe el producto con id: ${id}`
        })
    }
}

export const addProducts = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Producto.create(body);
        res.json({
            msg: `El producto fué agregado con éxito`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding the product' });
    }
}

export const editProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    
    try {
        if (producto){
            await producto.update(body);
            res.json({
                msg: `El producto fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `El producto no existe`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: `Hubo un problema al editar el producto`
        })
    }
}