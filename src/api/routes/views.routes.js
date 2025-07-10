// ----- RUTAS DEDIDACAS A LAS VISTAS ----- //
// ======================
// === IMPORTACIONES ====
// ======================
import { Router } from "express";
import { crearNuevoProductoDash,editarProductoDash,eliminarProductoDash,obtenerPorIdDash,obtenerTodosProductosDash,renderLogin,renderRegister } from "../controllers/view.controllers.js";


const router = Router();
// =========================================
// === ENDPOINTS (SALIDA DE INFORMACION) ===
// =========================================

//---- Get Productos ---- //
router.get("/",obtenerTodosProductosDash);
//---- Get Productos por ID ---- //
router.get("/consultar",obtenerPorIdDash);
//---- Crear nuevo Producto ---- //
router.get("/crear",crearNuevoProductoDash);
//---- Eliminar Producto ---- //
router.get("/eliminar",eliminarProductoDash);
//---- Editar Producto ---- //
router.get("/editar",editarProductoDash);
//---- Login User ---- //
router.get("/login",renderLogin)
//---- register User ---- //
router.get("/register",renderRegister)
// =====================
// === EXPORTACIONES ===
// =====================
export default router;