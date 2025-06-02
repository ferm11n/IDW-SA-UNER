document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("usuarioActual"));
    const navLogin = document.getElementById("navLogin");

    if (user && navLogin) {
        navLogin.textContent = "Salir";
        navLogin.href = "#";
        navLogin.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActual");
            // redireccionar a index o a login, lo que te guste
            window.location.href = "index.html";
        });
    } else {
        //Si no te logeas, se mantiene el "Entrar"
        navLogin.textContent = "Entrar";
        navLogin.href = "login.html";
        userName.textContent = `Hola, ${usuarioActual.username}!`;
    }
});
