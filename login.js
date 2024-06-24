// login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });

            const result = await response.json();

            // Log debug information to the console
            if (result.debug) {
                result.debug.forEach(debugMessage => {
                    console.log(debugMessage);
                });
            }

            if (result.status === 'success') {
                alert(result.message);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', result.username);
                window.location.href = 'home.html';
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
