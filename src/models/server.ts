import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProductos from '../routes/productos';
import db from '../db/connection';

class Server{
    private app: express.Application;
    private port: string;

    constructor(){
        // console.log(process.env.PORT); // Con esto accedemos al archivo .env (en este caso, estamos accediendo a la variable PORT y la estamos mandando por consola)
        this.app = express();
        this.port = process.env.PORT || '3001+';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('API Working')
        })

        this.app.use('/productos', routesProductos)
    }

    midlewares() {
        // Parseamos el body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try{
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch (error) {
            console.log(error);
            console.log('Error al conectarse a la base de datos');
        }
    }
}

export default Server;