import { Router } from "express";
import { getProducts, addProducts, deleteProducts, editProduct, getProduct } from "../controllers/productos";

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/add', addProducts);
router.delete('/delete/:id', deleteProducts);
router.put('/:id', editProduct);

export default router;