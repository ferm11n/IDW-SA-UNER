import { SERVICIOS_PRINCIPALES } from "./datos.js";
import { agregarServicioAlCarrito } from "./carrito.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

let serviciosLocales = JSON.parse(localStorage.getItem("servicios")) || [];
const serviciosPrecargadosYaInsertados = localStorage.getItem("serviciosPrecargados") === "true";

if (!serviciosPrecargadosYaInsertados) {
  const titulosLocales = serviciosLocales.map(s => s.titulo);
  const precargados = SERVICIOS_PRINCIPALES
      .filter(s => !titulosLocales.includes(s.titulo))
      .map(s => ({
        id: s.id,
        titulo: s.titulo,
        descripcion: s.descripcion,
        valor: s.valor,
        imagen: s.imagen[0],
        categoria: s.categoria || "Otros"
      }));

  serviciosLocales = [...serviciosLocales, ...precargados];
  localStorage.setItem("servicios", JSON.stringify(serviciosLocales));
  localStorage.setItem("serviciosPrecargados", "true");
}

const servicios = serviciosLocales;

function mostrarServicios(lista) {
  contenedor.innerHTML = "";

  if (!lista.length) {
    contenedor.innerHTML = '<p class="text-muted text-center">No hay servicios disponibles.</p>';
    return;
  }

  lista.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("servicio-card", "animacion");
    card.dataset.categoria = item.categoria || "Otros";

    card.innerHTML = `
      <div class="card-imagen">
        <img src="${item.imagen}" alt="${item.titulo}">
      </div>
      <div class="card-contenido">
        <h3>${item.titulo}</h3>
        <p>${item.descripcion}</p>
        <div class="card-precio"><span>$${item.valor}</span> / hora</div>
        <button class="card-boton btn-agregar-servicio">+ Agregar</button>
      </div>
    `;

    card.querySelector(".btn-agregar-servicio").addEventListener("click", () => {
      agregarServicioAlCarrito(item);
    });

    contenedor.appendChild(card);
  });
}

mostrarServicios(servicios);

// Filtros
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(btn => btn.classList.remove("active"));
    boton.classList.add("active");
    const categoria = boton.dataset.target;
    const filtrados = !categoria ? servicios : servicios.filter(s => s.categoria === categoria);
    mostrarServicios(filtrados);
  });
});
