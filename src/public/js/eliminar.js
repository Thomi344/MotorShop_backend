const getProductoForm = document.getElementById("form-buscar-producto");
const productoInfo = document.getElementById("producto-info");
const productoEncontradoDiv = document.getElementById("productoEncontrado");
const formEliminar = document.getElementById("form-eliminar-producto");
const inputIdConfirmar = document.getElementById("idConfirmarEliminar");

let productoEncontradoId = null;

// Buscar producto por ID
getProductoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        productoInfo.innerHTML = "<p>Cargando producto...</p>";
        productoEncontradoDiv.style.display = "none";

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const idProducto = data.id.trim();

        if (!idProducto) throw new Error("Debe ingresar un ID válido");

        const response = await fetch(`http://localhost:3000/api/productos/${idProducto}`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const { payload } = await response.json();
        if (!payload || payload.length === 0) throw new Error("Producto no encontrado");

        const producto = payload[0];
        productoEncontradoId = producto.id;
        inputIdConfirmar.value = producto.id;

        mostrarProducto(producto);
        productoEncontradoDiv.style.display = "block";
    } catch (error) {
        productoInfo.innerHTML = `<p class="error">${error.message}</p>`;
    }
});

// Eliminar producto
formEliminar.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!productoEncontradoId) return alert("No hay producto para eliminar");

    const confirmar = confirm("¿Seguro que desea eliminar este producto?");
    if (!confirmar) return;

    try {
        const response = await fetch(`http://localhost:3000/api/productos/${productoEncontradoId}`, {
        method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Error al eliminar");

        alert("Producto eliminado correctamente");
        productoEncontradoDiv.style.display = "none";
        productoInfo.innerHTML = "";
        getProductoForm.reset();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

function mostrarProducto(producto) {
    productoInfo.innerHTML = `
        <li class="producto-item">
        <p><strong>ID:</strong> ${producto.id}</p>
        <p><strong>Nombre:</strong> ${producto.nombre}</p>
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Tipo:</strong> ${producto.tipo}</p>
        <p><strong>Activo:</strong> ${producto.activo ? "Sí" : "No"}</p>
        </li>
    `;
}
