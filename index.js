// ======================
// === IMPORTACIONES ====
// ======================
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productosRouter,viewRoutes } from "./src/api/routes/index.js";
import {loggerUrl} from "./src/api/middlewares/middlewares.js";


// ----- ANTES HAY QUE TENER INSTALADO EJS (npm i ejs) ----- //
import {__dirname,join} from "./src/api/utils/index.js";

// ----- npm run dev (para iniciar el servidor) ----- //


// ==================
// === CONSTANTES ===
// ==================
const app = express() //Inicializamos express
const PORT = environments.port; //Declaramos una variable const con el número de puerto obtenido del .env


// =====================================
// === MIDDLEWARES DE APLICACION =======
// =====================================
// ------ Middleware CORS basico que permite todas las solicitudes ----- //
app.use(cors());

// ------ Para parsear el json del body(peticiones POST,PUT O PATCH) ----- //
app.use(express.json());

// ------ Logear todas las solicitudes ----- //
app.use(loggerUrl);


// ========================
// ======= SERVIDOR =======
// ========================
// ----- CONFIGURACION DE VISTAS (EJS COMO MOTOR DE PLANTILLAS) ----- //
app.set("view engine","ejs");
// ----- Indicamos a la app que sirve vistas desde la carpeta views ----- //
app.set("views",join(__dirname,"src/views"));
// ----- Middleware para servir archivos estaticos ----- //
app.use(express.static(join(__dirname, "src/public")));



// =========================================
// === ENDPOINTS (SALIDA DE INFORMACION) ===
// =========================================
app.get("/",(req,res)=>{ res.send("Hola mundo"); });

// ----- VISTAS DASHBOARD ----- //
app.use("/dashboard",viewRoutes);
// ----- API REST ----- //
app.use("/api/productos",productosRouter);

// Devuelve el último id de la tabla Productos

app.get("/api/productos/ultimo", async (req, res) => {
    try {
        const [rows] = await connection.query(
        "SELECT MAX(id) AS lastId FROM productos"
        );
        const lastId = rows[0].lastId || 0;
        res.json({ lastId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
app.listen(PORT,()=>{console.log("Servidor corriendo en el puerto: " + PORT)});