import { SERVICIOS_PRINCIPALES } from "./datos.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Cargar servicios desde localStorage
const serviciosLocales = JSON.parse(localStorage.getItem("servicios")) || [];

// Unificar servicios: iniciales + locales
const servicios = [
  ...SERVICIOS_PRINCIPALES.map(servicio => ({
    titulo: servicio.titulo,
    valor: servicio.valor,
    descripcion: servicio.descripcion,
  })),
  ...servicioLocales.map(servicio => ({
    titulo: servicio.titulo,
    valor: servicio.valor,
    descripcion: servicio.descripcion,
  }))
];

// Función para mostrar tarjetas
function mostrarServicios(lista) {
  contenedor.innerHTML = "";

  if (!lista.length) {
    contenedor.innerHTML = '<p class="text-muted text-center">No hay servicios disponibles.</p>';
    return;
  }

  lista.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("servicio-card", "animacion");
    card.dataset.categoria = item.categoria;

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

// Mostrar todos los servicios al cargar
mostrarServicios(servicios);

// Filtro por categoría
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(btn => btn.classList.remove("active"));
    boton.classList.add("active");

    const categoria = boton.dataset.target;

    const filtrados = !categoria
      ? servicios
      : servicios.filter(servicio => servicio.categoria === categoria);

    mostrarServicios(filtrados);
  });
});


