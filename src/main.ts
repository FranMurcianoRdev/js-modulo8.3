import { iniciaPartida } from "./motor";
import { tablero } from "./modelo";
import { crearDivParaCadaCarta, muestraIntentos } from "./ui";

const handleIniciarPartida = () => {
    iniciaPartida(tablero);
    crearDivParaCadaCarta(tablero.cartas);
    muestraIntentos(tablero);
};

document.addEventListener('DOMContentLoaded', () => {
    const botonIniciarPartida = document.getElementById("iniciar-partida");
    if (botonIniciarPartida && botonIniciarPartida instanceof HTMLButtonElement) {
        botonIniciarPartida.addEventListener("click", handleIniciarPartida);
    }
});
