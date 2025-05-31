import { SALONES_INICIALES } from "./datos.js";

document.addEventListener("DOMContentLoaded", function() {
    const contenedor = document.querySelector(".servicios-contenedor");

    SALONES_INICIALES.forEach((salon) => {
        const card = document.createElement("article");
        card.classList.add("servicio-card", "animacion");
        card.dataset.categoria = "Salones Infantiles";

        card.innerHTML = `
            <div class="card-imagen">
                <img src="${salon.imagen}" alt="${salon.titulo}">
            </div>
            <div class="card-contenido">
                <h3>${salon.titulo}</h3>
                <p>${salon.descripcion}</p>
                <div class="card-precio"><span>$${salon.valor}</span> / hora</div>
                <button class="card-boton">+ Agregar</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
})

const salones = cargarSalones();
generarTarjetas(salones);
console.log('Datos cargados y tarjetas generadas');

window.agregarSalon = function(nuevoSalon){
    salones.push(nuevoSalon);
    guardarSalones(salones);
    generarTarjetas(salones);
}




/*document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.getElementById('.card-boton');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const card = boton.closest('.servicio-card');
            const nombre = card.querySelector('h3').innerText;
            const precio = card.querySelector('.card-precio span').innerHTML;
            const imagen = card.querySelector('img').src;

            const item = { nombre, precio, imagen };

            //Aca vamos a guardar en LocalStorage
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(item);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            alert(`${nombre} agregado al carrito con exito`);
        });
    });
});*/