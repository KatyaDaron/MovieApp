const moviesContainer = document.querySelector('#movies-container')
const form = document.querySelector('form')
const searchInput = document.querySelector('#search-input');

const headers = {
    'Content-Type' : 'application/json'
}

const baseMoviesURL = "http://localhost:8080/api/movies/"
const baseFeedbacksURL = "http://localhost:8080/api/feedbacks";

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
    const response = await fetch(`${baseMoviesURL}`, {
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
    await fetch(`${baseMoviesURL}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createMovieCard(data))
        .catch(err => console.error(err))
}

async function createMovieCard(movieArr) {
    moviesContainer.innerHTML = '';

    const promises = movieArr.map(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
        <a href="movie.html?id=${movie.id}">
            <img alt="movie cover" src=${movie.image} class="movie-cover"/>
        </a>
    `;

    const averageRatingPromise = getAverageRating(movie.id)
        .then(averageRating => {
            const movieDetails = document.createElement('div');
            movieDetails.classList.add('movie-details');

            const movieTitle = document.createElement('span');
            movieTitle.classList.add('movie-title');
            movieTitle.textContent = movie.title;
            movieDetails.appendChild(movieTitle);

            const ratingElement = document.createElement('span');
            ratingElement.classList.add('movie-average-rating');

            if (averageRating === 0) {
                ratingElement.style.display = 'none';
            } else {
                const displayedRating = averageRating === 10 ? '10' : averageRating.toFixed(1);
//                ratingElement.innerHTML = `<span>&#9733; ${displayedRating}</span>`;
                ratingElement.innerHTML = `<span>${displayedRating}</span>`;
            }

            movieDetails.appendChild(ratingElement);
            movieCard.appendChild(movieDetails);
        });

    moviesContainer.appendChild(movieCard);
    return averageRatingPromise;
    });

    await Promise.all(promises);
}

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

async function movieSearch(query) {
    await fetch(`${baseMoviesURL}search?query=${query}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert('Sorry, there is nothing that matches your search');
            } else {
                createMovieCard(data);
            }
        })
        .catch(err => console.error(err))
}

getAllMovies();
form.addEventListener("submit", handleSubmit)
searchInput.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        movieSearch(query);
        searchInput.value = '';
    }
});