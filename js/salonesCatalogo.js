import { SALONES_PRINCIPALES } from "./datos.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Cargar salones desde localStorage
let salonesLocales = JSON.parse(localStorage.getItem("salones")) || [];
const precargadosYaInsertados = localStorage.getItem("salonesPrecargados") === "true";

// Unificar salones: iniciales + locales
if (!precargadosYaInsertados) {
  const titulosLocales = salonesLocales.map(s => s.titulo);

  const precargadosAdaptados = SALONES_PRINCIPALES
      .filter(salon => !titulosLocales.includes(salon.titulo))
      .map(salon => ({
    id: salon.id,
    titulo: salon.titulo,
    descripcion: salon.descripcion,
    direccion: salon.direccion,
    valor: salon.valor,
    imagen: salon.imagen[0],
    categoria: salon.capacidad > 150 ? "Grande" : "Otros",
    origen: salon.origen || "inicial"
  }));

  salonesLocales = [...salonesLocales, ...precargadosAdaptados];
  localStorage.setItem("salones", JSON.stringify(salonesLocales));
  localStorage.setItem("salonesPrecargados", "true");
}

const salones = salonesLocales;

// Función para mostrar tarjetas
function mostrarSalones(lista) {
  contenedor.innerHTML = "";

  if (!lista.length) {
    contenedor.innerHTML = '<p class="text-muted text-center">No hay salones.</p>'
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
        <button class="card-boton">+ Agregar</button>
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
