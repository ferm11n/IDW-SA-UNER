import { SERVICIOS_PRINCIPALES } from "./datos.js";

const contenedorServicios = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Cargar salones desde localStorage o usar datos iniciales
const serviciosLocales = JSON.parse(localStorage.getItem("servicios")) || [];


// Unificar servicios: datos base + locales
const servicios = [
  ...SERVICIOS_PRINCIPALES.map(servicio => ({
    titulo: servicio.titulo,
    descripcion: servicio.descripcion,
    valor: servicio.valor,
    imagen: Array.isArray(servicio.imagen) ? servicio.imagen[0] : servicio.imagen,
    categoria: servicio.categoria || "Otros"
  })),

    ...serviciosLocales.map(servicio => ({
    titulo: servicio.titulo,
    descripcion: servicio.descripcion,
    valor: servicio.valor,
    imagen: Array.isArray(servicio.imagen) ? servicio.imagen[0] : servicio.imagen,
    categoria: servicio.categoria || "Otros"
  }))
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


