document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    // Select the sign-in/sign-out button and the auth status span
    const signInButton = document.getElementById('signin');
    const authStatus = document.getElementById('auth-status');

    // Select the tracking button
    const trackingButton = document.getElementById('tracking');

    // If the user is logged in, change the button text to Sign Out and display the username
    if (isLoggedIn) {
        signInButton.textContent = 'Sign Out';
        signInButton.href = 'logout.html'; // Set href to logout.html

        // Display the username in the navigation bar
        const usernameDisplay = document.createElement('span');
        usernameDisplay.id = 'username-display';
        usernameDisplay.textContent = `Welcome, ${username}`;
        authStatus.insertBefore(usernameDisplay, signInButton);

        // Add click event listener to the tracking button
        trackingButton.addEventListener('click', function(event) {
            // Allow default navigation
        });
    } else {
        signInButton.textContent = 'Sign In';
        signInButton.href = 'login.html'; // Set href to login.html

        // Add click event listener to the tracking button
        trackingButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default navigation
            localStorage.setItem('redirectTo', 'tracking.html');
            window.location.href = 'login.html'; // Redirect to login.html
        });
    }
});
