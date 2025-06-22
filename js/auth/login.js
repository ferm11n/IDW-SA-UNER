document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLogin");
    if (form) {
        form.addEventListener("submit", iniciarSesion);
    }

    const token = sessionStorage.getItem("accessToken");
    if (token) {
        window.location.href = "index.html";
    }
});

async function iniciarSesion(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const alerta = document.getElementById("alerta");

    try {
        // Intento de login
        const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) throw new Error("Credenciales incorrectas");

        const loginData = await res.json();

        // Traemos los datos completos del usuario para obtener el rol
        const userRes = await fetch(`https://dummyjson.com/users/${loginData.id}`);
        if (!userRes.ok) throw new Error("No se pudo obtener info del usuario");

        const fullUserDatos = await userRes.json();
        fullUserDatos.token = loginData.token;

        // Guardamos todo en sessionStorage
        sessionStorage.setItem("accessToken", fullUserDatos.token);
        sessionStorage.setItem("usuarioActual", JSON.stringify(fullUserDatos));

        window.location.href = "index.html";

    } catch (error) {
        if (alerta) {
            alerta.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Usuario o contraseña incorrectos.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
                </div>`;
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    }
}
