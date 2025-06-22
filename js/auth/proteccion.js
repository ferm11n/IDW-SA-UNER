document.addEventListener("DOMContentLoaded", () => {
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
    const token = sessionStorage.getItem("accessToken");
    const navGestion = document.getElementById("navGestion");
    const isPaginaAdmin = window.location.pathname.includes("gestionAdmin.html");

    if (navGestion) {
        if (usuarioActual && usuarioActual.role === "admin") {
            navGestion.style.display = "block";
        } else {
            navGestion.style.display = "none";
        }
    }

    // Redireccionamos si el usuario no es el admin e intenta acceder a la pagina protegia
    if (isPaginaAdmin && (!usuarioActual || usuarioActual.role !== "admin" || !token)) {
        alert("Acceso denegado pipi. Afueraaaaa!!!")
        window.location.href = "index.html"
        return;
    }

});