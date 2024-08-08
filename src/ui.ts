import { Carta, Tablero, tablero } from "./modelo";
import { sePuedeVoltearLaCarta, voltearLaCarta, sonPareja, parejaEncontrada, parejaNoEncontrada, esPartidaCompleta } from "./motor";


// Función para que cada carta tenga un div con su imagen y el evento de voltear carta
export const crearDivParaCadaCarta = (cartasBarajadasParaJugar: Carta[]): void => {
    const contenedor = document.getElementById("contenedor");
    if (contenedor && contenedor instanceof HTMLDivElement) {
        contenedor.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevas cartas
        cartasBarajadasParaJugar.forEach((carta, indice) => {
            const divCarta = crearCartaElemento(indice);
            contenedor.appendChild(divCarta);
            divCarta.addEventListener('click', () => manejarClickEnCarta(divCarta, tablero, indice));
        });
    }
};

// Función para crear un div para cada carta
const crearCartaElemento = (indice: number): HTMLDivElement => {
    const divCarta = document.createElement('div');
    divCarta.className = `carta carta-${indice}`;
    divCarta.dataset.indiceId = String(indice);

    const imgCarta = document.createElement('img');
    imgCarta.className = 'imagen-carta';
    imgCarta.src = "fondo-carta.jpg"; // Ruta a la imagen por defecto

    divCarta.appendChild(imgCarta);
    return divCarta;
};

// Función para mostrar el número de intentos en la interfaz
export const muestraIntentos = (tablero: Tablero): void => {
    const elementoIntentos = document.getElementById("intentos");
    if (elementoIntentos && elementoIntentos instanceof HTMLDivElement) {
        elementoIntentos.innerHTML = `Llevas ${tablero.intentos} intentos`;
    }
};

// Función para manejar el click en una carta
const manejarClickEnCarta = (divCarta: HTMLDivElement, tablero: Tablero, indice: number): void => {

    voltearCartaYMostrar(divCarta, tablero, indice);

    tablero.intentos += 1;
    muestraIntentos(tablero);

    if (tablero.estadoPartida === "CeroCartasLevantadas") {
        tablero.indiceCartaVolteadaA = indice;
        tablero.estadoPartida = "UnaCartaLevantada";
    } else if (tablero.estadoPartida === "UnaCartaLevantada") {
        tablero.indiceCartaVolteadaB = indice;
        tablero.estadoPartida = "DosCartasLevantadas";
        verificarPareja(tablero);
    }
    console.log(tablero.cartas)

    if (esPartidaCompleta(tablero)) {
        setTimeout(() => alert("¡Felicidades! Has completado la partida."), 1000);
    }
};

// Función para voltear la carta y mostrarla
const voltearCartaYMostrar = (divCarta: HTMLDivElement, tablero: Tablero, indice: number): void => {
    if (!sePuedeVoltearLaCarta(tablero, indice)) {
        if (tablero.cartas[indice].estaVuelta) {
            alert("Esta carta ya está volteada.");
        }
        return;
    }
    divCarta.classList.add('volteada');
    voltearLaCarta(tablero, indice);
};

// Función para restablecer la carta a su estado inicial
const restablecerCarta = (indice: number): void => {
    const divCarta = document.querySelector(`.carta-${indice}`);
    if (divCarta instanceof HTMLDivElement) {
        divCarta.classList.remove('volteada');
        const imgCarta = divCarta.querySelector('img');
        if (imgCarta instanceof HTMLImageElement) {
            imgCarta.src = "fondo-carta.jpg";
        }
    }
};

// Función para verificar si dos cartas son pareja
const verificarPareja = (tablero: Tablero): void => {
    const indiceCartaA = tablero.indiceCartaVolteadaA;
    const indiceCartaB = tablero.indiceCartaVolteadaB;

    if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
        if (sonPareja(indiceCartaA, indiceCartaB, tablero)) {
            parejaEncontrada(tablero, indiceCartaA, indiceCartaB);
            resetearIndicesCartas();
            tablero.estadoPartida = "CeroCartasLevantadas";
        } else {
            setTimeout(() => {
                parejaNoEncontrada(tablero, indiceCartaA!, indiceCartaB!);
                restablecerCarta(indiceCartaA!);
                restablecerCarta(indiceCartaB!);
                resetearIndicesCartas();
                tablero.estadoPartida = "CeroCartasLevantadas";
            }, 1000);
        }
    } 
};


// Función para resetear los índices de las cartas seleccionadas
const resetearIndicesCartas = (): void => {
    tablero.indiceCartaVolteadaA= undefined;
    tablero.indiceCartaVolteadaB= undefined;
};
