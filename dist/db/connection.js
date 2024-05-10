"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('productos_tutorial', 'miler', '', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false // Esto nos permite deshabilitar la visualización de las consultas a la base de datos desde la consola
});
exports.default = sequelize;
