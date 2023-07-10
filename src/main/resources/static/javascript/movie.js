// Getting the movie ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const addBtn = document.getElementById('add-to-watchlist');
const cookieArr = document.cookie.split(";").map(cookie => cookie.trim().split("="));
const userIdCookie = cookieArr.find(cookie => cookie[0] === "userId");
const userId = userIdCookie[1]

const baseMoviesURL = "http://localhost:8080/api/v1/movies";
const baseRatingsURL = "http://localhost:8080/api/v1/ratings";

const headers = {
    'Content-Type' : 'application/json'
}

// Fetching and displaying the movie details using the movie ID
async function getMovieDetails(movieId) {
    const response = await fetch(`${baseMoviesURL}/${movieId}`, {
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

async function addMovieToWatchlist() {
    try {
        await fetch(`${baseMoviesURL}/user/${userId}?movieId=${movieId}`, {
            method: "POST",
            headers: headers
        });
        console.log(`Movie ${movieId} added to watchlist of user ${userId}!`);
    } catch (error) {
        console.error("Error adding movie to watchlist:", error);
    }
}

async function addRatingAndComment(movieId) {
    const ratingSelect = document.getElementById("rating-select");
    const commentInput = document.getElementById("comment-input");

    const rating = ratingSelect.value;
    const comment = commentInput.value;

    let bodyObj = {
            ratingValue: parseInt(rating),
            comment: comment
            }

    try {
        const response = await fetch(`${baseRatingsURL}/user/${movieId}?userId=${userId}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(bodyObj)
        });
        if (response.ok) {
            alert("Thank you for your feedback!");
        }

        ratingSelect.value = "";
        commentInput.value = "";

        getAllComments(movieId);
    } catch (error) {
        console.error("Error submitting rating and comment:", error);
    }
}

async function getAllComments(movieId) {
    try {
        const response = await fetch(`${baseRatingsURL}/movie/${movieId}/comments`, {
            method: "GET",
            headers: headers
        });

        if (response.ok) {
            const comments = await response.json();
            const commentsContainer = document.getElementById("comments-container");

            // Clearing any existing comments
            commentsContainer.innerHTML = "";

            // Creating HTML elements for each comment
            comments.forEach((comment) => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.innerHTML = `<p class="username">${comment.userDto.name}</p>
                                            <p class="comment-text">${comment.comment}</p>`;
                commentsContainer.appendChild(commentElement);
            });
        } else {
            console.error("Error fetching comments:", response.status);
        }
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
}

document.getElementById("rating-comment-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addRatingAndComment(movieId);
});
getMovieDetails(movieId);
addBtn.addEventListener("click", addMovieToWatchlist);
getAllComments(movieId);