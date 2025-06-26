function obtenerClaveCarrito() {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));
    return usuario?.username ? `carrito_${usuario.username}` : "carrito_anonimo";
}


export function agregarSalonAlCarrito(salon) {
    const clave = obtenerClaveCarrito();
    const carrito = JSON.parse(localStorage.getItem(clave)) || { salon: null, servicios: [] };
    carrito.salon = salon;
    localStorage.setItem(clave, JSON.stringify(carrito));
    alert("Salón agregado al presupuesto");
}

export function agregarServicioAlCarrito(servicio) {
    const clave = obtenerClaveCarrito();
    const carrito = JSON.parse(localStorage.getItem(clave)) || { salon: null, servicios: [] };

    // Evitar duplicados
    const yaExiste = carrito.servicios.some(s => s.titulo === servicio.titulo);
    if (yaExiste) {
        alert("Este servicio ya está en el presupuesto");
        return;
    }

    carrito.servicios.push(servicio);
    localStorage.setItem(clave, JSON.stringify(carrito));
    alert("Servicio agregado al presupuesto");
}

export function mostrarCarrito() {
    const clave = obtenerClaveCarrito();
    const contenedor = document.getElementById("contenidoCarrito");
    const btnFinalizar = document.getElementById("btnFinalizarCompra");
    const btnVaciar = document.getElementById("btnVaciarCompra");

    let carrito = JSON.parse(localStorage.getItem(clave)) || { salon: null, servicios: [] };

    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    const serviciosActuales = JSON.parse(localStorage.getItem("servicios")) || [];

    if (carrito.salon) {
        const salonActualizado = salones.find(s => s.id === carrito.salon.id);
        carrito.salon = salonActualizado || null;
    }

    carrito.servicios = carrito.servicios
        .map(s => serviciosActuales.find(actual => actual.id === s.id))
        .filter(Boolean);

    localStorage.setItem(clave, JSON.stringify(carrito));

    contenedor.innerHTML = "";

    const haySalon = !!carrito.salon;
    const hayServicios = carrito.servicios.length > 0;

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

window.eliminarSalon = function () {
    const clave = obtenerClaveCarrito();
    const carrito = JSON.parse(localStorage.getItem(clave)) || { salon: null, servicios: [] };
    carrito.salon = null;
    localStorage.setItem(clave, JSON.stringify(carrito));
    mostrarCarrito();
};

window.eliminarServicio = function (index) {
    const clave = obtenerClaveCarrito();
    const carrito = JSON.parse(localStorage.getItem(clave)) || { salon: null, servicios: [] };
    carrito.servicios.splice(index, 1);
    localStorage.setItem(clave, JSON.stringify(carrito));
    mostrarCarrito();
};

export function finalizarCompra() {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));
    if (!usuario) {
        alert("Debes iniciar sesión para finalizar la compra");
        window.location.href = "login.html";
        return;
    }

    const clave = `carrito_${usuario.username}`;
    const carrito = JSON.parse(localStorage.getItem(clave)) || { salon: null, servicios: [] };

    if (!carrito.salon && carrito.servicios.length === 0) {
        alert("No hay elementos en el presupuesto para finalizar.");
        return;
    }

    const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

    const nuevoPresupuesto = {
        id: Date.now(),
        nombreCompleto: `${usuario.lastName} ${usuario.firstName}`,
        fecha: new Date().toLocaleDateString("es-AR"),
        tematica: carrito.salon?.descripcion || "Sin temática",
        valorTotal: (carrito.salon?.valor || 0) + carrito.servicios.reduce((acc, s) => acc + s.valor, 0),
        servicios: carrito.servicios.map(s => ({ id: s.id, titulo: s.titulo, valor: s.valor }))
    };

    presupuestos.push(nuevoPresupuesto);
    localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
    localStorage.removeItem(clave);

    alert("Presupuesto registrado exitosamente 🎉");
    window.location.href = "index.html";
}

export function vaciarCompra() {
    const clave = obtenerClaveCarrito();
    if (confirm("¿Estas seguro de que queres vaciar el presupuesto?")) {
        localStorage.removeItem(clave);
        mostrarCarrito();
        alert("Presupuesto vaciado correctamente.");
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
});
