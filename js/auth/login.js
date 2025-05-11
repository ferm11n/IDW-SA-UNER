document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("usuarios")) {
        //Usuarios de prueba
        const usuarios = [
            { username: "admin", password: "123", role: "admin" },
            { username: "usuario1", password: "123", role: "user" },
            { username: "usuario2", password: "123", role: "user" },
            { username: "usuario3", password: "123", role: "user" },
            { username: "usuario4", password: "123", role: "user" },
            { username: "usuario5", password: "123", role: "user" }
        ];
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    const form = document.getElementById("formLogin");
    if (form) form.addEventListener("submit", iniciarSesion);
});

function iniciarSesion(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();


    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const user = usuarios.find(u => u.username.toLowerCase() === username && u.password === password);

    const alertDiv = document.getElementById("alert");

    if (user) {
        localStorage.setItem("usuarioActual", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        if (alertDiv) {
            alertDiv.innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
                "          Usuario o contraseña incorrectos.\n" +
                "          <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Cerrar\"></button>\n" +
                "        </div>"
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    }
}
