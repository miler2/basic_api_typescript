import { Sequelize } from "sequelize";

const sequelize = new Sequelize('productos_tutorial', 'miler', '', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false // Esto nos permite deshabilitar la visualización de las consultas a la base de datos desde la consola
});

export default sequelize; 