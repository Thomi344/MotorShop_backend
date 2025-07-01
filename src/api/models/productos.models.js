// ====================================================
// ================== MODELOS SQL ====================
// ====================================================
//------ Gestiona las peticiones a la db ----- //

// ======================
// === IMPORTACIONES ====
// ======================
import connection from "../database/db.js";


// =================
// === FUNCIONES ===
// =================

//------ Trae todos los productos de la DB ----- //
const selectTodosProductos = async()=>{
    let sql = `SELECT * FROM productos`;
    return await connection.query(sql);
};

//------ Trae productos por ID de la DB ----- //
const selectProductoPorId = async(id)=>{
    let sql = `SELECT * FROM productos where id = ?`;
    return await connection.query(sql,[id]);
};

//------ Inserta nuevos productos a la DB ----- //
const insertNuevoProducto = async(nombre, descripcion, precio, imagen, tipo, activo) => {
    let sql = `INSERT INTO productos (nombre, descripcion, precio, imagen, tipo, activo) VALUES (?, ?, ?, ?, ?, ?)`;
    return await connection.query(sql, [nombre, descripcion, precio, imagen, tipo, activo]);
};

//------ Actualiza productos a la DB ----- //
const updateProducto = async(id, nombre, descripcion, precio, imagen, tipo, activo) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, tipo = ?, activo = ?
        WHERE id = ?
    `;
    return await connection.query(sql, [nombre, descripcion, precio, imagen, tipo, activo, id]);
};

//------ Elimina productos a la DB ----- //
const deleteProducto = async(id)=>{
    let sql = `DELETE FROM productos WHERE id = ?`;
    return await connection.query(sql,[id]);
};

// =====================
// === EXPORTACIONES ===
// =====================

export default{
    selectTodosProductos,
    selectProductoPorId,
    insertNuevoProducto,
    updateProducto,
    deleteProducto
};