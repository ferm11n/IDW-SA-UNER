document.addEventListener("DOMContentLoaded", () => {
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
    const token = sessionStorage.getItem("accessToken");

    const navLogin = document.getElementById("navLogin");
    const navGestion = document.getElementById("navGestion");

    if (usuarioActual && token) {
        //cambia el boton a salir
        if (navLogin) {
            navLogin.textContent = "Salir";
            navLogin.href = "#";
            navLogin.addEventListener("click", (e) => {
                e.preventDefault();
                sessionStorage.clear();
                window.location.href = "login.html";
            });
        }

        // se muestra gestion si es admin
        if (navGestion) {
            if (usuarioActual.role === "admin") {
                navGestion.style.display = "block";
            } else {
                navGestion.style.display = "none";
            }
        }

    } else {
        //si no esta logeado, muestra el boton entrar
        if (navLogin) {
            navLogin.textContent = "Entrar";
            navLogin.href = "login.html";
        }
        // Ocultar enlace Gestión
        if (navGestion) {
            navGestion.style.display = "none";
        }
    }
});
