// register.js

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        try {
            const response = await fetch('login.php', {
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

            const result = await response.json();

            if (result.status === 'success') {
                alert(result.message);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', result.username);
                window.location.href = 'home.html'; // Redirect to home page after successful registration
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});


// this just checks if the crap is right