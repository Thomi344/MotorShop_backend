// ====================================================
// ================== Controladores ===================
// ====================================================

//------ Gestiona la peticiones ----- //

// ======================
// === IMPORTACIONES ====
// ======================
// ----Logica Sql ---- //
import Productos from "../models/productos.models.js";


// =================
// === FUNCIONES ===
// =================

//---- OBTENER TODOS LOS PRODUCTOS ----
export const ObtenerTodosProductos =async(req,res)=>{

    try{ 
    
    let [rows] = await Productos.selectTodosProductos(); 
    res.status(200).json({ 
        payload: rows,// - conjunto de datos de la db(array) - //
        message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
    });

    }catch(error){
        console.log("Error obteniendo objetos "+error);
        res.status(500).json({
            message: "ERROR interno del servidor al obtener productos",
            error:error.message
        }); 
    };

};

//---- OBTENER PRODUCTOS POR ID ----

export const obtenerPorId = async(req,res)=>{
    try{
        let {id} = req.params;
        //---- Trae el producto con igual ID ---- //
        const [rows] = await Productos.selectProductoPorId(id);
        //---- Si el largo de rows es 0 es que no hay productos en la BD ---- //
        if(rows.length === 0){
            return res.status(404).json({
                error: "No se encontro un producto con esa ID"
            });
        };
        //---- Si no retorna codigo 200 (Todo funciona correctamente) y guardo el array ---- //
        res.status(200).json({
            payload :rows
        });

    }catch(error){
        //---- ERROR 500:error en el servidor ---- //
        res.status(500).json({
            message:"ERROR INTERNO EN EL SERVIDDOR AL OBTENER ID",
            error: error.message
        });
    };
};

//---- CREAR NUEVO PRODUCTO ---- //

export const crearNuevoProducto = async(req,res)=>{
    try{
        //---- Recogemos y guardamos en variables los valores que recibimos del cliente ---- //
        let {nombre, descripcion, precio, imagen,tipo,activo} = req.body;
        //---- Validamos que no falte ningún dato requerido ---- //
        if(!nombre ||  !descripcion ||  !precio ||  !imagen || !tipo || activo === undefined){
            return res.status(400).json({
                message:"Faltan Datos"
            });
        };
        //---- Consulta SQL ---- //
        const [rows] = await Productos.insertNuevoProducto( nombre, descripcion, precio, imagen,tipo,activo);
        // ----- 201: indica que la solicitud del cliente fue exitosa y que un nuevo recurso ha sido creado como resultado de la misma. ----//
        res.status(201).json({
            message:"Producto creado con éxito",
            ProductoId :rows.insertId
        });

    }catch(error){
        res.status(500).json({
            message:"Error interno al crear el producto",
            error: error.message
        })
    };
};

//---- ELIMINAR PRODUCTO ---- //

export const eliminarProducto =async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message:"Se requiere un ID para eliminar un producto"
            });
        };
        //---- Consulta SQL ---- //
        const [resultado] = await Productos.deleteProducto(id);
        //---- Si el largo de rows es 0 es que no hay productos con esa ID en la BD ---- //
        if(resultado.affectedRows === 0){
            return res.status(400).json({message:"No se encontro un producto con esa ID: "+id});
        };

        return res.status(200).json({
            message:"Producto eliminado correctamente"
        });
    }catch(error){
        console.error("Error en DELETE /productos/:id: ", error);
        res.status(500).json({
            message:"Error interno del servidor al eliminar un producto",
            error:error.message
        });
    };
};

//---- MODIFICAR PRODUCTO ---- //

export const modificarProductos = async(req,res)=>{
    try{
        let {id}= req.params;
        let {nombre, descripcion, precio, imagen,tipo,activo} = req.body;
        //---- Validacion basica para comprobar que estan todos los campos ---- //
        if(!nombre ||  !descripcion ||  !precio ||  !imagen || !tipo || activo === undefined ){
            return res.status(400).json({message:"Faltan datos"});
        };
        let [resultado] = await Productos.updateProducto(id,nombre, descripcion, precio, imagen,tipo,activo);
        //---- Si el largo de rows es 0 es que no hay productos con esa ID en la BD ---- //
        if(resultado.affectedRows ===0){
            return res.status(404).json({ message: "Producto no encontrado" });
        };
        return res.status(200).json({message:"Producto actualizado correctamente"});
    }catch(error){
        console.error("Error al actualizar el producto", error);
        res.status(500).json({message:"Error al modificar el producto: ",error: error.message});
    };
};