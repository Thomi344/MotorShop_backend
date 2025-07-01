// ====================================================
// ================== MIDDLEWARES ====================
// ====================================================
//------ función que se puede ejecutar antes o después del manejo de una ruta ----- //

const loggerUrl = ((req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}],${req.method} ,${req.url}`);
    next();});

//---- Exportar Middlewares ---- //
export{
    loggerUrl
};