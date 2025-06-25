// ======================
// === IMPORTACIONES ====
// ======================
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

// ----- npm run dev (para iniciar el servidor) ----- //

// ==================
// === CONSTANTES ===
// ==================
const app = express()
const PORT = environments.port;


// =====================================
// === MIDDLEWARES DE APLICACION =======
// =====================================
// ------ Middleware CORS basico que permite todas las solicitudes ----- //
app.use(cors());

// ------ Para parsear el json del body(peticiones POST,PUT O PATCH) ----- //
app.use(express.json());

// ------ Logear todas las solicitudes ----- //
app.use((req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}],${req.method} ,${req.url}`);
    next();
});

// ========================
// ======= SERVIDOR =======
// ========================
app.get("/",(req,res)=>{ res.send("Hola mundo"); });


// =========================================
// === ENDPOINTS (SALIDA DE INFORMACION) ===
// =========================================

// ----- Traigo los productos desde la db y lo transformo en JSON() ----- //
app.get("/productos",async(req,res)=>{
    try{

        let sql = `SELECT * FROM productos`;
        // ----- Usamos [rows] la desestructuracion extrae directamente las filas,que es el primer resultado de la consulta,a un codigo mas legible ----- //
        let [rows] = await connection.query(sql); // se detiene la ejecucion hasta que se resuelva

        // ----- Codigo : 200 ,servidor corriendo correctamente ----- //
        res.status(200).json({
            payload :rows, ////conjunto de datos de la db(array)
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
    }catch(error){
        console.log("Error obteniendo datos: "+error);
        // ----- Codigo : 500 ,error interno del servidor ----- //
        res.status(500).json({error:"ERROR interno del servidor al obtener productos"});
    };

});


app.listen(PORT,()=>{console.log("Servidor corriendo en el puerto: "+PORT)});