let ListaUsuarios = [];
fetch('http://localhost:3000/api/usuarios')
    .then(res => res.json())
    .then(data => {
        ListaUsuarios = data.payload;
    })
    .catch(err => console.error('Error:', err));

// =============================== Llamar etiquetas =============================== //
let email = document.getElementById("usuario");
let password = document.getElementById("password");
let loginButton = document.getElementById("login-btn");

// =============================== Validar Login =============================== //
function validarUsuario(email, password) {
    if (!email || !password) {
        alert("Por favor, complete todos los campos.");
        return false;
    }
    const emailEncontrado = ListaUsuarios.find(u => u.email === email && u.password_hash === password);
    if (emailEncontrado) {
        localStorage.setItem("nombre_email", emailEncontrado.nombre);
        return true;
    } else {
        alert("email o contraseña incorrectos.");
        return false;
    }
};
// =============================== Evento Click Login =============================== //

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    if (validarUsuario(emailValue, passwordValue)) {
        // Redirigir a la página de inicio
        window.location.href = "/dashboard";
    }
});
