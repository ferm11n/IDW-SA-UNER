document.addEventListener("DOMContentLoaded", () => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    const navGestion = document.getElementById("navGestion");
    const isPaginaAdmin = window.location.pathname.includes("salonesAdmin.html");

    if (navGestion) {
        if (usuarioActual && usuarioActual.role === "admin") {
            navGestion.style.display = "block";
        } else {
            navGestion.style.display = "none";
        }
    }

    // Redireccionamos si el usuario no es el admin e intenta acceder a la pagina protegia
    if (isPaginaAdmin && (!usuarioActual || usuarioActual.role !== "admin")) {
        alert("Acceso denegado pipi. Tomate el palosky...")
        window.location.href = "index.html"
    }
});