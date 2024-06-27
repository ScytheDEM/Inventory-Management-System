function navigateToRegister() {
    console.log('Navigating to register.html');
    window.location.href = 'register.html'; // Redirects the user to register.html
}

function navigateToLogin() {
    console.log('Navigating to login.html');
    document.getElementById('register-container').style.display = 'none'; // Hides the register container
    document.getElementById('login-container').style.display = 'block'; // Displays the login container
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form'); // Gets the login form element
    const registerForm = document.getElementById('register-form'); // Gets the register form element

    // Event listener for login form submission
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevents the default form submission behavior

        console.log('Login form submitted');

        const username = document.getElementById('username').value; // Gets the value of the username input field
        const password = document.getElementById('password').value; // Gets the value of the password input field

        try {
            const response = await fetch('login.php', { // Sends a POST request to login.php
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });

            const result = await response.json(); // Parses the response as JSON

            console.log('Login response:', result);

            if (result.debug) {
                result.debug.forEach(debugMessage => {
                    console.log(debugMessage); // Logs any debug messages from the response
                });
            }

            if (result.status === 'success') {
                alert(result.message); // Displays a success message
                localStorage.setItem('isLoggedIn', 'true'); // Stores the login status in local storage
                localStorage.setItem('username', result.username); // Stores the username in local storage
                console.log('Redirecting to home.html');
                window.location.href = 'home.html'; // Redirects the user to home.html
            } else {
                alert(result.message); // Displays an error message
                console.error('Login error:', result.message); // Logs the error message
            }
        } catch (error) {
            console.error('Error:', error); // Logs any errors that occurred
            alert('An error occurred. Please try again.'); // Displays a generic error message
        }
    });

    // Event listener for register form submission
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevents the default form submission behavior

        console.log('Register form submitted');

        const name = document.getElementById('new-name').value; // Gets the value of the name input field
        const username = document.getElementById('new-username').value; // Gets the value of the new username input field
        const password = document.getElementById('new-password').value; // Gets the value of the new password input field

        try {
            const response = await fetch('login.php', { // Sends a POST request to login.php
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    action: 'register',
                    name: name,
                    username: username,
                    password: password
                })
            });

            const result = await response.json(); // Parses the response as JSON

            console.log('Register response:', result);

            if (result.debug) {
                result.debug.forEach(debugMessage => {
                    console.log(debugMessage); // Logs any debug messages from the response
                });
            }

            if (result.status === 'success') {
                alert(result.message); // Displays a success message
                localStorage.setItem('isLoggedIn', 'true'); // Stores the login status in local storage
                localStorage.setItem('username', result.username); // Stores the username in local storage
                console.log('Redirecting to home.html');
                window.location.href = 'home.html'; // Redirects the user to home.html
            } else {
                alert(result.message); // Displays an error message
                console.error('Register error:', result.message); // Logs the error message
            }
        } catch (error) {
            console.error('Error:', error); // Logs any errors that occurred
            alert('An error occurred. Please try again.'); // Displays a generic error message
        }
    });
});
