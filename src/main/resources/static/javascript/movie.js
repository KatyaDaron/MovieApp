// Getting the movie ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const addMovieBtn = document.getElementById('add-to-watchlist');
const cookieArr = document.cookie.split(";").map(cookie => cookie.trim().split("="));
const userIdCookie = cookieArr.find(cookie => cookie[0] === "userId");
const userId = userIdCookie[1]

const baseMoviesURL = "http://localhost:8080/api/movies";
const baseFeedbacksURL = "http://localhost:8080/api/feedbacks";

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

async function addFeedback(movieId) {
    const ratingSelect = document.getElementById("rating-select");
    const commentInput = document.getElementById("comment-input");

    const rating = ratingSelect.value;
    const comment = commentInput.value;

    let bodyObj = {
            ratingValue: parseInt(rating),
            comment: comment
            }

    try {
        const response = await fetch(`${baseFeedbacksURL}/movie/${movieId}?userId=${userId}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(bodyObj)
        });
        if (response.ok) {
            alert("Thank you for your feedback!");
        }

        ratingSelect.value = "";
        commentInput.value = "";

        getAllFeedbacks(movieId);
    } catch (error) {
        console.error("Error submitting rating and comment:", error);
    }
}

async function getAllFeedbacks(movieId) {
    try {
        const response = await fetch(`${baseFeedbacksURL}/movie/${movieId}`, {
            method: "GET",
            headers: headers
        });

        if (response.ok) {
            const feedbacks = await response.json();
            const feedbacksContainer = document.getElementById("feedbacks-container");

            // Clearing any existing comments
            feedbacksContainer.innerHTML = "";

            // Creating HTML elements for each comment
            feedbacks.forEach((feedback) => {
                const feedbackElement = document.createElement("div");
                feedbackElement.classList.add("feedback");
                feedbackElement.innerHTML = `<p class="username">${feedback.userDto.name}</p>
                                             <p class="rating-value">${feedback.ratingValue}</p>
                                             <p class="comment-text">${feedback.comment}</p>`;

            // Checking if the comment belongs to the current logged-in user
            if (feedback.userDto.id === Number(userId)) {
                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.addEventListener("click", () => deleteFeedback(feedback.id));
                feedbackElement.appendChild(deleteButton);
            }

            feedbacksContainer.appendChild(feedbackElement);
            });
        } else {
            console.error("Error fetching feedbacks:", response.status);
        }
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
    }
}

async function deleteFeedback(feedbackId) {
    try {
        const response = await fetch(`${baseFeedbacksURL}/${feedbackId}?userId=${userId}`, {
            method: "DELETE",
            headers: headers
        });

        if (response.ok) {
            getAllFeedbacks(movieId);
            alert("Feedback deleted successfully!");
        } else {
            console.error("Error deleting feedback:", response.status);
        }
    } catch (error) {
        console.error("Error deleting feedback:", error);
    }
}

document.getElementById("feedback-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addFeedback(movieId);
});
getMovieDetails(movieId);
addMovieBtn.addEventListener("click", addMovieToWatchlist);
getAllFeedbacks(movieId);