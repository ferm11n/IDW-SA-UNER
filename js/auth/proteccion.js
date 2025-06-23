document.addEventListener("DOMContentLoaded", () => {
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
    const token = sessionStorage.getItem("accessToken");
    const navGestion = document.getElementById("navGestion");


    // Páginas solo accesibles por administradores
    const paginasAdmin = ["gestionAdmin.html", "panelAdmin.html", "usuariosAdmin.html"];
    const rutaActual = window.location.pathname;
    const esPaginaAdmin = paginasAdmin.some(pagina => rutaActual.includes(pagina));


    if (navGestion) {
        if (usuarioActual && usuarioActual.role === "admin") {
            navGestion.style.display = "block";
        } else {
            navGestion.style.display = "none";
        }
    }

    // Redireccionamos si el usuario no es el admin e intenta acceder a la pagina protegia
    if (esPaginaAdmin && (!usuarioActual || usuarioActual.role !== "admin" || !token)) {
        alert("Acceso denegado pipi. Afueraaaaa!!!");
        window.location.href = "index.html";
        return;
    }

});