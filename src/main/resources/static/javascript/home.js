const moviesContainer = document.querySelector('#movies-container')
const form = document.querySelector('form')

const headers = {
    'Content-Type' : 'application/json'
}

const baseURL = "http://localhost:8080/api/v1/movies/"

const handleSubmit = async (e) => {
    e.preventDefault()

    let bodyObj = {
        title: document.getElementById("title").value,
        duration: document.getElementById("duration").value,
        director: document.getElementById("director").value,
        genre: document.getElementById("genre").value,
        maturityRating: document.getElementById("maturityRating").value,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value
    }

    await addMovie(bodyObj);

    document.getElementById("title").value = '';
    document.getElementById("duration").value = '';
    document.getElementById("director").value = '';
    document.getElementById("genre").value = '';
    document.getElementById("maturityRating").value = '';
    document.getElementById("description").value = '';
    document.getElementById("image").value = '';
}

async function addMovie(obj) {
    const response = await fetch(`${baseURL}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        return getAllMovies();
    }
}

async function getAllMovies() {
    await fetch(`${baseURL}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createMovieCard(data))
        .catch(err => console.error(err))
}

function createMovieCard(movieArr) {
    moviesContainer.innerHTML = '';

    movieArr.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <a href="movie.html?id=${movie.id}">
                <img alt="movie cover" src=${movie.image} class="movie-cover"/>
            </a>
            <p class="movie-title">${movie.title}</p>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

getAllMovies();
form.addEventListener("submit", handleSubmit)