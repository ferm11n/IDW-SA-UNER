import { SALONES_PRINCIPALES} from "./datos.js";

const STORAGE_PRINCIPAL = 'salonesEventos';

function inicializarLocalStorage() {
    if (!localStorage.getItem(STORAGE_PRINCIPAL)) {
        localStorage.setItem(STORAGE_PRINCIPAL, JSON.stringify(SALONES_PRINCIPALES));
        console.log('LocalStorage inicializado');
    }
}

function obtenerSalones() {
    return JSON.parse(localStorage.getItem(STORAGE_PRINCIPAL)) || [];
}

inicializarLocalStorage()