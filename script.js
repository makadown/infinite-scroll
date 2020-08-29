// Unslash API
const count = 30;
const apiKey = 'TzTmzdVhU0N4x38AllxFmt3Mxky7a1rXoZc6TbAdrO8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

/** Cuando carga la pagina esta variable debe ser false */
let ready = false;
/** Numero acumulativo que se incrementará hasta [count] */
let imagesLoaded = 0;
/** Para estar al tanto de las imagenes en total de modo que sepamos que todo se ha cargado */
let totalImages = 0;

let photosArray = [];

/** Metodo para crear atributo a elementos del DOM */
function setAttributes(element, attributes) {
    // for in es muy util con objetos { llave1: atributo1, llave2: atributo2 }
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/**
 * Checar si todas las imagenes han sido cargadas.
 * Este metodo se cargará por cada imagen individual.
 */
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0;
        console.log('ready =', ready);
    }
}

/** Método para crear elementos para links y fotos agregandolas al DOM */
function displayPhotos() {
    totalImages = photosArray.length;
    console.log('totalImages:',totalImages);
    photosArray.forEach((photo) => {
        // Crear <a></a> para hacer link a Unsplash
        const item = document.createElement('a');
        setAttributes(item,
            {
                href: photo.links.html,
                target: '_blank'
            });
        // crear <img> para la foto
        const img = document.createElement('img');
        setAttributes(img,
            {
                src: photo.urls.regular,
                alt: photo.alt_descripcion,
                title: photo.alt_descripcion
            });
        // escuchar el evento, checando que cada imagen haya terminado de cargar
        img.addEventListener('load', imageLoaded)
        // Metiendo el img dentro del a, y luego estos dentro del imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

/** Obtener fotos del API de splash */
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.error(error);
    }
}

/** Checar si el scroll esta cerca del fondo de pantalla para cargar mas fotos */
window.addEventListener('scroll', () => {
    /*  window.scrollY 
      representa la distancia desde el top de la pagina donde el usuario ha scrolleado.
        window.innerHeight 
     representa la altura total de la ventana del navegador
        documento.body.offsetHeight
     representa la altura de toodo lo del body, incluyendo lo que no se ve a la vista.
     
     Necesitamos sustraer de offsetHeight para activar el evento antes que se alcance
     el fondo de todo... */
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && ready) {
        ready = false;
        getPhotos();
    }
});

// Al cargar
getPhotos();