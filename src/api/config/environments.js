// =======================
// === IMPORTACIONES ===
// =======================
import dotenv from "dotenv";
import fs from "fs";
import { join } from "../utils/index.js"; // Usamos join desde tu utils

// ---- cargamos las variables de entorno desde el archivo .env ---- //
dotenv.config();

const caCert = fs.readFileSync(join("src", "certs", "ca.pem"));
export default{
    port :process.env.PORT || 3000,
    database:{
        host : process.env.DB_HOST,
        name : process.env.DB_NAME,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        port : process.env.DB_PORT || 3306,
        ssl:{
            rejectUnauthorized: false
        }
    }
};
