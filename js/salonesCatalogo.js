import { SALONES_PRINCIPALES } from "./datos.js";
import { agregarSalonAlCarrito } from "./carrito.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// LocalStorage y precarga
let salonesLocales = JSON.parse(localStorage.getItem("salones")) || [];
const precargadosYaInsertados = localStorage.getItem("salonesPrecargados") === "true";

if (!precargadosYaInsertados) {
  const titulosLocales = salonesLocales.map(s => s.titulo);
  const precargadosAdaptados = SALONES_PRINCIPALES
      .filter(s => !titulosLocales.includes(s.titulo))
      .map(s => ({
        id: s.id,
        titulo: s.titulo,
        descripcion: s.descripcion,
        direccion: s.direccion,
        valor: s.valor,
        imagen: s.imagen[0],
        categoria: s.capacidad > 150 ? "Grande" : "Otros",
        origen: s.origen || "inicial"
      }));
  salonesLocales = [...salonesLocales, ...precargadosAdaptados];
  localStorage.setItem("salones", JSON.stringify(salonesLocales));
  localStorage.setItem("salonesPrecargados", "true");
}

const salones = salonesLocales;

function mostrarSalones(lista) {
  contenedor.innerHTML = "";

  if (!lista.length) {
    contenedor.innerHTML = '<p class="text-muted text-center">No hay salones.</p>';
    return;
  }

  lista.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("servicio-card", "animacion");
    card.dataset.categoria = item.categoria;

    card.innerHTML = `
      <div class="card-imagen">
        <img src="${item.imagen}" alt="${item.titulo}">
        <span class="badge badge-origen">${item.origen === 'inicial' ? 'Precargado' : 'Admin'}</span>
      </div>
      <div class="card-contenido">
        <h3>${item.titulo}</h3>
        <p>${item.descripcion}</p>
        <p><strong>Dirección:</strong> ${item.direccion}</p>
        <div class="card-precio"><span>$${item.valor}</span> / hora</div>
        <button class="card-boton btn-agregar-salon">+ Agregar</button>
      </div>
    `;

    card.querySelector(".btn-agregar-salon").addEventListener("click", () => {
      agregarSalonAlCarrito(item);
    });

    contenedor.appendChild(card);
  });
}

mostrarSalones(salones);

// Filtros
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(btn => btn.classList.remove("active"));
    boton.classList.add("active");
    const categoria = boton.dataset.target;
    const filtrados = !categoria ? salones : salones.filter(s => s.categoria === categoria);
    mostrarSalones(filtrados);
  });
});
