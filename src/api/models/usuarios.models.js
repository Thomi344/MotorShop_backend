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


//------ Trae todos los usuarios de la DB ----- //

const selectTodosUsuarios = async () => {
    let sql = `SELECT * FROM usuarios`;
    return await connection.query(sql);
}; 
const insertarUsuario = async (email, password_hash) => {
    let sql = `INSERT INTO usuarios (email, password_hash) VALUES (?, ?)`;
    return await connection.query(sql, [email, password_hash]);
};

export default {
    selectTodosUsuarios,
    insertarUsuario,

}