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
const buttonStars = document.getElementById('buttonStars');





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
            </div>
            <div>
                <span class="puntuacion">${agregarEstrellas(vote_average)}</span>
            </div>
            <div class="containerResumen"> 
                <h3 class="elh3">
                Sinopsis
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

const agregarEstrellas = (star) => {

    const stars = document.innerText = `<i class="iconStar fas fa-star"></i>`;
    const starsH = document.innerText = `<i class="iconStar fas fa-star-half-alt"></i>`;
    const stars0 = document.innerText = `<i class="iconStar far fa-star"></i>`;

    if(star >= 10){
        return stars.repeat(5);
    }
    else if(star >= 9){
        return stars.repeat(4)+starsH;
    }
    else if(star >= 8){
        return stars.repeat(4);
    }
    else if(star >= 7){
        return stars.repeat(3)+starsH;
    }
    else if(star >= 6){
        return stars.repeat(3);
    }
    else if(star >= 5){
        return stars.repeat(2)+starsH;
    }
    else if(star >= 4){
        return stars.repeat(2);
    }
    else if(star >= 3){
        return stars+starsH;
    }
    else if(star >= 2){
        return stars;
    }
    else if(star >= 1){
        return starsH;
    }
    else if(star >= 0){
        return stars0;
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

  
buttonStars.addEventListener('click', ordenarPorPuntuacion = () =>{

   

    fetch(`https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}`).then(res => res.json()).then(data => {
        mostrarPeliculas(data.results);
       
    });

        
       
    });

