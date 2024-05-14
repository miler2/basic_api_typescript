"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUser = void 0;
const usuarios_1 = __importDefault(require("../models/usuarios"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const usuario = yield usuarios_1.default.findByPk(nombre);
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});
exports.getUser = getUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield usuarios_1.default.create(body);
        res.json({
            msg: `El usuario fué agregado con éxito`
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});
exports.addUser = addUser;
