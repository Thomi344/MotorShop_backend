    const getProductoForm = document.getElementById("getProduct-form");
    const getIdLista = document.getElementById("getId-container");

    // Evento que se ejecuta cuando se envía el formulario
    getProductoForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        try {
        // Mostramos mensaje mientras se realiza la petición
        getIdLista.innerHTML = "<p>Cargando Producto...</p>";

        // Obtenemos los datos del formulario
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Limpiamos espacios en el campo de ID y validamos que no esté vacío
        const idProducto = data.idProd.trim();
        if (!idProducto) {
            throw new Error("El campo ID está vacío");
        }

        // Realizamos la petición a la API con el ID ingresado
        const response = await fetch(`http://localhost:3000/api/productos/${idProducto}`);

        // Si la respuesta no es exitosa, lanzamos un error con su descripción
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Convertimos la respuesta a JSON
        const datos = await response.json();

        // Verificamos que haya datos en la propiedad payload
        if (!datos.payload || datos.payload.length === 0) {
            throw new Error("No se encontró el Producto solicitado");
        }

        // Extraemos el primer Producto del array
        const producto = datos.payload[0];

        // Construimos el HTML para mostrar los datos del producto
        const htmlProducto = `
        <div class="tarjeta-producto">
            <img src="${producto.imagen}" alt="">
            <h3 class="nombre_producto">${producto.nombre}</h3>
            <p class="descripcion" >${producto.descripcion}</p>
            <p class="precio">$${producto.precio}</p>
        </div>
        `;;

        // Insertamos el HTML en el contenedor de la lista
        getIdLista.innerHTML = htmlProducto;

        } catch (error) {
        // Mostramos cualquier error que ocurra durante el proceso
        console.error("Error al obtener el Producto:", error);
        getIdLista.innerHTML = `<p>${error.message}</p>`;
        }
    });

function modoOscuro(){
    document.getElementById("boton-modo_oscuro").addEventListener("click", () =>{
        document.body.classList.toggle("dark-mode");
    })
}

modoOscuro();