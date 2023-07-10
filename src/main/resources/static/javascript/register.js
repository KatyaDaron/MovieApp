const registerForm = document.getElementById('register-form');
const registerUsername = document.getElementById('register-username');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');

const headers = {
    'Content-Type' : 'application/json'
}

const baseUrl = 'http://localhost:8080/api/users'

const handleSubmit = async (e) => {
    e.preventDefault();

    let bodyObj = {
        name: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value
    }

    const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message));

    const responseArr = await response.json()

    if (response.status === 200) {
        window.location.replace(responseArr[0])
    } else {
        const warningMessage = "User with this email already registered.";
        alert(warningMessage);
    }
}

registerForm.addEventListener("submit", handleSubmit)