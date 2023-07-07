const addedMoviesContainer = document.getElementById('added-movies-container');
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

const baseURL = "http://localhost:8080/api/v1/movies"

// Fetching the user's added movies and displaying them
async function fetchAndDisplayAddedMovies() {
    try {
        const response = await fetch(`${baseURL}/${userId}/movies`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        // Clear the existing movie list
        addedMoviesContainer.innerHTML = '';

        // Populate the movie list with the retrieved data
        data.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            movieCard.innerHTML = `
                <a href="movie.html?id=${movie.id}">
                    <img alt="movie cover" src=${movie.image} class="movie-cover"/>
                </a>
                <p class="movie-title">${movie.title}</p>
                `;
            addedMoviesContainer.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Error fetching added movies:", error);
    }
}

fetchAndDisplayAddedMovies();