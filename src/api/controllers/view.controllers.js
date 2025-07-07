// =================================================================
// ================== Controladores de Productos ===================
// =================================================================

//------ Gestiona la peticiones ----- //

// ======================
// === IMPORTACIONES ====
// ======================
// ----Logica Sql ---- //
import ProductosSQL from "../models/productos.models.js";
// =================
// === FUNCIONES ===
// =================

//---- OBTENER TODOS LOS PRODUCTOS PARA EL DASHBOARD(Por eso el "dash" al final ) ----

export const obtenerTodosProductosDash = async(req ,res )=>{
    // ---- A partir de apuntar a dashboard le vamos a servir la vista ----
    try{
        const respuestaProductos = await ProductosSQL.selectTodosProductos();
        // ---- Renderizo la informacion en el index.EJS ----
        res.render("index",{
            title: "Inicio",
            about: "Todos los Productos",
            productos : respuestaProductos
        });
    }catch(error){
        console.error("Error al obtener informacion para dashboard: ",error);
        res.status(500).json({
            error:"Error interno al obtener informacion para dashboard"
        });
    };
};

export const obtenerPorIdDash = async(req,res)=>{
    // ---- Renderizo la informacion en el consultar.EJS ----
    try{
    res.render("consultar",{
        title :"Productos Por ID",
        about:"Consulta de Producto por su ID"
    });
    }catch(error){
        console.error("Error al obtener informacion por id para dashboard: ",error);
        res.status(500).json({
            error:"Error interno al obtener informacion por id para dashboard"
        });        
    };
};

export const crearNuevoProductoDash =(req,res)=>{
    // ---- Renderizo la informacion en el editar.EJS ----
    try{
    res.render("crear",{
        title:"Crear Producto",
        about :"Cree un nuevo producto"
        
    });
    }catch(error){
        console.error("Error al crear producto para dashboard: ",error);
        res.status(500).json({
            error:"Error interno al crear producto para dashboard"
        });
    };
};

export const editarProductoDash = async(req,res)=>{
    // ---- Renderizo la informacion en el editar.EJS ----
    try{
    res.render("editar",{
        title:"Editar Producto",
        about:"Edite informacion del producto"
    });
    }catch(error){
        console.error("Error al editar un producto para dashboard: ",error);
        res.status(500).json({
            error:"Error interno al editar un producto para dashboard"
        });
    };
};

export const eliminarProductoDash = async(req,res)=>{
    // ---- Renderizo la informacion en el eliminar.EJS ----
    try{
    res.render("eliminar",{
        title:"Eliminar Producto",
        about:"Elimine un producto"
    });
    }catch(error){
        console.error("Error al eliminar un producto para dashboard: ",error);
        res.status(500).json({
            error:"Error interno al eliminar un producto para dashboard"
        });
    };
};