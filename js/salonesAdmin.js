const salonForm = document.getElementById("salon-form");
const salonesList = document.getElementById("salones-list");
let salones = [];
let salonId = 1;

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

  if (storedSalones) salones = JSON.parse(storedSalones);
  if (storedSalonId) salonId = parseInt(storedSalonId, 10);
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

  if (title && description && address && value && image) {
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
    saveSalonesToStorage();
    renderSalones();
    salonForm.reset();
  }
}

// Eliminar salón
function deleteSalon(id) {
  salones = salones.filter(salon => salon.id !== id);
  saveSalonesToStorage();
  renderSalones();
}


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