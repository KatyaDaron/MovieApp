// Getting the movie ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const baseURL = "http://localhost:8080/api/v1/movies/"

const headers = {
    'Content-Type' : 'application/json'
}

// Fetching and displaying the movie details using the movie ID
async function getMovieDetails(movieId) {
    const response = await fetch(`${baseURL}${movieId}`, {
        method: "GET",
        headers: headers
    });
    const data = await response.json();

    // Displaying the movie details using the retrieved data
    document.getElementById("movie-title").textContent = data.title;
    document.getElementById("movie-duration").textContent = data.duration + " minutes";
    document.getElementById("movie-director").textContent = data.director;
    document.getElementById("movie-genre").textContent = data.genre;
    document.getElementById("movie-maturity-rating").textContent = data.maturityRating;
    document.getElementById("movie-description").textContent = data.description;

    const movieCoverImg = document.getElementById("movie-image");
    movieCoverImg.src = data.image;
}

getMovieDetails(movieId);