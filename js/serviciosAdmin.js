import { SERVICIOS_PRINCIPALES } from "./datos.js";

const servicioForm        = document.getElementById("servicio-form");
const serviciosList       = document.getElementById("servicios-list");
const submitServicioBtn   = document.querySelector("#servicio-form button[type=submit]");
const cancelEditServicio  = document.getElementById("cancel-edit-servicio");

let servicios = [];
let servicioId = 1;
let editingServicioId = null;

//Inicializar
loadServiciosFromStorage();
renderServicios();

servicioForm.addEventListener("submit", getServicio);
cancelEditServicio.addEventListener("click", cancelEditServicioFn);

//Guardar en LocalStorage
function saveServiciosToStorage() {
  localStorage.setItem("servicios", JSON.stringify(servicios));
  localStorage.setItem("servicioId", servicioId.toString());
}

//Cargar desde LocalStorage
function loadServiciosFromStorage() {
  const storedServicios = localStorage.getItem("servicios");
  const storedServicioId = localStorage.getItem("servicioId");

  if (storedServicios) {
    servicios = JSON.parse(storedServicios);
  } else if (typeof SERVICIOS_PRINCIPALES !== "undefined") {
    servicios = SERVICIOS_PRINCIPALES;
    servicioId = servicios.reduce((max, s) => (s.id > max ? s.id : max), 0) + 1;
    saveServiciosToStorage();
  }

  if (storedServicioId) {
    servicioId = parseInt(storedServicioId, 10);
  }
}

//Renderizar tarjetas
function renderServicios() {
  if (!servicios.length) {
    serviciosList.innerHTML = "<p class='text-muted'>No se han agregado servicios.</p>";
    return;
  }

  serviciosList.innerHTML = servicios.map(servicio => `
      <div class="col">
        <div class="card servicio-card bg-dark text-white border-0 position-relative overflow-hidden" data-id="${servicio.id}">
          <img src="${servicio.imagen}" class="card-img" alt="${servicio.titulo}" style="object-fit: cover; height: 300px;">
          <div class="card-img-overlay servicio-overlay d-flex flex-column justify-content-start p-3">
            <div class="servicio-info">
              <h5 class="card-titulo">${servicio.titulo}</h5>
              <p class="card-text">${servicio.descripcion}</p>
              <p class="card-text"><strong>Valor:</strong> $${servicio.valor}</p>
              <p class="card-text"><strong>Estado:</strong> ${servicio.estado}</p>
              <button class="btn btn-warning mt-2 me-2" onclick="editServicio(${servicio.id})">Editar</button>
              <button class="btn btn-danger mt-2" onclick="deleteServicio(${servicio.id})">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

//Agregar o actualizar servicio
function getServicio(event) {
    event.preventDefault();

    const titulo      = document.getElementById("servicio-titulo").value.trim();
    const descripcion = document.getElementById("servicio-descripcion").value.trim();
    const valorInput  = document.getElementById("servicio-valor").value.trim();
    const estado      = document.getElementById("servicio-estado").value.trim();
    const imagen      = document.getElementById("servicio-imagen").value.trim();

    if (!titulo || !descripcion || !valorInput || !imagen) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    const valor = parseFloat(valorInput);
    if (isNaN(valor) || valor <= 0) {
        alert("Ingrese un valor numérico mayor a 0.");
        return;
    }

    if (editingServicioId !== null) {
    servicios = servicios.map((servicio) => {
        if (servicio.id === editingServicioId) {
        return { id: servicio.id, titulo, descripcion, valor, estado, imagen };
        }
        return servicio;
    });
    editingServicioId = null;
    servicioForm.classList.remove("edit-mode");
    cancelEditServicio.classList.add("d-none");
    document.querySelectorAll(".card.servicio-editando").forEach((c) =>
        c.classList.remove("servicio-editando")
    );
    } else {
    const newServicio = { id: servicioId++, titulo, descripcion, valor, estado, imagen };
    servicios.push(newServicio);
    }

  servicioForm.reset();
  saveServiciosToStorage();
  renderServicios();
}

//Pasar a modo edicion
function editServicio(id) {
    document.querySelectorAll(".card.servicio-editando").forEach((c) => c.classList.remove("servicio-editando"));
    servicioForm.classList.remove("edit-mode");

    const servicioAEditar = servicios.find((s) => s.id === id);
    if (!servicioAEditar) return;

    document.getElementById("servicio-titulo").value      = servicioAEditar.titulo;
    document.getElementById("servicio-descripcion").value = servicioAEditar.descripcion;
    document.getElementById("servicio-valor").value       = servicioAEditar.valor;
    document.getElementById("servicio-estado").value      = servicioAEditar.estado;
    document.getElementById("servicio-imagen").value      = servicioAEditar.imagen;

    editingServicioId = id;
    submitServicioBtn.textContent = "Guardar Cambios";
    cancelEditServicio.classList.remove("d-none");

    const tarjeta = document.querySelector(`.card[data-id="${id}"]`);
    if (tarjeta) tarjeta.classList.add("servicio-editando");
    servicioForm.classList.add("edit-mode");
}

//Cancelar edicion
function cancelEditServicioFn() {
    editingServicioId = null;
    servicioForm.reset();
    submitServicioBtn.textContent = "Guardar";
    cancelEditServicio.classList.add("d-none");
    servicioForm.classList.remove("edit-mode");
    document.querySelectorAll(".card.servicio-editando").forEach((c) => c.classList.remove("servicio-editando"));
}

//Eliminar servicio
function deleteServicio(id) {
    if (!confirm("¿Seguro que querés eliminar este servicio?")) return;

    const tarjeta = document.querySelector(`.card[data-id="${id}"]`);
    if (tarjeta) {
        tarjeta.classList.add("servicio-borrando");
        setTimeout(() => {
        servicios = servicios.filter((s) => s.id !== id);
        saveServiciosToStorage();
        renderServicios();
        }, 300);
    } else {
        servicios = servicios.filter((s) => s.id !== id);
        saveServiciosToStorage();
        renderServicios();
    }
}

window.editServicio   = editServicio;
window.deleteServicio = deleteServicio;
