function navigateToRegister() {
    console.log('Navigating to register.html');
    window.location.href = 'register.html';
}

function navigateToLogin() {
    console.log('Navigating to login.html');
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Event listener for login form submission
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Login form submitted');

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

            console.log('Login response:', result);

            if (result.debug) {
                result.debug.forEach(debugMessage => {
                    console.log(debugMessage);
                });
            }

            if (result.status === 'success') {
                alert(result.message);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', result.username);
                console.log('Redirecting to home.html');
                window.location.href = 'home.html';
            } else {
                alert(result.message);
                console.error('Login error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Event listener for register form submission
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Register form submitted');

        const name = document.getElementById('new-name').value;
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

            console.log('Register response:', result);

            if (result.debug) {
                result.debug.forEach(debugMessage => {
                    console.log(debugMessage);
                });
            }

            if (result.status === 'success') {
                alert(result.message);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', result.username);
                console.log('Redirecting to home.html');
                window.location.href = 'home.html';
            } else {
                alert(result.message);
                console.error('Register error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
