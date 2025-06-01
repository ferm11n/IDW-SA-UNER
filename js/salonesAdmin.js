import { SALONES_INICIALES } from "./datos.js";

const salonForm = document.getElementById("salon-form");
const salonesList = document.getElementById("salones-list");
const submitButton= document.getElementById("submit-button");
const cancelEditButton=document.getElementById("cancel-edit");

let salones = [];
let salonId = 1;
let editingSalonId= null;

// Inicializar
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
    const storedSalones = localStorage.getItem("salones");
    const storedSalonId = localStorage.getItem("salonId");

    if (storedSalones) {
      salones = JSON.parse(storedSalones);
    } else if(typeof SALONES_INICIALES !== "undefined"){
      salones = SALONES_INICIALES;
      salonId= salones.reduce((max, salon) => (salon.id > max ? salon.id : max), 0)+1;
      saveSalonesToStorage();
    }

    if (storedSalonId) {
      salonId = parseInt(storedSalonId, 10);
    }
}

// Renderizar tarjetas
function renderSalones() {
    if (!salones.length) {
        salonesList.innerHTML = "<p class='text-muted'>No se han agregado salones de eventos.</p>";
        return;
    }

    salonesList.innerHTML = salones.map(salon => `
    <div class="col-md-4">
      <div class="card salon-card bg-dark text-white border-0 position-relative overflow-hidden" data-id="${salon.id}">
        <img src="${salon.imagen}" class="card-img" alt="${salon.titulo}" style="object-fit: cover; height: 300px;">
        <div class="card-img-overlay salon-overlay d-flex flex-column justify-content-end p-3">
          <div class="salon-info">
            <h5 class="card-titulo">${salon.titulo}</h5>
            <p class="card-text">${salon.descripcion}</p>
            <p class="card-text"><small>${salon.direccion}</small></p>
            <p class="card-text"><strong>Valor:</strong> $${salon.valor}</p>
            <p class="card-text"><strong>Estado:</strong> ${salon.estado}</p>
            <button class="btn btn-warning mt-2 me-2" onclick="editSalon(${salon.id})">Editar</button>
            <button class="btn btn-danger mt-2" onclick="deleteSalon(${salon.id})">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Agregar salón
function getSalon(event) {
    event.preventDefault();

    const titulo = document.getElementById("salon-titulo").value.trim();
    const descripcion = document.getElementById("salon-descripcion").value.trim();
    const direccion = document.getElementById("salon-direccion").value.trim();
    const valor = document.getElementById("salon-valor").value.trim();
    const estado = document.getElementById("salon-estado").value.trim();
    const imagen = document.getElementById("salon-imagen").value.trim();


    if (!titulo || !descripcion || !direccion || !valor || !imagen) {
    alert("Por favor, complete todos los campos.");
    return;
  }
    if(editingSalonId){
      salones= salones.map(salon=> {
        if(salon.id === editingSalonId){
          return {id: salon.id, titulo, descripcion, direccion, valor, estado, imagen};
        }
        return salon
      });
      editingSalonId=null;
      salonForm.classList.remove("edit-mode");
      document.querySelectorAll(".card.salon-editando").forEach(card => {
        card.classList.remove("salon-editando");
      });
      submitButton.textContent= "Agregar Salon";
      cancelEditButton.classList.add("d-none");
    } else {
        const newSalon = {
            id: salonId++,
            titulo,
            descripcion,
            direccion,
            valor,
            estado,
            imagen
        };
        salones.push(newSalon);
    }
    saveSalonesToStorage();
    renderSalones();
    salonForm.reset();

    console.log("salones:", salones);
}

function editSalon(id){
  document.querySelectorAll(".card.salon-editando").forEach(card=>{
    card.classList.remove("salon-editando");
  });
  salonForm.classList.remove("edit-mode");

  const salonAEditar= salones.find(salon => salon.id === id);
  if(!salonAEditar) return;
  document.getElementById("salon-titulo").value = salonAEditar.titulo;
  document.getElementById("salon-descripcion").value = salonAEditar.descripcion;
  document.getElementById("salon-direccion").value = salonAEditar.direccion;
  document.getElementById("salon-valor").value = salonAEditar.valor;
  document.getElementById("salon-estado").value = salonAEditar.estado;
  document.getElementById("salon-imagen").value = salonAEditar.imagen;

  editingSalonId=id;
  submitButton.textContent="Guardar Cambios";
  cancelEditButton.classList.remove("d-none");

  const tarjeta = document.querySelector(`.card[data-id="${id}"]`);
  if (tarjeta) {
    tarjeta.classList.add("salon-editando");
  }
  salonForm.classList.add("edit-mode");

}

function cancelEdit() {
  editingSalonId = null;
  salonForm.reset();
  submitButton.textContent = "Agregar Salón";
  cancelEditButton.classList.add("d-none");
  salonForm.classList.remove("edit-mode");

  document.querySelectorAll(".card.salon-editando").forEach(card=> {
    card.classList.remove("salon-editando");
  });
}

// Eliminar salón
function deleteSalon(id) {
  if(!confirm("Esta accion borrara el salon, ¿esta seguro?")){
    return;
  }
  const tarjeta=document.querySelector(`.card[data-id="${id}"]`);
  if (tarjeta){
    tarjeta.classList.add("salon-borrando");
    setTimeout(() => {
      salones=salones.filter(salon => salon.id !== id);
      saveSalonesToStorage();
      renderSalones();
    }, 300);
  }else {
    salones = salones.filter(salon => salon.id !== id);
    saveSalonesToStorage();
    renderSalones();
  }
}

cancelEditButton.addEventListener("click", cancelEdit);

window.editSalon = editSalon;
window.deleteSalon = deleteSalon ;
