const addedMoviesContainer = document.getElementById('added-movies-container');
const cookieArr = document.cookie.split("; ").map(cookie => cookie.split("="));
const userIdCookie = cookieArr.find(cookie => cookie[0] === 'userId');
const userNameCookie = cookieArr.find(cookie => cookie[0] === 'userName');
const userId = userIdCookie[1];
const userName = userNameCookie[1];
const usernameSpan = document.getElementById('username');
usernameSpan.textContent = userName;

const baseURL = "http://localhost:8080/api/v1/movies"

// Fetching the user's added movies and displaying them
async function fetchAndDisplayAddedMovies(userId) {
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
                <button class="delete-button">Delete</button>
                `;

                const deleteButton = movieCard.querySelector('.delete-button');
                deleteButton.addEventListener('click', () => deleteMovieCard(movie.id));

            addedMoviesContainer.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Error fetching added movies:", error);
    }
}

// Deleting a movie card
async function deleteMovieCard(movieId) {
    try {
        await fetch(`${baseURL}/user/${userId}?movieId=${movieId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchAndDisplayAddedMovies(userId);
    } catch (error) {
        console.error("Error deleting movie:", error);
    }
}

fetchAndDisplayAddedMovies(userId);