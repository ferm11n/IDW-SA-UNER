import { SALONES_INICIALES } from "./datos";

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
      <div class="card salon-card bg-dark text-white border-0 position-relative overflow-hidden">
        <img src="${salon.image}" class="card-img" alt="${salon.title}" style="object-fit: cover; height: 300px;">
        <div class="card-img-overlay salon-overlay d-flex flex-column justify-content-end p-3">
          <div class="salon-info">
            <h5 class="card-title">${salon.title}</h5>
            <p class="card-text">${salon.description}</p>
            <p class="card-text"><small>${salon.address}</small></p>
            <p class="card-text"><strong>Valor:</strong> $${salon.value}</p>
            <p class="card-text"><strong>Estado:</strong> ${salon.status}</p>
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

    const title = document.getElementById("salon-title").value.trim();
    const description = document.getElementById("salon-description").value.trim();
    const address = document.getElementById("salon-address").value.trim();
    const value = document.getElementById("salon-value").value.trim();
    const status = document.getElementById("salon-status").value;
    const image = document.getElementById("salon-image").value.trim();


    if (!title || !description || !address || !value || !image) {
    alert("Por favor, complete todos los campos.");
    return;
  }
    if(editingSalonId){
      salones= salones.map(salon=> {
        if(salon.id === editingSalonId){
          return {id: salon.id, title, description, address, value, status, image};
        }
        return salon
      });
      editingSalonId=null;
      submitButton.textContent= "Agregar Salon";
      cancelEditButton.classList.add("d-none");
    } else {
        const newSalon = {
            id: salonId++,
            title,
            description,
            address,
            value,
            status,
            image
        };
        salones.push(newSalon);
    }
    saveSalonesToStorage();
    renderSalones();
    salonForm.reset();
}

function editSalon(id){
  const salonAEditar= salones.find(salon => salon.id === id);
  if(!salonAEditar) return;
  document.getElementById("salon-title").value = salonAEditar.title;
  document.getElementById("salon-description").value = salonAEditar.description;
  document.getElementById("salon-address").value = salonAEditar.address;
  document.getElementById("salon-value").value = salonAEditar.value;
  document.getElementById("salon-status").value = salonAEditar.status;
  document.getElementById("salon-image").value = salonAEditar.image;

  editingSalonId=id;
  submitButton.textContent="Guardar Cambios";
  cancelEditButton.classList.remove("d-none");
}

function cancelEdit() {
  editingSalonId = null;
  salonForm.reset();
  submitButton.textContent = "Agregar Salón";
  cancelEditButton.classList.add("d-none");
}

// Eliminar salón
function deleteSalon(id) {
  if(confirm("Esta accion borrara el salon, ¿esta seguro?"))
    salones = salones.filter(salon => salon.id !== id);
    saveSalonesToStorage();
    renderSalones();
}

salonForm.addEventListener("submit", getSalon);
cancelEditButton.addEventListener("click", cancelEdit);

loadSalonesFromStorage();
renderSalones();

window.editSalon = editSalon;
window.deleteSalon = deleteSalon ;

//script para imagenes
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.event-item');
  const img = document.getElementById('evento-img');

  items.forEach(item => {
    item.addEventListener('mouseover', () => {
      const newImg = item.getAttribute('data-img');
      img.setAttribute('src', newImg);
    });

    item.addEventListener('mouseout', () => {
      img.setAttribute('src', './img/eventos/evento-default.jpg');
    });
  });
});
