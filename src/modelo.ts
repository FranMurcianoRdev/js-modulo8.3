export interface Carta {
    idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
    // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
    imagen: string; // por comodidad repetimos la url de la imagen
    estaVuelta: boolean;
    encontrada: boolean;
}

interface InfoCarta {
    idFoto: number;
    imagen: string;
}

const infoCartas: InfoCarta[] = [
    /* Aquí ponemos seis cartas siguiendo la interfaz de InfoCarta */
    {
        idFoto: 1,
        imagen: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/512px/1f436.png",
    },
    {
        idFoto: 2,
        imagen: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/512px/1f431.png",
    },
    {
        idFoto: 3,
        imagen: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/512px/1f42f.png",
    },
    {
        idFoto: 4,
        imagen: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/512px/1f439.png",
    },
    {
        idFoto: 5,
        imagen: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/512px/1f42e.png",
    },
    {
        idFoto: 6,
        imagen: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/512px/1f437.png",
    },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
    idFoto,
    imagen,
    estaVuelta: false,
    encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
    /* Aquí crearemos un array de cartas a partir de un array de infoCartas
    y duplicaremos las cartas para que haya dos de cada tipo.
    */
    const barajaDuplicada: Carta[] = []; // Array auxiliar para acumular las cartas duplicadas
    
    infoCartas.forEach((carta) => {
        const nuevaCarta = crearCartaInicial(carta.idFoto, carta.imagen);
        barajaDuplicada.push(nuevaCarta, nuevaCarta); // Duplicamos la carta
    });
    return barajaDuplicada; // Devolvemos el array con las cartas duplicadas
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
    Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
    EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
  */

type EstadoPartida =
    | "PartidaNoIniciada"
    | "CeroCartasLevantadas"
    | "UnaCartaLevantada"
    | "DosCartasLevantadas"
    | "PartidaCompleta";

export interface Tablero {
    cartas: Carta[];
    estadoPartida: EstadoPartida;
    indiceCartaVolteadaA?: number;
    indiceCartaVolteadaB?: number;
    intentos: number;
};

const crearTableroInicial = (): Tablero => ({
    cartas: cartas,
    estadoPartida: "PartidaNoIniciada",
    intentos: 0,
});

export let tablero: Tablero = crearTableroInicial();