const serviciosList = document.getElementById("servicios-list");

let servicios = [];
const storedServicios = localStorage.getItem("servicios");

if (storedServicios) {
  try {
    servicios = JSON.parse(storedServicios);
  } catch (error) {
    console.error("Error al parsear servicios desde localStorage:", error);
  }
}

if (!servicios.length) {
  serviciosList.innerHTML =
    "<p class='text-muted text-center'>No hay servicios disponibles.</p>";
} else {
  serviciosList.innerHTML = servicios
    .map(
      (servicio) => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${servicio.imagen}" class="card-img-top card-img" alt="${servicio.titulo}" style="object-fit: cover; height: 200px;" />
                <div class="card-body">
                    <h5 class="card-title">${servicio.titulo}</h5>
                    <p class="card-text">${servicio.descripcion}</p>
                    <p><strong>Valor:</strong> $${servicio.valor}</p>
                    <p><strong>Estado:</strong> ${servicio.estado}</p>
                </div>
            </div>
        </div>
      `
    )
    .join("");
}
