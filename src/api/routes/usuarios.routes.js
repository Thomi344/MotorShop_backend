// ----- RUTAS DEDIDACAS A LOS USUARIOS (API) ----- //
// ======================
// === IMPORTACIONES ====
// ======================

import { Router } from "express";

import { ObtenerTodosUsuarios ,crearNuevoUsuario} from "../controllers/usuarios.controllers.js";

const router = Router();

// =========================================
// === ENDPOINTS (SALIDA DE INFORMACION) ===
// =========================================

//---- Get Usuarios ---- //
router.get("/",ObtenerTodosUsuarios);
//---- Post Usuarios ---- //
router.post("/",crearNuevoUsuario)
//---- Exportar EndPoints ---- //
export default router;