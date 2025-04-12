const hallForm = document.getElementById("hall-form");
const hallsList = document.getElementById("halls-list");
let halls = [];
let hallId = 1;

// Inicializar
loadHallsFromStorage();
renderHalls();

hallForm.addEventListener("submit", getHall);

// Guardar en LocalStorage
function saveHallsToStorage() {
  localStorage.setItem("halls", JSON.stringify(halls));
  localStorage.setItem("hallId", hallId.toString());
}

// Cargar desde LocalStorage
function loadHallsFromStorage() {
  const storedHalls = localStorage.getItem("halls");
  const storedHallId = localStorage.getItem("hallId");

  if (storedHalls) halls = JSON.parse(storedHalls);
  if (storedHallId) hallId = parseInt(storedHallId, 10);
}

// Renderizar tarjetas
function renderHalls() {
  if (!halls.length) {
    hallsList.innerHTML = "<p class='text-muted'>No se han agregado salones de eventos.</p>";
    return;
  }

  hallsList.innerHTML = halls.map(hall => `
    <div class="col-md-4">
      <div class="card hall-card bg-dark text-white border-0 position-relative overflow-hidden">
        <img src="${hall.image}" class="card-img" alt="${hall.title}" style="object-fit: cover; height: 300px;">
        <div class="card-img-overlay hall-overlay d-flex flex-column justify-content-end p-3">
          <div class="hall-info">
            <h5 class="card-title">${hall.title}</h5>
            <p class="card-text">${hall.description}</p>
            <p class="card-text"><small>${hall.address}</small></p>
            <p class="card-text"><strong>Valor:</strong> $${hall.value}</p>
            <p class="card-text"><strong>Estado:</strong> ${hall.status}</p>
            <button class="btn btn-danger mt-2" onclick="deleteHall(${hall.id})">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Agregar salón
function getHall(event) {
  event.preventDefault();

  const title = document.getElementById("hall-title").value.trim();
  const description = document.getElementById("hall-description").value.trim();
  const address = document.getElementById("hall-address").value.trim();
  const value = document.getElementById("hall-value").value.trim();
  const status = document.getElementById("hall-status").value;
  const image = document.getElementById("hall-image").value.trim();

  if (title && description && address && value && image) {
    const newHall = {
      id: hallId++,
      title,
      description,
      address,
      value,
      status,
      image
    };

    halls.push(newHall);
    saveHallsToStorage();
    renderHalls();
    hallForm.reset();
  }
}

// Eliminar salón
function deleteHall(id) {
  halls = halls.filter(hall => hall.id !== id);
  saveHallsToStorage();
  renderHalls();
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
