import {DATOS_INICIALES} from "./datos.js";

if (!localStorage.getItem("halls")) {
    localStorage.setItem("halls", JSON.stringify(DATOS_INICIALES));
    localStorage.setItem("hallId", "2")
}