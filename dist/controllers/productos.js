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
exports.editProduct = exports.addProducts = exports.deleteProducts = exports.getProduct = exports.getProducts = void 0;
const productos_1 = __importDefault(require("../models/productos"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProducts = yield productos_1.default.findAll();
        res.json(listProducts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productos_1.default.findByPk(id);
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});
exports.getProduct = getProduct;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield productos_1.default.findByPk(id);
    try {
        yield (product === null || product === void 0 ? void 0 : product.destroy());
        res.json({
            msg: `El producto con id ${id} ha sido eliminado correctamente`
        });
    }
    catch (error) {
        res.status(404).json({
            msg: `No existe el producto con id: ${id}`
        });
    }
});
exports.deleteProducts = deleteProducts;
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield productos_1.default.create(body);
        res.json({
            msg: `El producto fué agregado con éxito`
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding the product' });
    }
});
exports.addProducts = addProducts;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const producto = yield productos_1.default.findByPk(id);
    try {
        if (producto) {
            yield producto.update(body);
            res.status(200).json({
                msg: `El producto fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `El producto no existe`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Hubo un problema al editar el producto`
        });
    }
});
exports.editProduct = editProduct;
