const express = require('express')
const mariadb = require('mariadb')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
})

app.use(bodyParser.json())

const PUERTO = 3000

const pool = mariadb.createPool({
    host:'localhost',
    database:'database_prueba',
    user:'miler',
    password:'',
    port:3306
})

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto: ${PUERTO}`)
})

pool.getConnection(error => {
    if (err) throw err;

    console.log('Conexión exitosa a la base de datos');

    // Release the connection back to the pool after usage
    connection.release();
})

app.get('/ping-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const ping = await connection.ping();
        connection.release();
        res.json({ message: ping ? 'Database connection successful' : 'Database connection failed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error connecting to database' });
    }
})

app.get('/', (req, res) => {
    res.send('API')
})

app.get('/usuarios', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query('SELECT * FROM users');
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });

        // Esta línea me saca de la conexión incluso si ha habido un error
        if (connection) {
            connection.release();
        }
    }
});