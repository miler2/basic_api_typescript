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
    // database:'database_prueba',
    database: 'productos_tutorial',
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

/* app.get('/ping-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const ping = await connection.ping();
        connection.release();
        res.json({ message: ping ? 'Database connection successful' : 'Database connection failed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error connecting to database' });
    }
}) */

app.get('/', (req, res) => {
    res.send('API')
})

/* app.get('/usuarios', async (req, res) => {
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

app.get('/nombre_usuario/:nombre', async (req, res) => {
    const { nombre } = req.params
    
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query(`SELECT contrasena FROM users WHERE nombre="${nombre}"`);
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


app.get('/find_user/:nombre/:contrasena', async (req, res) => {
    const { nombre } = req.params
    const { contrasena } = req.params
    
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query(`SELECT nombre FROM users WHERE nombre='${nombre}' AND contrasena='${contrasena}'`);
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
}); */



// Video tutorial
app.get('/productos', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query(`SELECT * FROM productos`);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products' });

        // Esta línea me saca de la conexión incluso si ha habido un error
        if (this.connection) {
            this.connection.release();
        }
    }
});

app.get('/productos/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query(`SELECT * FROM productos where id=${id}`);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products' });

        // Esta línea me saca de la conexión incluso si ha habido un error
        if (this.connection) {
            this.connection.release();
        }
    }
});

app.post('/productos/add', async (req, res) => {
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.description,
        precio: req.body.precio,
        stock: req.body.stock
    }

    const connection = await pool.getConnection();
    
    try {
        const query = `INSERT INTO productos values(NULL, "${producto.nombre}", "${producto.descripcion}", "${producto.precio}", "${producto.stock}")`
        connection.query(query, producto, (error, resultado) => {
            if (error) return console.log(error.message)
        })
        res.json({message: `El producto se añadió correctamente`})

        //  
        connection.release();
    } catch (err) {
        console.error(err);
        // res.status(404).json({ message: `Error deleting product with id: ${id}`  });
        res.status(500).json({ message: `Error adding product`  });

        // Esta línea me saca de la conexión incluso si ha habido un error
        if (this.connection) {
            this.connection.release();
        }
    }
})

app.delete('/productos/delete/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const connection = await pool.getConnection();
        await connection.query(`DELETE FROM productos WHERE id=${id}`);
        connection.release();
        res.status(200).json({message: `Se ha eliminado correctamente el producto con id: ${id}`})
        // res.json(rows);
    } catch (err) {
        console.error(err);
        // res.status(404).json({ message: `Error deleting product with id: ${id}`  });
        res.status(500).json({ message: `Error deleting product with id: ${id}`  });

        // Esta línea me saca de la conexión incluso si ha habido un error
        if (this.connection) {
            this.connection.release();
        }
    }
});