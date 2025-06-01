export const SALONES_INICIALES = [
    {
        id: 1,
        titulo: "Salon Fiesta",
        descripcion: "ideal para cumpleaños infantiles",
        direccion: "Pepperoni 1765",
        valor: 570,
        estado: "Disponible",
        imagen: "img/salones/salones-infantiles/salonInfantil1.jpg",
        role: "salon"
    },

    {
        id: 2,
        titulo: "Salon Fiesta Dos",
        descripcion: "ideal para cumpleaños infantiles dos",
        direccion: "Albaca 1755",
        valor: 1000,
        estado: "Reservado",
        imagen: "img/salones/salones-infantiles/salonInfantil2.jpg"
    },

    {
        id: 3,
        titulo: "Salon Fiesta Tres",
        descripcion: "ideal para cumpleaños infantiles Tres",
        direccion: "Tomatioli 175",
        valor: 100,
        estado: "Disponible",
        imagen: "img/salones/salones-infantiles/salonInfantil3.jpg"
    }
];


export const SERVICIOS_INICIALES = [
  {
    id: 1,
    titulo: "Animación infantil",
    descripcion: "Payasos, magos y shows temáticos para cumpleaños.",
    valor: 300,
    estado: "Disponible",
    imagen: "img/servicios/animacion1.jpg",
    role: "servicio"
  },
  {
    id: 2,
    titulo: "Catering Básico",
    descripcion: "Snacks, gaseosas y torta personalizada.",
    valor: 450,
    estado: "Reservado",
    imagen: "img/servicios/catering1.jpg"
  },
  {
    id: 3,
    titulo: "Decoración Temática",
    descripcion: "Globos, pancartas, y ambientación temática.",
    valor: 600,
    estado: "Disponible",
    imagen: "img/servicios/decoracion1.jpg"
  }
];

window.SALONES_INICIALES = SALONES_INICIALES;
window.SERVICIOS_INICIALES = SERVICIOS_INICIALES;