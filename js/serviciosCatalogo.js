import { SERVICIOS_PRINCIPALES } from "./datos.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Cargar servicios desde localStorage
let serviciosLocales = JSON.parse(localStorage.getItem("servicios")) || [];
const serviciosPrecargadosYaInsertados = localStorage.getItem("serviciosPrecargados") === "true";


// Unificar servicios: iniciales + locales
if (!serviciosPrecargadosYaInsertados) {
  const titulosLocales = serviciosLocales.map(s => s.titulo);

  const serviciosPrecargadosAdaptados = SERVICIOS_PRINCIPALES
      .filter(servicio => !titulosLocales.includes(servicio.titulo))
      .map(servicio => ({
        id: servicio.id,
        titulo: servicio.titulo,
        descripcion: servicio.descripcion,
        valor: servicio.valor,
        imagen: servicio.imagen[0],
      }));

  serviciosLocales = [...serviciosLocales, ...serviciosPrecargadosAdaptados];
  localStorage.setItem("servicios", JSON.stringify(serviciosLocales));
  localStorage.setItem("serviciosPrecargados", "true");
}

const servicios = serviciosLocales;

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


