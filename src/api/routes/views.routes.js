// ----- RUTAS DEDIDACAS A LAS VISTAS ----- //
// ======================
// === IMPORTACIONES ====
// ======================
import { Router } from "express";
import { crearNuevoProductoDash,editarProductoDash,eliminarProductoDash,obtenerPorIdDash,obtenerTodosProductosDash } from "../controllers/view.controllers.js";

const router = Router();
// =========================================
// === ENDPOINTS (SALIDA DE INFORMACION) ===
// =========================================

//---- Get Productos ---- //
router.get("/",obtenerTodosProductosDash);
//---- Get Productos por ID ---- //
router.get("/:id",obtenerPorIdDash);
//---- Crear nuevo Producto ---- //
router.post("/",crearNuevoProductoDash);
//---- Eliminar Producto ---- //
router.delete("/:id",eliminarProductoDash);
//---- Editar Producto ---- //
router.put("/:id",editarProductoDash);

// =====================
// === EXPORTACIONES ===
// =====================
export default router;