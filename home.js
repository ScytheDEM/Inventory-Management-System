document.addEventListener('DOMContentLoaded', function() {
    // check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    // select the sign-in/sign-out button and the auth status span
    const signInButton = document.getElementById('signin');
    const authStatus = document.getElementById('auth-status');

    // select the tracking button
    const trackingButton = document.getElementById('tracking');

    // if the user is logged in, change the button text to sign out and display the username
    if (isLoggedIn) {
        signInButton.textContent = 'Sign Out';
        signInButton.href = 'logout.html'; // set href to logout.html

        // display the username in the navigation bar
        const usernameDisplay = document.createElement('span');
        usernameDisplay.id = 'username-display';
        usernameDisplay.textContent = `Welcome, ${username}`;
        authStatus.insertBefore(usernameDisplay, signInButton);

        // add click event listener to the tracking button
        trackingButton.addEventListener('click', function(event) {
            // allow default navigation
        });
    } else {
        signInButton.textContent = 'Sign In';
        signInButton.href = 'login.html'; // set href to login.html

        // add click event listener to the tracking button
        trackingButton.addEventListener('click', function(event) {
            event.preventDefault(); // prevent default navigation
            localStorage.setItem('redirectTo', 'tracking.html');
            window.location.href = 'login.html'; // redirect to login.html
        });
    }
});
