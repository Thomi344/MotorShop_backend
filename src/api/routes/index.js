// ----- CONECTAMOS TODAS LAS RUTAS Y LAS EXPORTAMOS EN UN MISMO ARCHIVO ----- //
// ======================
// === IMPORTACIONES ====
// ======================
import productosRouter from "./productos.routes.js";
import  viewRoutes from "./views.routes.js";
import usuariosRouter from "./usuarios.routes.js";

// =====================
// === EXPORTACIONES ===
// =====================
export{productosRouter,viewRoutes,usuariosRouter};