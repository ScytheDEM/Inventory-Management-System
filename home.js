// home.js

document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Select the authentication status span
    const authStatus = document.getElementById('auth-status');
    
    // Select the sign-in button
    const signInButton = document.getElementById('signin');
    
    // If user is logged in, change the button text to Sign Out
    if (isLoggedIn === 'true') {
      signInButton.textContent = 'Sign Out';
      signInButton.href = 'logout.html'; // Update href to logout page
      // Add event listener for sign out
      signInButton.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
      });
    }
  });
  