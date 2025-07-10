let altaUsuarioForm = document.getElementById("register-form");

altaUsuarioForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitamos el envío por defecto del formulario

    let formData = new FormData(event.target); // Obtenemos la data del formulario
    let data = Object.fromEntries(formData.entries()); // Convertimos a objeto JS
    // Validación básica: asegurarse de que se complete el email y la contraseña
    if (!data.email || !data.password_hash) {
        alert("Completar todos los datos");
        return;
    }

    try {
        let response = await fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Usamos "headers" en plural
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();
            console.log(result.message);
            alert(`Usuario creado`);
            window.location.href = "/dashboard/login"; // Redirigir al login después del registro exitoso
        } else {
            let error = await response.json();
            console.log("ERROR:", error.message);
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.log(error);
    }
});