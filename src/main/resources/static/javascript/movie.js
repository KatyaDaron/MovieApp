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
                deleteButton.id = "delete-button";
                deleteButton.innerText = "Delete";
                deleteButton.addEventListener("click", () => deleteFeedback(feedback.id));

                const editButton = document.createElement("button");
                editButton.id = "edit-button";
                editButton.innerText = "Edit";
                editButton.addEventListener("click", () => editFeedback(feedback));

                feedbackElement.appendChild(deleteButton);
                feedbackElement.appendChild(editButton);
            }

            feedbacksContainer.appendChild(feedbackElement);
            });

            // Calculating average rating
            const ratings = feedbacks.map((feedback) => feedback.ratingValue);
            const averageRating = calculateAverageRating(ratings);

            // Displaying average rating
            document.getElementById("movie-average-rating").textContent = `${averageRating.toFixed(1)}`;
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

async function editFeedback(feedback) {
    // Popup window for editing
    const width = 350;
    const height = 250;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const popupWindow = window.open("", "Edit Feedback", `width=${width}, height=${height}, top=${top}, left=${left}`);


    // Creating HTML elements for the form in the popup window
    const form = document.createElement("form");
    const ratingLabel = document.createElement("label");
    const ratingSelect = document.createElement("select");
    const commentLabel = document.createElement("label");
    const commentInput = document.createElement("textarea");
    const submitButton = document.createElement("button");

    // Setting content for the form elements
    ratingLabel.innerText = "Rate the movie: ";
    commentLabel.innerText = "Add a comment: ";
    submitButton.type = "submit";
    submitButton.innerText = "Update";

    // Populating the rating select dropdown with options
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        ratingSelect.appendChild(option);
    }

    // Setting rating and comment values with existing values
    ratingSelect.value = feedback.ratingValue;
    commentInput.value = feedback.comment;

    // Adding form elements to the form
    form.appendChild(document.createElement("br"));
    form.appendChild(ratingLabel);
    form.appendChild(ratingSelect);
    form.appendChild(document.createElement("br"));
    form.appendChild(commentLabel);
    form.appendChild(commentInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);

    // Appending the form to the popup window
    popupWindow.document.body.appendChild(form);

    // Adding a submit event listener to the form
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Retrieving the updated values from the form fields
        const updatedRating = ratingSelect.value;
        const updatedComment = commentInput.value;

        popupWindow.close();

        let bodyObj = {
            ratingValue: parseInt(updatedRating),
            comment: updatedComment,
        };

        try {
            const response = await fetch(`${baseFeedbacksURL}/${feedback.id}?userId=${userId}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(bodyObj)
            });

            if (response.ok) {
                alert("Your feedback has been updated!");

                getAllFeedbacks(movieId);
            } else {
                console.error("Error updating feedback:", response.status);
            }
        } catch (error) {
            console.error("Error updating feedback:", error);
        }
    });
}

document.getElementById("feedback-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addFeedback(movieId);
});
getMovieDetails(movieId);
addMovieBtn.addEventListener("click", addMovieToWatchlist);
getAllFeedbacks(movieId);