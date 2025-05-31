import {SALONES_INICIALES} from "./datos.js";

if (!localStorage.getItem("halls")) {
    localStorage.setItem("halls", JSON.stringify(SALONES_INICIALES));
    localStorage.setItem("hallId", "2")
}