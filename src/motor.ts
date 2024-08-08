import { Carta, Tablero } from "./modelo";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
    let indiceActual = cartas.length;

    // Mientras queden elementos por barajar
    while (indiceActual != 0) {
        // Se elige un elemento al azar
        let indiceAleatorio = Math.floor(Math.random() * indiceActual);
        indiceActual--;
        // y se intercambian entre sí
        [{...cartas[indiceActual]}, {...cartas[indiceAleatorio]}] = 
        [cartas[indiceAleatorio], cartas[indiceActual]];
    }
    return cartas;
};

/*
Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
    // La carta específica que queremos voltear
    return (!tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta);
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
        // Obtener la carta específica del índice
        const carta = tablero.cartas[indice];

        // Cambiar el estado de la carta a volteada
        carta.estaVuelta = true;

        // Actualizar la imagen de la carta en la interfaz de usuario
        const divCarta = document.querySelector(`.carta-${indice}`);
        if (divCarta instanceof HTMLDivElement) {
            const imgCarta = divCarta.querySelector('img');
            if (imgCarta instanceof HTMLImageElement) {
                imgCarta.src = carta.imagen;
            }
        }
};

/*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

/*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida está completa.
*/
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
    const carta1 = tablero.cartas[indiceA];
    const carta2 = tablero.cartas[indiceB]; 

    // Marcar las cartas como encontradas
    carta1.encontrada = true;
    carta2.encontrada = true;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;

    // Comprobar si todas las cartas están encontradas
    const todasEncontradas = tablero.cartas.every(carta => carta.encontrada);
    
    // Si todas las cartas están encontradas, actualizar el estado de la partida
    if (todasEncontradas) {
        tablero.estadoPartida = "PartidaCompleta";
    }
};

/*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
    // Seleccionamos las cartas
    const carta1 = tablero.cartas[indiceA];
    const carta2 = tablero.cartas[indiceB];
    
    // Cambiar el estado de las cartas a no volteadas
    carta1.estaVuelta = false;
    carta2.estaVuelta = false;
    
    // Seleccionamos los div de cada foto
    const divCarta1 = document.querySelector(`.carta-${indiceA}`);
    const divCarta2 = document.querySelector(`.carta-${indiceB}`);
    
    // Asignamos de nuevo la imagen de div al default
    if (divCarta1 instanceof HTMLDivElement && divCarta2 instanceof HTMLDivElement) {
        const imgCarta1 = divCarta1.querySelector('img');
        const imgCarta2 = divCarta2.querySelector('img');
        if (imgCarta1 instanceof HTMLImageElement && imgCarta2 instanceof HTMLImageElement) {
            imgCarta1.src = "fondo-carta.jpg";
            imgCarta2.src = "fondo-carta.jpg";
        }
    }
 // Resetear los índices de las cartas volteadas
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
}
/*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero): boolean => {  
    return (tablero.cartas.every(carta => carta.encontrada) || tablero.estadoPartida === "PartidaCompleta") 
};

/*
Iniciar partida
*/
export const iniciaPartida = (tablero: Tablero): void => {
    tablero.cartas = barajarCartas(tablero.cartas);
    tablero.estadoPartida = "CeroCartasLevantadas";
    tablero.intentos= 0;// Reiniciar intentos al iniciar partida
};
