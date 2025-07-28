// ================================
// === CONEXION A BASE DE DATOS ===
// ================================

// ----- Importamos el modulo mysql en modo promesa,para poder usar asnyc/await ----- //
import mysql from "mysql2/promise";
import environments from "../config/environments.js";

// ----- Acceso al objeto db de environments ----- //
const {database} = environments;

// ----- createPool : reduce carga de la db y aumenta la velocidad ----- //
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
    ,port: database.port,
    ssl: database.ssl
});// Conjunto de conexiones a la db(activas y reutilizables)

export default connection;