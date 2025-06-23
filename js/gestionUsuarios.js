const token = sessionStorage.getItem("accessToken");
if (!token) {
  window.location.href = "login.html"; 
}

let users = [];
const rowsPerPage = 10;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.querySelector('#tablaUsuarios tbody');
  const paginationDiv = document.createElement("div");
  paginationDiv.id = "pagination";
  paginationDiv.classList.add("my-3", "text-center");
  tabla.parentElement.after(paginationDiv);

  try {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
      throw new Error("error en la respuesta de la api");
    }
    const data = await response.json();
    users = data.users;
    renderTablePage(currentPage);
  } catch(error) {
    console.error('Error al cargar usuarios:', error);
    alert("Hubo un error al cargar los usuarios");
  }

  function renderTablePage(page) {
    tabla.innerHTML = "";
    currentPage = page;
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageUsers = users.slice(start, end);

    pageUsers.forEach(user => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>
          <button class="btn btn-danger">Eliminar</button>
          <button class="btn btn-warning">Editar</button>
          <button class="btn btn-info btn-sm ver-mas" data-user='${JSON.stringify(user)}'>Ver más</button>
        </td>
        <td>${user.username}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
      `;
      tabla.appendChild(fila);
    });

    renderPaginationControls();
  }

  function renderPaginationControls() {
    paginationDiv.innerHTML = "";
    const totalPages = Math.ceil(users.length / rowsPerPage);

    for(let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("btn", "btn-outline-light", "mx-1");
      if(i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        renderTablePage(i);
      });
      paginationDiv.appendChild(btn);
    }
  }

  tabla.addEventListener("click", function (e) {
    if (e.target.classList.contains("ver-mas")) {
      const user = JSON.parse(e.target.dataset.user);

      const modalBody = document.getElementById("modalUsuarioBody");
      modalBody.innerHTML = `
        <ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark text-white"><strong>Usuario:</strong> ${user.username}</li>
            <li class="list-group-item bg-dark text-white"><strong>Nombre:</strong> ${user.firstName} ${user.lastName}</li>
            <li class="list-group-item bg-dark text-white"><strong>Apellido de soltera:</strong> ${user.maidenName}</li>
            <li class="list-group-item bg-dark text-white"><strong>Edad:</strong> ${user.age}</li>
            <li class="list-group-item bg-dark text-white"><strong>Género:</strong> ${user.gender}</li>
            <!-- <li class="list-group-item bg-dark text-white"><strong>Email:</strong> ${user.email}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Teléfono:</strong> ${user.phone}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Contraseña:</strong> ${user.password}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Fecha de Nacimiento:</strong> ${user.birthDate}</li> -->
            <li class="list-group-item bg-dark text-white"><strong>Imagen:</strong> ${user.image}</li>
            <li class="list-group-item bg-dark text-white"><strong>Grupo Sanguineo:</strong> ${user.bloodGroup}</li>
            <li class="list-group-item bg-dark text-white"><strong>Altura::</strong> ${user.height}</li>
            <li class="list-group-item bg-dark text-white"><strong>Peso:</strong> ${user.weight}</li>
            <li class="list-group-item bg-dark text-white"><strong>Color de ojos:</strong> ${user.eyeColor}</li>
            <li class="list-group-item bg-dark text-white"><strong>Cabello:</strong> ${user.hair.color}, ${user.hair.type}</li>
            <!-- <li class="list-group-item bg-dark text-white"><strong>Dirección IP:</strong> ${user.ip}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Dirección:</strong> ${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.stateCode}, ${user.address.postalCode}, ${user.address.coordinates.lat}, ${user.address.coordinates.lng}, ${user.address.country}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Dirección MAC:</strong> ${user.macAddress}</li> -->
            <li class="list-group-item bg-dark text-white"><strong>Universidad:</strong> ${user.university}</li>
            <!-- <li class="list-group-item bg-dark text-white"><strong>Banco:</strong> ${user.bank.cardExpire}, ${user.bank.cardNumber}, ${user.bank.cardType}, ${user.bank.currency}, ${user.bank.iban}</li> -->
            <li class="list-group-item bg-dark text-white"><strong>Compañia:</strong> ${user.company.department}, ${user.company.name}, ${user.company.title}, ${user.company.address.address}, ${user.company.address.city}, ${user.company.address.state}, ${user.company.address.stateCode}, ${user.company.address.postalCode}, ${user.company.address.coordinates.lat}, ${user.company.address.coordinates.lng}, ${user.company.address.country}</li>
            <!-- <li class="list-group-item bg-dark text-white"><strong>Ein:</strong> ${user.ein}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Ssn:</strong> ${user.ssn}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Agente de usuario:</strong> ${user.userAgent}</li> -->
            <!-- <li class="list-group-item bg-dark text-white"><strong>Criptos:</strong> ${user.crypto.coin}, ${user.crypto.wallet}, ${user.crypto.network}</li> -->
            <li class="list-group-item bg-dark text-white"><strong>Rol:</strong> ${user.role}</li>
        </ul>
      `;

      const modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
      modal.show();
    }
  });
});
