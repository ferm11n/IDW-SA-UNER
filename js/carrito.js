export function agregarSalonAlCarrito(salon) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || { salon: null, servicios: [] };
    carrito.salon = salon;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Salón agregado al presupuesto");
}

export function agregarServicioAlCarrito(servicio) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || { salon: null, servicios: [] };

    // Evitar duplicados
    const yaExiste = carrito.servicios.some(s => s.titulo === servicio.titulo);
    if (yaExiste) {
        alert("Este servicio ya está en el presupuesto");
        return;
    }

    carrito.servicios.push(servicio);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Servicio agregado al presupuesto");
}

export function mostrarCarrito() {
    const contenedor = document.getElementById("contenidoCarrito");
    const btnFinalizar = document.getElementById("btnFinalizarCompra");
    const btnVaciar = document.getElementById("btnVaciarCompra");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || { salon: null, servicios: [] };

    // Con esto sincronizamos los datos de salones y servicios
    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    const serviciosActuales = JSON.parse(localStorage.getItem("servicios")) || [];

    // Actualizar salón
    if (carrito.salon) {
        const salonActualizado = salones.find(s => s.id === carrito.salon.id);
        if (salonActualizado) {
            carrito.salon = salonActualizado;
        } else {
            carrito.salon = null;
        }
    }

    // Actualizar servicios
    carrito.servicios = carrito.servicios
        .map(s => serviciosActuales.find(actual => actual.id === s.id))
        .filter(Boolean);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    contenedor.innerHTML = "";

    const haySalon = !!carrito.salon;
    const hayServicios = carrito.servicios.length > 0;

    // Mostramos u ocultamos los botones para finalizar compra o vaciarla
    if (btnFinalizar) btnFinalizar.classList.toggle("d-none", !(haySalon || hayServicios));
    if (btnVaciar) btnVaciar.classList.toggle("d-none", !(haySalon || hayServicios));

    if (!haySalon && !hayServicios) {
        contenedor.innerHTML = '<p class="text-muted text-center">El presupuesto está vacío.</p>';
        return;
    }

    if (haySalon) {
        contenedor.innerHTML += `
        <div class="card mb-4 p-3 bg-light rounded">
            <div class="card-body">
                <h5 class="card-title">Salón seleccionado</h5>
                <p class="card-text"><strong>${carrito.salon.titulo}</strong><br>
                <span class="text-rosa">$${carrito.salon.valor} / hora</span></p>
                <button class="btn btn-danger btn-sm mt-2" onclick="eliminarSalon()">Eliminar</button>
            </div>
        </div>`;
    }

    if (hayServicios) {
        contenedor.innerHTML += `
        <div class="card mb-4 p-3 bg-light rounded">
            <div class="card-body">
                <h5 class="card-title">Servicios seleccionados</h5>
                <ul class="list-group list-group-flush">
                    ${carrito.servicios.map((s, index) => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${s.titulo} 
                            <div>
                                <span class="me-3 text-rosa fw-bold">$${s.valor}</span>
                                <button class="btn btn-danger btn-sm" onclick="eliminarServicio(${index})">Eliminar</button>
                            </div>
                        </li>`).join("")}
                </ul>
            </div>
        </div>`;
    }

    const total = (carrito.salon?.valor || 0) + carrito.servicios.reduce((acc, s) => acc + s.valor, 0);
    contenedor.innerHTML += `
    <div class="text-end mb-4 fw-bold fs-4">
        Total: <span class="text-rosa-total">$${total}</span>
    </div>`;
}


// eliminar el salón del carrito
window.eliminarSalon = function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || { salon: null, servicios: [] };
    carrito.salon = null;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

// Función para eliminar un servicio del carrito según índice
window.eliminarServicio = function (index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || { salon: null, servicios: [] };
    carrito.servicios.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};


export function finalizarCompra() {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));
    if (!usuario) {
        alert("Debes iniciar sesión para finalizar la compra");
        window.location.href = "login.html";
        return;
    }

    alert("Gracias por su compra 🎉");
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
}

export function vaciarCompra() {
    if (confirm("¿Estas seguro de que queres vaciar el presupuesto?")) {
        localStorage.removeItem("carrito");
        mostrarCarrito();
        alert("Presupuesto vaciado correctamente.")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();

    const btnFinalizar = document.getElementById("btnFinalizarCompra");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", finalizarCompra);
    }

    const btnVaciar = document.getElementById("btnVaciarCompra");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCompra);
    }
})


