const hallForm = document.getElementById("hall-form");
const hallsList = document.getElementById("halls-list");
let halls = [];
let hallId = 1;

// Cargar datos al iniciar
loadHallsFromStorage();
renderHalls();

// Event listeners
hallForm.addEventListener("submit", getHall);
document.getElementById("load-external").addEventListener("click", () => {
    loadHallsFromStorage();
    renderHalls();
});

// Función para guardar en LocalStorage
function saveHallsToStorage() {
    localStorage.setItem("halls", JSON.stringify(halls));
    localStorage.setItem("hallId", hallId.toString());
}

// Función para cargar desde LocalStorage
function loadHallsFromStorage() {
    const storedHalls = localStorage.getItem("halls");
    const storedHallId = localStorage.getItem("hallId");
    
    if (storedHalls) halls = JSON.parse(storedHalls);
    if (storedHallId) hallId = parseInt(storedHallId, 10);
}

// Función para renderizar salones
function renderHalls() {
    if (!halls.length) {
        hallsList.innerHTML = "<li>No se han agregado salones de eventos.</li>";
        return;
    }
    
    hallsList.innerHTML = halls.map(hall => `
        <li id="hall-${hall.id}">
            <div class="hall-info">
                <p class="hall-title"><strong>Título:</strong> ${hall.title}</p>
                <p class="hall-description"><strong>Descripción:</strong> ${hall.description}</p>
                <p class="hall-address"><strong>Dirección:</strong> ${hall.address}</p>
                <p class="hall-value"><strong>Valor:</strong> $${hall.value}</p>
                <p class="hall-status"><strong>Estado:</strong> ${hall.status}</p>
            </div>
            <button class="delete-button" onclick="deleteHall(${hall.id})">
                Eliminar
            </button>
        </li>
    `).join("");
}

// Función para agregar salón
function getHall(event) {
    event.preventDefault();
    
    const title = document.getElementById("hall-title").value.trim();
    const description = document.getElementById("hall-description").value.trim();
    const address = document.getElementById("hall-address").value.trim();
    const value = document.getElementById("hall-value").value.trim();
    const status = document.getElementById("hall-status").value;

    if (title && description && address && value) {
        const newHall = {
            id: hallId++,
            title,
            description,
            address,
            value,
            status
        };
        
        halls.push(newHall);
        saveHallsToStorage();
        renderHalls();
        hallForm.reset();
    }
}

// Función para eliminar salón (agregada para completitud)
function deleteHall(id) {
    halls = halls.filter(hall => hall.id !== id);
    saveHallsToStorage();
    renderHalls();
}