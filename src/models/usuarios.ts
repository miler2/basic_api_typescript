import db from '../db/connection';
import { DataTypes, Model } from 'sequelize';

interface UserInstance extends Model {
    email: string;
    nombre_usuario: string;
    contrasena: string;
}

const User = db.define<UserInstance>('usuario', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
    },
    contrasena: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default User;