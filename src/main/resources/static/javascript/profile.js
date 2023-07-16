const addedMoviesContainer = document.getElementById('added-movies-container');
const cookieArr = document.cookie.split("; ").map(cookie => cookie.split("="));
const userIdCookie = cookieArr.find(cookie => cookie[0] === 'userId');
const userNameCookie = cookieArr.find(cookie => cookie[0] === 'userName');
const userId = userIdCookie[1];
const userName = userNameCookie[1];
const usernameSpan = document.getElementById('username');
usernameSpan.textContent = userName;

const headers = {
    'Content-Type' : 'application/json'
}

const baseMoviesURL = "http://localhost:8080/api/movies";
const baseFeedbacksURL = "http://localhost:8080/api/feedbacks";

// Fetching the user's added movies and displaying them
async function fetchAndDisplayAddedMovies(userId) {
    try {
        const response = await fetch(`${baseMoviesURL}/${userId}/movies`, {
            method: "GET",
            headers: headers
        });
        const data = await response.json();

        // Clear the existing movie list
        addedMoviesContainer.innerHTML = '';

        // Populate the movie list with the retrieved data
        data.forEach(async movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            movieCard.innerHTML = `
                <a href="movie.html?id=${movie.id}">
                    <img alt="movie cover" src=${movie.image} class="movie-cover"/>
                </a>
                <div class="movie-details">
                    <span class="movie-title">${movie.title}</span>
                    <span class="movie-average-rating"></span>
                </div>
                <button class="delete-button" onclick="deleteMovieCard(${movie.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;

            const deleteButton = movieCard.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => deleteMovieCard(movie.id));

            addedMoviesContainer.appendChild(movieCard);

            const ratingElement = movieCard.querySelector('.movie-average-rating');
            const averageRating = await getAverageRating(movie.id);
            if (averageRating === 0) {
                ratingElement.style.display = 'none';
            } else {
                const displayedRating = averageRating === 10 ? '10' : averageRating.toFixed(1);
                ratingElement.textContent = displayedRating;
            }
        });
    } catch (error) {
        console.error("Error fetching added movies:", error);
    }
}

// Fetching the average rating of a movie
async function getAverageRating(movieId) {
    try {
        const response = await fetch(`${baseFeedbacksURL}/movie/${movieId}`, {
            method: "GET",
            headers: headers
        });

        if (response.ok) {
            const feedbacks = await response.json();
            const ratings = feedbacks.map((feedback) => feedback.ratingValue);
            const averageRating = calculateAverageRating(ratings);
            return averageRating;
        } else {
            console.error("Error fetching feedbacks:", response.status);
        }
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
    }
}

function calculateAverageRating(ratings) {
    if (ratings.length === 0) {
    return 0;
    }

    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;
    return average;
}

// Deleting a movie card
async function deleteMovieCard(movieId) {
    try {
        await fetch(`${baseMoviesURL}/user/${userId}?movieId=${movieId}`, {
            method: "DELETE",
            headers: headers
        });
        fetchAndDisplayAddedMovies(userId);
    } catch (error) {
        console.error("Error deleting movie:", error);
    }
}

fetchAndDisplayAddedMovies(userId);