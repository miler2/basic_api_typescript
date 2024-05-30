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
exports.verifyToken = exports.token = void 0;
const usuarios_1 = __importDefault(require("../models/usuarios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const miClave = 'miclave'; // Esta es la clave que usamos para encriptar y desencriptar
// Crea un token a partir de un login correcto
const token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.body;
    try {
        // Busca un usuario cuyo email coincida con el email introducido
        const user = yield usuarios_1.default.findOne({ where: { email: email } });
        if (user && user.contrasena === contrasena) {
            const token = jsonwebtoken_1.default.sign({ email: user.email }, miClave, { expiresIn: '1h' }); // Genera un token
            res.json({ token: token });
        }
        else {
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    }
    catch (_a) {
        console.error(Error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
exports.token = token;
// Verifica el token dado por la página web
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        // Verificar y decodificar el token
        const decoded = jsonwebtoken_1.default.verify(token, miClave); // Verifica y guarda en la variable "decoded" el token
        const userId = decoded.email; // (decoded as any) define que la variable sea de tipo any, y de esa variable extrae ".email" para luego usarlo en el comando de abajo
        // Buscar al usuario en la base de datos usando el email
        const user = yield usuarios_1.default.findByPk(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        //   console.error(error);
        res.status(400).json({ message: 'Token inválido o expirado' });
    } // Este try catch funciona?
});
exports.verifyToken = verifyToken;
