import { DATOS_INICIALES} from "./datos.js";

const contenedor = document.querySelector(".servicios-contenedor");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// Aca solo filtraremos los serivicios
let servicios = DATOS_INICIALES.filter(item => item.role === "servicio");

function mostrarServicios(lista){
    contenedor.innerHTML = "";
    lista.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("servicio-card", "animacion");
        card.classList.add(item.categoria);
        card.dataset.categoria = item.categoria;

        card.innerHTML += `
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
    })
}

// Mostramos todos al cargar
mostrarServicios(servicios);

//Agregamos el evento a los botones de filtro
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        //Ahora hay que cambiar el estado activo de botones
        botonesFiltro.forEach(btn => btn.classList.remove("active"));
        boton.classList.add("active");


        //Por ejemplo "musica, decoracion, etc"
        const categoria = boton.dataset.target;

        //Filtramos por categoria o mostramos todos
        const filtrados = categoria === undefined ? servicios : servicios.filter(s => s.categoria === categoria);

        mostrarServicios(filtrados);
    });
});