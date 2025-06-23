const token = sessionStorage.getItem("accessToken");
if (!token) {
  window.location.href = "login.html"; 
}

document.addEventListener('DOMContentLoaded', async() => {
  const tabla = document.querySelector('#tablaUsuarios tbody');

  try{
    const response=await fetch('https://dummyjson.com/users');
    if(!response.ok){
        throw new Error("error en la respuesta de la api");
    }
    const data = await response.json();

    data.users.forEach(user => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>
            <button class="btn btn-warning btn-sm me-1">Editar</button>
            <button class="btn btn-danger btn-sm">Borrar</button>
          </td>
          <td>${user.username}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
        `;

        tabla.appendChild(fila);
      });
    }catch(error) {
      console.error('Error al cargar usuarios:', error);
      alert("Hubo un error al cargar los usuarios")
    }
});
