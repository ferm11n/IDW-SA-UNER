import { DATOS_INICIALES } from "./datos.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Filtramos solo los salones del array
let salones = DATOS_INICIALES.filter(item => item.role === "salon");

function mostrarSalones(lista) {
    contenedor.innerHTML = "";

    lista.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("servicio-card", "animacion");
        card.dataset.categoria = "Salones Infantiles";

        card.innerHTML = `
            <div class="card-imagen">
                <img src="${item.imagen}" alt="${item.titulo}">
            </div>
            <div class="card-contenido">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
                <div class="card-precio"><span>$${item.valor}</span> / hora</div>
                <button class="card-boton">+ Agregar</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

// Mostramos todos los salones al cargar la página
mostrarSalones(salones);

// filtrado por botones como en servicios
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesFiltro.forEach(btn => btn.classList.remove("active"));
        boton.classList.add("active");

        const categoria = boton.dataset.target;

        // Aquí el filtrado si tienes categoría definida en los salones
        // Si no simplemente mostrar todos los salones porque no hay categorías
        const filtrados = categoria === undefined || categoria === ""
            ? salones
            : salones.filter(salon => salon.categoria === categoria);

        mostrarSalones(filtrados);
    });
});
