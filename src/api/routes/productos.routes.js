// ----- RUTAS DEDIDACAS A LOS PRODUCTOS(API) ----- //
// ======================
// === IMPORTACIONES ====
// ======================
import { Router} from "express";
import {ObtenerTodosProductos} from "../controllers/productos.controllers.js";
import { obtenerPorId } from "../controllers/productos.controllers.js";
import { crearNuevoProducto } from "../controllers/productos.controllers.js";
import { eliminarProducto } from "../controllers/productos.controllers.js";
import { modificarProductos } from "../controllers/productos.controllers.js";

const router = Router();

// =========================================
// === ENDPOINTS (SALIDA DE INFORMACION) ===
// =========================================

//---- Get Productos ---- //
router.get("/",ObtenerTodosProductos);
//---- Get Productor por ID ---- //
router.get("/:id",obtenerPorId);
//---- Crear nuevo Producto ---- //
router.post("/",crearNuevoProducto);
//---- Eliminar Producto ---- //
router.delete("/:id",eliminarProducto);
//---- Modificar Producto ---- //
router.put("/:id",modificarProductos);

//---- Exportar EndPoints ---- //
export default router;