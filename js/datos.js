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
        titulo: "Bandas en vivo",
        descripcion: "Bandas de los mejores generos para elegir",
        valor: 300,
        estado: "Disponible",
        imagen: "img/servicios/bandasEnVivo.jpg"
    },
    {
        id: 2,
        titulo: "Magos e ilusionismo",
        descripcion: "Los mejores magos y artistas de la ilusion, a tu disposicion",
        valor: 450,
        estado: "Reservado",
        imagen: "img/servicios/ilusionismo.jpg"
    },
    {
        id: 3,
        titulo: "Dj Premium",
        descripcion: "Los mejores dj para ponerte la mejor musica del momennto",
        valor: 600,
        estado: "Disponible",
        imagen: "img/servicios/djPremium.jpg"
    }
];

window.SALONES_INICIALES = SALONES_INICIALES;
window.SERVICIOS_INICIALES = SERVICIOS_INICIALES;