
// Función para barajar las cartas
const barajarCartas = (arrayCartas: InfoCarta[]): InfoCarta[] => {
    let indiceActual = arrayCartas.length;

    // Mientras queden elementos por barajar
    while (indiceActual != 0) {
        // Se elige un elemento al azar
        let indiceAleatorio = Math.floor(Math.random() * indiceActual);
        indiceActual--;
        // y se intercambian entre sí
        [arrayCartas[indiceActual], arrayCartas[indiceAleatorio]] = 
        [arrayCartas[indiceAleatorio], arrayCartas[indiceActual]];
    }
    return arrayCartas;
};

// Definición de la interfaz InfoCarta
interface InfoCarta {
    idFoto: number;
    imagen: string;
};

// Definición del array de cartas
const cartas: InfoCarta[] = [
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

// Función para duplicar el array de cartas y barajarlas
const crearCartasAleatorias = (cartas: InfoCarta[]): InfoCarta[] => {
    const cartasDuplicadas = [...cartas, ...cartas];
    const cartasAleatorias = barajarCartas(cartasDuplicadas);
    return cartasAleatorias;
};

// Función para que cada carta tenga un div con su imagen
const crearDivParaCadaCarta = (cartasAleatorias: InfoCarta[]): void => {
    // Se selecciona el div en el que irán todos los demás con las cartas
    const contenedor = document.getElementById("contenedor");

    if (contenedor && contenedor instanceof HTMLDivElement) {
        cartasAleatorias.forEach((carta) => {
            // Creamos el div de la carta
            const divCarta = document.createElement('div');
            divCarta.className = 'carta';
            divCarta.dataset.indiceId = String(carta.idFoto);
            // Creamos la imagen para la carta 
            const imgCarta = document.createElement('img');
            imgCarta.className = 'imagen-carta';
            imgCarta.dataset.indiceId = String(carta.idFoto);
            // Añadimos la img al divCarta y luego el divCarta al div Contenedor
            divCarta.appendChild(imgCarta);
            contenedor.appendChild(divCarta);

            // Añadimos el evento de click para voltear la carta
            divCarta.addEventListener('click', function() {
                imgCarta.src = carta.imagen; // Cambia la imagen al animal que hay detrás
            });
        });
    }
};

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const cartasAleatorias = crearCartasAleatorias(cartas);
    crearDivParaCadaCarta(cartasAleatorias);
});
