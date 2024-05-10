import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Producto = db.define('producto', {
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DOUBLE
    },
    stock: {
        type: DataTypes.NUMBER
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default Producto;