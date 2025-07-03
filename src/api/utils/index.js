// =================================================
// ================== UTILIDADES ===================
// =================================================

//------ PEQUENIAS FUNCIONES UTILES QUE AYUDAN AL QUE EL CODIGO SEA MODULAR Y LEGIBLE ----- //

// ======================
// === IMPORTACIONES ====
// ======================
//------ Convierte una url de archivo (file:/) a una ruta de un sist. de archivos ----- //
import { fileURLToPath } from "url";
//------ Dirname: devuelve el directorio padre de una ruta / Join: Une parte de rutas ----- //
import { dirname,join } from "path";

// =================
// === FUNCIONES ===
// =================
//------ Import.meta.url : proporciona la url absoluta del modulo actual (file:///ruta//al/archivo.js) / fileURLToPath: convierte esa url a una ruta de sistema(/ruta/al/archivo.js) ----- //
const __filename = fileURLToPath(import.meta.url);

//------ Dirname(__filename): obtengo el directorio del archivo actual / Join(...,"../../../"):retrocedi 3 niveles de carpetas (utils ->  api ->src ->tpintefrador) ----- //
const __dirname = join(dirname(__filename),"../../../");

// =====================
// === EXPORTACIONES ===
// =====================

export{
    __dirname,join
};