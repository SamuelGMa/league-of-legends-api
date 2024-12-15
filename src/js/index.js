import Champion from "./classes/Champion";

// Guardado de los campeones en el array
const startChampions = async () => {
    var championData;
    try {
        // Obtencion de la lista de campeones
        const response = await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json");
        championData = await response.json();
    } catch (error) {
        console.error("Error fetching champions:", error);
    }
    // Acceso al objeto `data` que contiene los campeones
    const champions = championData.data;

    // Iterar sobre los campeones
    for (const championKey in champions) {
        const championName = champions[championKey].id;
        try {
            // Obtener la información individual de cada campeón y guardado en array
            const championResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion/${championName}.json`);
            const championDetails = await championResponse.json();
            championsList.push(new Champion(Object.values(championDetails.data)[0]));
        } catch (error) {
            console.error(`Error fetching champion ${championName} :`, error);
        }
    }
};

// Obtencion de imagen de skin del campeon
const getSkinImage = (championName, num) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${num}.jpg`;
};

// Obtencion de imagen de icono del campeon
const getIconImage = (championName) => {
    return `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championName}.png`;
};

// Efecto de movimiento del fondo al mover el cursor sobre la pantalla
document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 30; // Ajusta la sensibilidad horizontal
    const y = (event.clientY / window.innerHeight - 0.5) * 30; // Ajusta la sensibilidad vertical

    background.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

// Creacion y adicion de una nueva tarjeta de campeon al DOM
function addNewChampion(champion) {
    // Creacion del contenedor principal .champion-card
    let championCard = document.createElement('div');
    championCard.classList.add('champion-card');
    championCard.dataset.championId = champion.id;

    // Creacion del div para la imagen .champion-image
    let championImage = document.createElement('div');
    championImage.classList.add('champion-image');
    setChampionImage(championImage, champion, 0);

    // Creacion del div para el nombre .champion-name
    let championName = document.createElement('div');
    championName.classList.add('champion-name');
    championName.textContent = champion.name;

    // Agregar el .champion-image y .champion-name al .champion-card
    championCard.appendChild(championImage);
    championCard.appendChild(championName);

    // Agregar el .champion-card al contenedor
    championsContainer.appendChild(championCard);

    // Agregar hover a la tarjeta
    hoverChampion(championCard, champion, championImage);
}


// Setteo de imagen a tarjeta de campeon
async function setChampionImage(championImageElement, champion, number) {
    let image = getSkinImage(champion.id, number);
    // Asignar la imagen de fondo
    championImageElement.style.backgroundImage = `url(${image})`;
}

// Hover para alternar entre imagenes en tarjeta de campeon
function hoverChampion(card, champion, championImage) {
    // Cuando el ratón entra en el área del div
    card.addEventListener('mouseover', function() {
        setChampionImage(championImage, champion, 1);
    });

    // Cuando el ratón sale del área del div
    card.addEventListener('mouseout', function() {
        setChampionImage(championImage, champion, 0);
    });
}

// Función para abrir el modal del campeon
function openModal(champion) {

    // Apartados de informacion del campeon en el modal
    document.getElementById('champion-name').textContent = champion.name;       // Nombre del campeon
    document.getElementById('champion-title').textContent = champion.title;     // Titulo del campeon
    document.getElementById('champion-info').textContent = champion.lore;       // Historia del campeon
    document.getElementById('champion-ally-tips').innerHTML = '';               // Consejos de aliados del campeon
    document.getElementById('champion-enemy-tips').innerHTML = '';              // Consejos de enemigos del campeon

    // Si el campeon tiene consejos de aliado se agregan al modal
    if (champion.allyTips.length > 0) {
        document.getElementById('ally-tips-title').style.display = 'block';
        document.getElementById('champion-ally-tips').innerHTML = '<ul>';

        champion.allyTips.forEach(tip => {
            document.getElementById('champion-ally-tips').innerHTML += `<li>${tip}</li>`;
        });
        document.getElementById('champion-ally-tips').innerHTML += '</ul>';
    } else {
        document.getElementById('ally-tips-title').style.display = 'none';
    }

    // Si el campeon tiene consejos de enemigo se agregan al modal
    if (champion.enemyTips.length > 0) {
        document.getElementById('enemy-tips-title').style.display = 'block';
        document.getElementById('champion-enemy-tips').innerHTML = '<ul>';

        champion.allyTips.forEach(tip => {
            document.getElementById('champion-enemy-tips').innerHTML += `<li>${tip}</li>`;
        });
        document.getElementById('champion-enemy-tips').innerHTML += '</ul>';
    } else {
        document.getElementById('enemy-tips-title').style.display = 'none';
    }

    // Mostrar el modal
    document.getElementById('modal').style.display = 'flex';

    // Agregar imagen de icono del campeon al modal
    let image = getIconImage(champion.id);
    championIcon.style.backgroundImage = `url(${image})`;

    skinsContainer.innerHTML = '';

    // Si el campeon tiene skins se agregan sus imagenes al carrusel del modal
    if (champion.skins.length > 0) {
        skinsContainer.style.display = 'flex';               // Mostrar el contenedor
        skinsContainer.style.transform = 'translateX(0)';    // Restablecer la posición a la izquierda

        // Iteracion sobre las skins y agregar imagenes al contenedor
        for (let i = 0; i < champion.skins.length; i++) {
            const skin = champion.skins[i];
            const skinUrl = getSkinImage(champion.id, skin.num);

            // Creacion del div para la skin
            const skinDiv = document.createElement('div');
            skinDiv.classList.add('skin-image');
            skinDiv.style.backgroundImage = `url(${skinUrl})`;

            // Eventos en imagenes de carrusel para abrir en tamaño completo en otra pestaña
            skinDiv.addEventListener('click', () => {
                const imageUrl = skinUrl;
        
                // Abre la imagen en una nueva pestaña
                window.open(imageUrl, '_blank');
            });

            // Agregar la skin al contenedor
            skinsContainer.appendChild(skinDiv);
        }
        // Establecer la posicion del carrusel al principio para evitar saltos inadecuados entre modal y modal
        currentIndex = 0;
        
    } else {
        // Ocultar contenedor si no hay skins
        skinsContainer.style.display = 'none'; 
    }

    // Mostrar el modal
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Evento para cerrar el modal cuando se hace clic en la "X"
document.getElementById('close-modal').addEventListener('click', closeModal);

// Evento para cerrar el modal cuando se hace clic fuera del modal-content
document.getElementById('modal').addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        closeModal();
    }
});


// Funcion para deslizar entre imagenes en el carrusel de imagenes del modal hacia la direccion indicada
function slideSkins(direction) {
    const skins = document.querySelectorAll('.skin-image');
    const visibleSkins = Math.floor(skinsContainer.parentElement.offsetWidth / skins[0].offsetWidth);
    const jump = 3; // Número de imágenes a desplazar por salto
    const maxIndex = Math.max(0, skins.length - visibleSkins); // Último índice permitido

    // Calcula el nuevo índice según la dirección
    if (direction === 'left') {
        currentIndex = Math.max(0, currentIndex - jump);
    } else if (direction === 'right') {
        currentIndex = Math.min(maxIndex, currentIndex + jump);
    }

    // Ajusta el desplazamiento del contenedor
    const skinWidth = skins[0].offsetWidth + 10; // Ancho de cada skin + espacio entre imágenes
    skinsContainer.style.transform = `translateX(-${currentIndex * skinWidth}px)`;
} 

async function initialize() {

    // Guardado de campeones
    await startChampions();

    // Copia de campeones a formato mapa
    championsList.forEach(champ => {
        championsMap.set(champ.id, champ);
    });

    // Agregar tarjetas individuales de cada campeon al contenedor
    championsList.forEach(champion => {
        addNewChampion(champion)
    });

    // Agregar evento click a cada tarjeta de campeon para abrir modal con informacion del campeon
    document.querySelectorAll('.champion-card').forEach(card => {
        card.addEventListener('click', () => openModal(championsMap.get(card.dataset.championId)));
    });

    // Agregar eventos click a los deslizadores para moverse a traves del carrusel de imagenes del campeon
    document.querySelector('.carousel-button.left').addEventListener('click', () => slideSkins('left'));
    document.querySelector('.carousel-button.right').addEventListener('click', () => slideSkins('right'));
}


// Array de campeones
const championsList = [];
// Contenedor con las tarjetas de los campeones
const championsContainer = document.getElementById('champions-container');
// Mapa clave-valor de los campeones con IDENTIFICADOR
const championsMap = new Map();
// Contenedor de imagenes del campeon
const skinsContainer = document.getElementById('skins-container');
// Posicion actual del carrusel de imagenes
let currentIndex = 0;
// Fondo de pantalla de la ventana
const background = document.getElementById('background-image');
// Icono del campeon en el modal
const championIcon = document.getElementById('champion-icon');

// Inicializacion de tarjetas de campeones y funcionalidad de las mismas
initialize();