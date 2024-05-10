import Server from "./models/server";
import dotenv from 'dotenv';

// Configura las variables dadas en el archivo .env
dotenv.config();

const server = new Server();