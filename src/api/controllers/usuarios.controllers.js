// =================================================================
// ================== Controladores de Usuarios ===================
// =================================================================

//------ Gestiona la peticiones ----- //

// ======================
// === IMPORTACIONES ====
// ======================
// ----Logica Sql ---- //
import Usuarios from "../models/usuarios.models.js";

// =================
// === FUNCIONES ===
// =================

//---- OBTENER TODOS LOS USUARIOS ----
export const ObtenerTodosUsuarios = async(req,res)=>{
    try{
        let [rows] = await Usuarios.selectTodosUsuarios(); 
        res.status(200).json({ 
            payload: rows, // - conjunto de datos de la db(array) - //
            message: rows.length === 0 ? "No se encontraron usuarios" : "Usuarios encontrados"
        });
    }catch(error){
        console.log("Error obteniendo usuarios "+error);
        res.status(500).json({
            message: "ERROR interno del servidor al obtener usuarios",
            error:error.message
        }); 
    }
};

//---- CREAR NUEVO USUARIO ----
export const crearNuevoUsuario = async(req,res)=>{
    try{
        let {email, password_hash} = req.body;
        //---- Verifico que el email y la contraseña no esten vacios ---- //
        if(!email || !password_hash){
            return res.status(400).json({
                error: "Email y contraseña son requeridos"
            });
        }
        await Usuarios.insertarUsuario(email, password_hash);
        res.status(201).json({
            message: "Usuario creado exitosamente"
        });
    } catch (error) {
        console.error("Error creando usuario:", error);
        // ---- Si la base de datos devuelve : "ER_DUP_ENTRY" significa que el email ya está registrado ---- //
        // ---- Por lo tanto, devolvemos un error 400 con un mensaje específico ---- //
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                message: "El correo ya está registrado"
            });
        }

        res.status(500).json({
            message: "ERROR interno del servidor al crear usuario",
            error: error.message
        });
    }
};