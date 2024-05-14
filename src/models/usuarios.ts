import db from '../db/connection';
import { DataTypes } from 'sequelize';

const User = db.define('usuario', {
    nombre_usuario: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    contrasena: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default User;