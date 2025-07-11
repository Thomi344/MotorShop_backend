    let altaproducto_form = document.getElementById("form-put-producto");

    altaproducto_form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitamos el envío por defecto del formulario

        let formData = new FormData(event.target); // Obtenemos la data del formulario
        let data = Object.fromEntries(formData.entries()); // Convertimos a objeto JS

        // Validación básica: asegurarse de que se complete el nombre
        if (!data.nombre) {
        alert("Completar todos los datos");
        return;
        }
        
        try {
        let response = await fetch("http://localhost:3000/api/productos", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"  // Usamos "headers" en plural
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();
            console.log(result.message);
            alert(`Producto creado`);
        } else {
            let error = await response.json();
            console.log("ERROR:", error.message);
            alert(`Error: ${error.message}`);
        }
        } catch (error) {
        console.log(error);
        }
    });

//Activación de modo oscuro
function modoOscuro(){
    document.getElementById("boton-modo_oscuro").addEventListener("click", () =>{
        document.body.classList.toggle("dark-mode");
    })
}

modoOscuro();