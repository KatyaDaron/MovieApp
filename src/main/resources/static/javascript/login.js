const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

const headers = {
    'Content-Type' : 'application/json'
}

const baseUrl = 'http://localhost:8080/api/users'
const handleSubmit = async (e) => {
    e.preventDefault();

    let bodyObj = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message));

    const responseArr = await response.json()

    if (response.status === 200) {
        document.cookie = `userId=${responseArr[1]}`;
        document.cookie = `userName=${responseArr[2]}`;
        window.location.replace(responseArr[0])
    }
}

loginForm.addEventListener("submit", handleSubmit)