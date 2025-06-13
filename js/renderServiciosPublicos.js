import { SERVICIOS_PRINCIPALES } from "./datos.js";

const contenedorServicios = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Cargar salones desde localStorage o usar datos iniciales
const serviciosLocales = JSON.parse(localStorage.getItem("servicios")) || [];
const servicios = [
    ...SERVICIOS_PRINCIPALES,
    ...serviciosLocales
];

//Funcion para renderizar servicios
function mostrarServicios(lista) {
  contenedorServicios.innerHTML = "";

  if (!lista.length) {
    contenedorServicios.innerHTML = '<p class="text-muted text-center">No hay servicios.</p>'
    return;
  }


  lista.forEach(servicio => {
    const card = document.createElement("article");
    card.classList.add("servicio-card", "animacion");
    card.dataset.categoria = servicio.categoria || "otros";

    card.innerHTML = `
      <div class="card-imagen">
        <img src="${servicio.imagen}" alt="${servicio.titulo}">
      </div>
      <div class="card-contenido">
        <h3>${servicio.titulo}</h3>
        <p>${servicio.descripcion}</p>
        <p class="card-precio"><span>$${servicio.valor}</span></p>
        <button class="card-boton">+ Agregar</button>
      </div>
      `;

    contenedorServicios.append(card);
  });
}

//Mostramos todos los servicios al cargar
mostrarServicios(servicios);

//filtramos por categoria
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(btn => btn.classList.remove("active"));
    boton.classList.add("active");

    const categoriaSeleccionada = boton.dataset.target;
    const filtrados = servicios.filter(servicios =>
      servicio.categoria?.toLowerCase() === categoriaSeleccionada.toLowerCase()
    );

    mostrarServicios(categoriaSeleccionada ? filtrados : servicios);
  });
});
