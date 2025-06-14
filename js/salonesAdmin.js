import { SALONES_PRINCIPALES } from "./datos.js";

const salonForm = document.getElementById("salon-form");
const salonesList = document.getElementById("salones-list");
const submitButton = document.getElementById("submit-button");
const cancelEditButton = document.getElementById("cancel-edit");

let salones = [];
let salonId = 1;
let editingSalonId = null;

loadSalonesFromStorage();
renderSalones();

salonForm.addEventListener("submit", getSalon);

// Guardar en LocalStorage
function saveSalonesToStorage() {
    localStorage.setItem("salones", JSON.stringify(salones));
    localStorage.setItem("salonId", salonId.toString());
}

// Cargar desde LocalStorage
function loadSalonesFromStorage() {
    const storedSalones = JSON.parse(localStorage.getItem("salones")) || [];
    const storedId = parseInt(localStorage.getItem("salonId")) || 1;
    const precargadosYaInsertados = localStorage.getItem("salonesPrecargados") === "true";

    if (!precargadosYaInsertados) {
        const precargadosAdaptados = SALONES_PRINCIPALES.map(p => ({
            id: p.id,
            titulo: p.titulo,
            descripcion: p.descripcion,
            direccion: p.direccion,
            valor: p.valor,
            estado: p.capacidad > 150 ? "Grande" : "Otros",
            imagen: p.imagen[0],
            origen: "inicial"
        }));

        const idsEnStorage = new Set(storedSalones.map(s => s.id));
        const nuevosPrecargados = precargadosAdaptados.filter(s => !idsEnStorage.has(s.id));
        salones = [...storedSalones, ...nuevosPrecargados];

        localStorage.setItem("salonesPrecargados", "true");
    } else {
        salones = storedSalones;
    }

    const maxId = salones.reduce((max, salon) => salon.id > max ? salon.id : max, 0);
    salonId = Math.max(storedId, maxId + 1);

    saveSalonesToStorage();
}

// Renderizar tarjetas
function renderSalones() {
    if (!salones.length) {
        salonesList.innerHTML = "<p class='text-muted'>No se han agregado salones de eventos.</p>";
        return;
    }

    salonesList.innerHTML = salones.map(salon => `
    <div class="col">
      <div class="card salon-card bg-dark text-white border-0 position-relative overflow-hidden" data-id="${salon.id}">
        <img src="${salon.imagen}" class="card-img" alt="${salon.titulo}" style="object-fit: cover; height: 300px;">
        <div class="card-img-overlay salon-overlay d-flex flex-column justify-content-start p-3">
          <div class="salon-info">
            <h5 class="card-titulo">${salon.titulo}</h5>
            <p class="card-text">${salon.descripcion}</p>
            <p class="card-text"><small>${salon.direccion}</small></p>
            <p class="card-text"><strong>Valor:</strong> $${salon.valor}</p>
            <p class="card-text"><strong>Estado:</strong> ${salon.estado}</p>
            <span class="badge bg-${salon.origen === 'inicial' ? 'info' : 'secondary'} mb-2">${salon.origen === 'inicial' ? 'Precargado' : 'Admin'}</span>
            <button class="btn btn-warning mt-2 me-2" onclick="editSalon(${salon.id})">Editar</button>
            <button class="btn btn-danger mt-2" onclick="deleteSalon(${salon.id})">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Agregar o editar salón
function getSalon(event) {
    event.preventDefault();

    const titulo = document.getElementById("salon-titulo").value.trim();
    const descripcion = document.getElementById("salon-descripcion").value.trim();
    const direccion = document.getElementById("salon-direccion").value.trim();
    const valorInput = document.getElementById("salon-valor").value.trim();
    const estado = document.getElementById("salon-estado").value.trim();
    const imagen = document.getElementById("salon-imagen").value.trim();

    if (!titulo || !descripcion || !direccion || !valorInput || !imagen) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const valor = Number(valorInput);
    if (isNaN(valor) || valor <= 0) {
        alert("Ingrese un valor numérico mayor a 0.");
        return;
    }

    if (editingSalonId) {
        salones = salones.map(salon => {
            if (salon.id === editingSalonId) {
                return { ...salon, titulo, descripcion, direccion, valor, estado, imagen };
            }
            return salon;
        });

        editingSalonId = null;
        salonForm.classList.remove("edit-mode");
        submitButton.textContent = "Agregar Salón";
        cancelEditButton.classList.add("d-none");

        document.querySelectorAll(".card.salon-editando").forEach(card => {
            card.classList.remove("salon-editando");
        });

    } else {
        const newSalon = {
            id: salonId++,
            titulo,
            descripcion,
            direccion,
            valor,
            estado,
            imagen,
            origen: "local"
        };
        salones.push(newSalon);
    }

    saveSalonesToStorage();
    renderSalones();
    salonForm.reset();
}

// Editar
function editSalon(id) {
    const salonAEditar = salones.find(salon => salon.id === id);
    if (!salonAEditar) return;

    document.getElementById("salon-titulo").value = salonAEditar.titulo;
    document.getElementById("salon-descripcion").value = salonAEditar.descripcion;
    document.getElementById("salon-direccion").value = salonAEditar.direccion;
    document.getElementById("salon-valor").value = salonAEditar.valor;
    document.getElementById("salon-estado").value = salonAEditar.estado;
    document.getElementById("salon-imagen").value = salonAEditar.imagen;

    editingSalonId = id;
    submitButton.textContent = "Guardar Cambios";
    cancelEditButton.classList.remove("d-none");

    document.querySelectorAll(".card.salon-editando").forEach(card => {
        card.classList.remove("salon-editando");
    });

    const tarjeta = document.querySelector(`.card[data-id="${id}"]`);
    if (tarjeta) tarjeta.classList.add("salon-editando");

    salonForm.classList.add("edit-mode");
}

// Cancelar edición
function cancelEdit() {
    editingSalonId = null;
    salonForm.reset();
    submitButton.textContent = "Agregar Salón";
    cancelEditButton.classList.add("d-none");
    salonForm.classList.remove("edit-mode");

    document.querySelectorAll(".card.salon-editando").forEach(card => {
        card.classList.remove("salon-editando");
    });
}

// Eliminar
function deleteSalon(id) {
    if (!confirm("Esta acción eliminará el salón. ¿Está seguro?")) return;

    const tarjeta = document.querySelector(`.card[data-id="${id}"]`);
    if (tarjeta) {
        tarjeta.classList.add("salon-borrando");
        setTimeout(() => {
            salones = salones.filter(salon => salon.id !== id);
            saveSalonesToStorage();
            renderSalones();
        }, 300);
    } else {
        salones = salones.filter(salon => salon.id !== id);
        saveSalonesToStorage();
        renderSalones();
    }
}

cancelEditButton.addEventListener("click", cancelEdit);
window.editSalon = editSalon;
window.deleteSalon = deleteSalon;
