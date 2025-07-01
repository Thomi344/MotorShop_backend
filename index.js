// ======================
// === IMPORTACIONES ====
// ======================
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productosRouter } from "./src/api/routes/index.js";
import {loggerUrl} from "./src/api/middlewares/middlewares.js";

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
app.use(loggerUrl);

// ========================
// ======= SERVIDOR =======
// ========================
app.get("/",(req,res)=>{ res.send("Hola mundo"); });
app.use("/api/productos",productosRouter);



app.listen(PORT,()=>{console.log("Servidor corriendo en el puerto: "+PORT)});