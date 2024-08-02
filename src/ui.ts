import { Carta, Tablero, tablero } from "./modelo";
import { sePuedeVoltearLaCarta, voltearLaCarta, sonPareja, parejaEncontrada, parejaNoEncontrada, esPartidaCompleta } from "./motor";

let primeraCartaIndice: number | null = null;
let segundaCartaIndice: number | null = null;

// Función para que cada carta tenga un div con su imagen y el evento de voltear carta
export const crearDivParaCadaCarta = (cartasBarajadasParaJugar: Carta[]): void => {
    const contenedor = document.getElementById("contenedor");
    if (contenedor && contenedor instanceof HTMLDivElement) {
        contenedor.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevas cartas
        cartasBarajadasParaJugar.forEach((carta ,indice) => {
            const divCarta = document.createElement('div');
            divCarta.className = `carta carta-${indice}`;
            divCarta.dataset.indiceId = String(indice);
            const imgCarta = document.createElement('img');
            imgCarta.className = 'imagen-carta';
            imgCarta.src = "fondo-carta.jpg"; // Ruta a la imagen por defecto
            divCarta.appendChild(imgCarta);
            contenedor.appendChild(divCarta);
            divCarta.addEventListener('click', () => manejarClickEnCarta(divCarta, tablero, indice));
        });
    }
};



export const muestraIntentos = (tablero: Tablero): void => {
    const elementoIntentos = document.getElementById("intentos");
    if (elementoIntentos && elementoIntentos instanceof HTMLDivElement) {
        elementoIntentos.innerHTML = `Llevas ${tablero.intentos} intentos`;
    }
};

const manejarClickEnCarta = (divCarta: HTMLDivElement, tablero: Tablero, indice: number): void => {
    if (!sePuedeVoltearLaCarta(tablero, indice)) {
        //mostrar mensaje si la carta ya está vuelta
        if (tablero.cartas[indice].estaVuelta) {
            alert("Esta carta ya está volteada.");
        }
        return;
    }
    // Añadir la clase de animación
    divCarta.classList.add('volteada');
    //voltear la carta
    voltearLaCarta(tablero, indice);

    // Incrementar el contador de intentos
    tablero.intentos += 1;
    muestraIntentos(tablero);
    //comprobaciones para ver si son o no pareja
    if (primeraCartaIndice === null) {
        primeraCartaIndice = indice;
        tablero.estadoPartida = "UnaCartaLevantada";
    } else if (segundaCartaIndice === null) {
        segundaCartaIndice = indice;
        tablero.estadoPartida = "DosCartasLevantadas";

        // Verificar si son pareja
        if (sonPareja(primeraCartaIndice, segundaCartaIndice, tablero)) {
            parejaEncontrada(tablero, primeraCartaIndice, segundaCartaIndice);
            primeraCartaIndice = null;
            segundaCartaIndice = null;
            tablero.estadoPartida = "CeroCartasLevantadas";
        }else {
            setTimeout(() => {
                parejaNoEncontrada(tablero, primeraCartaIndice!, segundaCartaIndice!);
                const primeraDivCarta = document.querySelector(`.carta-${primeraCartaIndice}`);
                const segundaDivCarta = document.querySelector(`.carta-${segundaCartaIndice}`);
                if (primeraDivCarta instanceof HTMLDivElement) {
                    primeraDivCarta.classList.remove('volteada');
                    // Restablecer la imagen a la imagen por defecto
                    const primeraImgCarta = primeraDivCarta.querySelector('img');
                    if (primeraImgCarta instanceof HTMLImageElement) {
                        primeraImgCarta.src = "fondo-carta.jpg";
                    }
                }
                if (segundaDivCarta instanceof HTMLDivElement) {
                    segundaDivCarta.classList.remove('volteada');
                    // Restablecer la imagen a la imagen por defecto
                    const segundaImgCarta = segundaDivCarta.querySelector('img');
                    if (segundaImgCarta instanceof HTMLImageElement) {
                        segundaImgCarta.src = "fondo-carta.jpg";
                    }
                }
                primeraCartaIndice = null;
                segundaCartaIndice = null;
                tablero.estadoPartida = "CeroCartasLevantadas";
            }, 1000); // Espera un segundo antes de voltear las cartas nuevamente
        }
    }

    // Comprobar si la partida está completa
    if (esPartidaCompleta(tablero)) {
        setTimeout(()=> {alert("¡Felicidades! Has completado la partida.")}, 1000);
    }
};

