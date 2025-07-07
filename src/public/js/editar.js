const getForm = document.getElementById("getProduct-form");
const listNode = document.getElementById("getId-list");
const formNode = document.getElementById("updateForm-container");

// 1) Obtener producto por ID
getForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  listNode.innerHTML = "<p>Cargando producto…</p>";

  try {
    const { idProd } = Object.fromEntries(new FormData(e.target).entries());
    const id = idProd.trim();
    if (!id) throw new Error("ID inválido");

    const res = await fetch(`http://localhost:3000/api/productos/${id}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);

    const { payload } = await res.json();
    if (!payload || payload.length === 0)
      throw new Error("Producto no encontrado");

    const producto = payload[0];

    listNode.innerHTML = `
      <li class="producto-item">
        <strong>ID:</strong> ${producto.id}<br>
        <strong>Nombre:</strong> ${producto.nombre}<br>
        <strong>Descripción:</strong> ${producto.descripcion}<br>
        <strong>Precio:</strong> $${producto.precio}<br>
        <strong>Tipo:</strong> ${producto.tipo}<br>
        <strong>Activo:</strong> ${producto.activo ? "Sí" : "No"}<br>
        <button id="btnUpdate">Actualizar</button>
      </li>`;

    document
      .getElementById("btnUpdate")
      .addEventListener("click", () => showUpdateForm(producto));
  } catch (err) {
    listNode.innerHTML = `<p class="error">${err.message}</p>`;
    formNode.innerHTML = "";
  }
});

// 2) Mostrar form de actualización
function showUpdateForm(producto) {
  formNode.innerHTML = `
        <form id="updateproducto-form">
        <h2>Actualizar producto</h2>
        <input type="hidden" name="id" value="${producto.id}">

        <label>Nombre</label>
        <input name="nombre" value="${producto.nombre}" required>

        <label>Descripción</label>
        <textarea name="descripcion" required>${producto.descripcion}</textarea>

        <label>Precio</label>
        <input type="number" name="precio" step="0.01" value="${producto.precio}" required>

        <label>Tipo</label>
        <select name="tipo" required>
            <option value="auto" ${producto.tipo === "auto" ? "selected" : ""}>Auto</option>
            <option value="repuesto" ${producto.tipo === "repuesto" ? "selected" : ""}>Repuesto</option>
        </select>

        <label>Imagen (URL)</label>
        <input name="imagen" value="${producto.imagen || ""}">

        <label>Activo</label>
        <select name="activo">
            <option value="true" ${producto.activo ? "selected" : ""}>Sí</option>
            <option value="false" ${!producto.activo ? "selected" : ""}>No</option>
        </select>

        <button type="submit">Guardar cambios</button>
        </form>
    `;

document.getElementById("updateproducto-form").addEventListener("submit", actualizar);
}

// 3) Enviar PUT con los datos corregidos
async function actualizar(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    try {
    const res = await fetch(
        `http://localhost:3000/api/productos/${data.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: parseFloat(data.precio),
            tipo: data.tipo,
            imagen: data.imagen,
            activo: data.activo === "true"
            })
        }
    );

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Error al actualizar");

    alert(" Producto actualizado con éxito");
    listNode.innerHTML = "";
    formNode.innerHTML = "";
    } catch (err) {
        alert(`Error al actualizar: ${err.message}`);
    }
}

