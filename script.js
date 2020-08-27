const count = 10;
const apiKey = 'TzTmzdVhU0N4x38AllxFmt3Mxky7a1rXoZc6TbAdrO8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

/** Obtener fotos del API de splash */
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await responde.json();
        console.log(data);
    } catch(error) {
        console.error(error);
    }
}