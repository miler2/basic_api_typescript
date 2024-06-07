import { Router } from "express";
import { token, verifyToken, addUser } from "../controllers/usuarios";

const router = Router();


router.post('/', token);
router.post('/verifyToken', verifyToken);

// router.get('/:nombre', getUser);
router.post('/add', addUser);

export default router;