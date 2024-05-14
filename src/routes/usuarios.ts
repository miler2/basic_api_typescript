import { Router } from "express";
import { addUser, getUser } from "../controllers/usuarios";

const router = Router();

router.get('/:nombre', getUser);
router.post('/add', addUser);

export default router;