//Este archivo es para los filtros

document.addEventListener('DOMContentLoaded', function() {
    const filtros = document.querySelectorAll('.filtro-btn');
    const cards = document.querySelectorAll('.servicio-card');

    // Función para filtrar servicios
    const filtrarServicios = (categoria) => {
        cards.forEach(card => {
            card.style.display = (card.dataset.categoria === categoria || categoria === 'all') ? 
                               'block' : 'none';
        });
    };

    // Event listeners para filtros
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            filtros.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            filtrarServicios(this.dataset.target);
        });
    });

    // Sistema de presupuesto
    const carrito = [];
    
    document.querySelectorAll('.card-boton').forEach(boton => {
        boton.addEventListener('click', function() {
            const servicio = {
                nombre: this.closest('.servicio-card').querySelector('h3').textContent,
                precio: this.closest('.servicio-card').querySelector('span').textContent,
                categoria: this.closest('.servicio-card').dataset.categoria
            };
            
            carrito.push(servicio);
            actualizarPresupuesto();
        });
    });

    function actualizarPresupuesto() {
        // Aquí iría la lógica para actualizar la UI del presupuesto
        console.log('Carrito actual:', carrito);
    }
});