//ARCHIVO MOMENTANEO
let cantidad = 4
let inicio = 0



async function getLandingPublications(){
	/*< consulta a la API */
	const response = await fetch(`${URL_BASE}/api/publicaciones/getLanding`);
	/*< convierte la respuesta a formato json */
	const data = await response.json();

	return data;
}

async function getPublications(inicio, cantidad){
	/*< consulta a la API */
	const response = await fetch(`${URL_BASE}/api/publicaciones/get/?inicio=`+inicio+"&cantidad="+cantidad);
	/*< convierte la respuesta a formato json */
	const data = await response.json();

	return data;
}

function showLandingPublications(){

 	// Llamada a la función asincrona que obtiene un listado de usuarios
 	getLandingPublications().then( data => {

 		/*< si hay elementos en el listado*/
 		if(data.list.errno!=411){

 			const publications = data.list;

 			publications.forEach( publication => {

 				addCardPublication(publication);

 			});

 		}else{
 			stream__listado.innerHTML = data.list.error;
 		}

 	} )
}

function addCardPublication(data){
	const tpl = tpl__card__publication.content;
	const clon = tpl.cloneNode(true);

	// capturo la referencia al elemento de la imagen ya que no sabemos cuanto tardara la funcion asincrona
	let imgElement = clon.querySelector('.card-image')

	fetchWorkingImages(data.ID_PUBLICACION).then(image => {
            imgElement.src = image;
    })

	clon.querySelector(".card").setAttribute("id-service", data.token_publicacion);
	clon.querySelector(".service__title").textContent = data.titulo;

	let stars = clon.querySelector(".service__qualification").querySelectorAll(".star")

	for (var i = data.calificacion - 1; i >= 0; i--) {
		stars[i].classList.remove("inactive");
		stars[i].textContent = '★';
	}

	clon.querySelector(".service__price").textContent = data.precio;

	stream__services__list.appendChild(clon);
}

showLandingPublications();




async function fetchWorkingImages(id) {

	const apiKey = '6qH8FKd4fj2D2x4J4ierJSh2KRfpEvRZ6H7oXZgKAJ8kvm0mT6CsN6sq'; // Reemplaza esto con tu clave de API
	const query = 'people working'; // Término de búsqueda

    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1&page=${id}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: apiKey // Autenticación con la clave de API
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching images from Pexels API');
        }

        const data = await response.json();
       // console.log('Images:', data.photos); // Aquí puedes ver las imágenes obtenidas

        return data.photos[0].src.medium;
        
        // // Opcional: puedes mostrar las imágenes en tu página
        // data.photos.forEach(photo => {
        //     const imgElement = document.createElement('img');
        //     imgElement.src = photo.src.medium;
        //     document.body.appendChild(imgElement); // Añadir la imagen al body o a donde desees en tu página
        // });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamar a la función para obtener imágenes aleatorias
fetchWorkingImages();