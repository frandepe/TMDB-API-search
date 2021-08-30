const BASE_URL = 'https://api.themoviedb.org/3';

// clave de la api 01d9b5c42b5388963e32b24f9cb4247d
// Token de acceso de lectura a la API (v4 auth): eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWQ5YjVjNDJiNTM4ODk2M2UzMmIyNGY5Y2I0MjQ3ZCIsInN1YiI6IjYxMjlhMTExNDJmMTlmMDA5NTc3NmMyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7-zcrXhwCz2ZG_xRV9tC_As78yNUWdAP65IBX8AAN0Y
// Ejemplo de solicitud de API: https://api.themoviedb.org/3/movie/550?api_key=01d9b5c42b5388963e32b24f9cb4247d

const API_KEY = 'api_key=01d9b5c42b5388963e32b24f9cb4247d';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL+'/search/movie?'+API_KEY;
const container = document.getElementById('container');
const main = document.getElementById('main');
const formulario = document.getElementById('formulario');
const inputText = document.getElementById('inputText');






const obtenerPeliculas = async () => {
    try{
        await fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`).then(res => res.json()).then(data => {
            mostrarPeliculas(data.results);
           
        });
        
   
    }catch(error){
        console.log(error);
    }

}

obtenerPeliculas();

const mostrarPeliculas = (data) => {
    main.innerHTML = '';

    data.forEach(peli => {
        const {title, poster_path, vote_average, overview} = peli;
        const pelicula = document.createElement('div');
        pelicula.classList.add('container');
        pelicula.className = 'contenedor'
        pelicula.innerHTML = `
        


        <div class="movie-info">
            <img src="${IMG_URL+poster_path} " alt="${title}">
            <div class="tituloPuntuacion">
                <h2 class="tituloh2">${title}</h2>
                <span class="puntuacion ${colorearPuntuacion(vote_average)}">${vote_average}</span>
            </div>
            <div class="containerResumen"> 
                <h3 class="elh3">
                Resumen
                </h3>
                <p class="elp">
                ${overview}
                </p>
            </div>
        </div>

       

    


        `

        main.appendChild(pelicula);
        
    });
    

    
    
}

const colorearPuntuacion = (vote) => {
    if(vote >= 8){
        return 'green';
    }
    else if(vote >= 6){
        return 'orange';
    }
    else{
        return 'red';
    }
}

formulario.addEventListener('submit', submitear = (e) => {

    e.preventDefault();
    const buscarPeli = inputText.value.toUpperCase();
    console.log(buscarPeli);
        
    if (buscarPeli === ""){
        fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`).then(res => res.json()).then(data => {
            mostrarPeliculas(data.results);
           
        });
    }
    else{
        fetch(searchURL+'&query='+buscarPeli).then(res => res.json()).then(data => {
            mostrarPeliculas(data.results);
           
        });
    }
    
    });

    