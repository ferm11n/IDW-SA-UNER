import { SALONES_INICIALES } from "./datos.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Cargar salones desde localStorage
const salonesLocales = JSON.parse(localStorage.getItem("salones")) || [];

// Unificar salones: iniciales + locales
const salones = [
  ...SALONES_INICIALES,
  ...salonesLocales.map(salon => ({
    titulo: salon.titulo,
    descripcion: salon.descripcion,
    direccion: salon.direccion,
    valor: salon.valor,
    imagen: salon.imagen,
    categoria: salon.estado || "Otros"
  }))
];

// Función para mostrar tarjetas
function mostrarSalones(lista) {
  contenedor.innerHTML = "";

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
        <p><strong>Dirección:</strong> ${item.direccion}</p>
        <div class="card-precio"><span>$${item.valor}</span> / hora</div>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// Mostrar todos los salones al cargar
mostrarSalones(salones);

// Filtro por categoría
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(btn => btn.classList.remove("active"));
    boton.classList.add("active");

    const categoria = boton.dataset.target;

    const filtrados = !categoria
      ? salones
      : salones.filter(salon => salon.categoria === categoria);

    mostrarSalones(filtrados);
  });
});
