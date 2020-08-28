const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

/** Metodo para crear atributo a elementos del DOM */
function setAttributes(element, attributes) {
    // for in es muy util con objetos { llave1: atributo1, llave2: atributo2 }
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/** Método para crear elementos para links y fotos agregandolas al DOM */ 
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Crear <a></a> para hacer link a Unsplash
        const item = document.createElement('a');
        setAttributes( item, 
            { href: photo.links.html,
              target: '_blank' });
        // crear <img> para la foto
        const img = document.createElement('img');
        setAttributes( img,
            { src: photo.urls.regular,
              alt: photo.alt_descripcion,
              title: photo.alt_descripcion });
        // Metiendo el img dentro del a, y luego estos dentro del imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unslash API
const count = 10;
const apiKey = 'TzTmzdVhU0N4x38AllxFmt3Mxky7a1rXoZc6TbAdrO8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

/** Obtener fotos del API de splash */
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        console.error(error);
    }
}

// Al cargar
getPhotos();