const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

/** Método para crear elementos para links y fotos agregandolas al DOM */ 
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Crear <a></a> para hacer link a Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // crear <img> para la foto
        const img = document.createElement('img');
        img.setAttribute('src', photos.urls.regular);
        img.setAttribute('alt', photo.alt_descripcion);
        img.setAttribute('title', photo.alt_descripcion);
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