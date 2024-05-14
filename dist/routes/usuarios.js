"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/:nombre', usuarios_1.getUser);
router.post('/add', usuarios_1.addUser);
exports.default = router;
