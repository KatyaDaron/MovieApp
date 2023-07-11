function logout() {
  // Clear the user-related cookies
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  // Redirect the user to the login page
  window.location.href = 'login.html';
}